// These usecases should be handled
// * Show a new handle  r, set timeout to 60, ignore on the first, none on the second
// * Check on an existing timer, recalc timeout, ignore on the first, none on the second
// * Timeout, recalc timeout, ignore on the first, random on the second

import { MODULENAME } from "../../xdy-pf2e-workbench.js";
import { heroes, pushNotification } from "../../utils.js";

export enum HPHState {
    Start,
    Check,
    Timeout,
}

const ONE_MINUTE_IN_MS = 60 * 1000;

async function stopTimer() {
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.startTime");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    await game.user?.unsetFlag(MODULENAME, "heroPointHandler.timeout");
}

export async function startTimer(remainingMinutes: number) {
    const oldTimeout = <NodeJS.Timeout>game.user?.getFlag(MODULENAME, "heroPointHandler.timeout");
    if (oldTimeout) {
        clearTimeout(oldTimeout);
    }
    if (remainingMinutes > 0) {
        const ms = remainingMinutes * ONE_MINUTE_IN_MS;
        const timeout = setTimeout(async () => {
            await heroPointHandler(HPHState.Timeout);
        }, ms);

        const updateData = {
            flags: {
                "xdy-pf2e-workbench": {
                    heroPointHandler: {
                        startTime: game.time.serverTime,
                        remainingMinutes: remainingMinutes,
                        timeout: timeout,
                    },
                },
            },
        };
        await game.user?.update(updateData);
    } else if (!remainingMinutes || remainingMinutes <= 0) {
        await stopTimer();
    }
}

/**
 * Calls the heroPointHandler function with the HPHState.Timeout parameter.
 *
 * @return {Promise<any>} The result of the heroPointHandler function.
 */
export async function callHeroPointHandler() {
    return heroPointHandler(HPHState.Timeout);
}

export function createRemainingTimeMessage(remainingMinutes: number) {
    const message =
        remainingMinutes > 0
            ? game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.willBeResetIn`, {
                  remainingMinutes: remainingMinutes,
                  time: new Date(Date.now() + remainingMinutes * ONE_MINUTE_IN_MS).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                  }),
              })
            : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.timerStopped`);
    sendMessage(message, [game.user.id]);
}

export async function heroPointHandler(state: HPHState) {
    if (
        Object.values(ui.windows).find((w: Application) =>
            w.title.includes(`${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)}`),
        )
    ) {
        return;
    }

    let remainingMinutes: number;
    switch (state) {
        case HPHState.Start:
            remainingMinutes = Number.parseInt(
                String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
            );
            break;
        case HPHState.Check:
            remainingMinutes = calcRemainingMinutes(true);
            break;
        case HPHState.Timeout:
            remainingMinutes = Number.parseInt(
                String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
            );
            break;
    }

    const title: any = `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.title`)} (${
        remainingMinutes
            ? remainingMinutes + " " + game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.minutesLeft`)
            : game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noRunningTimer`)
    })`;

    const content = await buildHtml(remainingMinutes, state);

    let button: string | null = null;
    const handlerDialog = new Dialog({
        title: title,
        content,
        buttons: {
            timer: {
                icon: '<i class="fa-solid fa-hourglass"></i>',
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.startTimerLabel`)}`,
                callback: async (html: any) => {
                    remainingMinutes = handleDialogResponse(html);
                    button = "timer";
                },
            },
            noTimer: {
                label: `${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.noTimerLabel`)}`,
                callback: async (html) => {
                    handleDialogResponse(html);
                    remainingMinutes = 0;
                    button = "noTimer";
                },
            },
        },
        default: "timer",
        close: async () => {
            switch (button) {
                case "timer":
                    await startTimer(remainingMinutes);
                    break;
                case "noTimer":
                    await stopTimer();
                    break;
            }
            createRemainingTimeMessage(remainingMinutes);
            return;
        },
    });
    handlerDialog.render(true);
}

// Constants
const PARTY_MEMBERS_FLAG_KEY = "partymembersThatHaveGottenHeropoints";

/**
 * Selects a random party member index from the provided list of actors,
 * ensuring the same actor is not repeatedly selected until all have been selected.
 *
 * @param {CreaturePF2e[]} actors - The list of party members to select from.
 * @return {Promise<number>} The index of the selected actor in the input array, or -1 if the input array is empty.
 */
async function randomPartymemberThatHasNotReceivedAHeropoint(actors): Promise<number> {
    if (actors.length === 0) {
        await game.actors?.party?.unsetFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY);
        return -1;
    }

    const existingFlagValue =
        <string | null | undefined>game.actors?.party?.getFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY) ?? "";
    console.log("existingFlagValue: " + existingFlagValue);
    const hasReceivedHP: Set<string> = existingFlagValue ? new Set(existingFlagValue.split(",")) : new Set();
    const noHPYet = actors.filter((actor) => !hasReceivedHP.has(actor.id));

    if (noHPYet.length === 0) {
        hasReceivedHP.clear();
        noHPYet.push(...actors);
    }
    const randomIndex: number = Math.floor(Math.random() * noHPYet.length);
    const selectedActorId: string = noHPYet[randomIndex]?.id ?? -1;
    hasReceivedHP.add(selectedActorId);
    await game.actors?.party?.setFlag(MODULENAME, PARTY_MEMBERS_FLAG_KEY, [...hasReceivedHP].join(","));

    return actors.findIndex((actor) => actor.id === selectedActorId);
}

async function buildHtml(remainingMinutes: number, state: HPHState) {
    // TODO How to start using bootstrap? (I use bootstrap classes in the html).
    // TODO Extract to a handlebars template

    // TODO Get user name, add within parentheses after actor name
    let charactersContent = "";
    const actors = heroes();
    let checked: number;
    switch (state) {
        case HPHState.Start:
            checked = -1;
            break;
        case HPHState.Timeout: {
            let selectedActor = -1;
            switch (game.settings.get(MODULENAME, "heropointHandlerRandomization")) {
                case "none":
                    break;
                case "random":
                    selectedActor = Math.floor(Math.random() * actors.length);
                    break;
                case "randomPartymemberThatHasNotReceivedAHeropoint":
                    selectedActor = await randomPartymemberThatHasNotReceivedAHeropoint(actors);
            }
            checked = actors.length > 0 ? selectedActor : -1;
            break;
        }
        case HPHState.Check:
            checked = -1;
            break;
    }

    const startContent = `
<div class="form-group">
<div>${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.instructions`)}</div>
<hr>
  <label class="col-md-4 control-label" for="radios">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.doWhat`,
  )}</label>
  <div class="col-md-4">
      <div class="radio">
        <label for="sessionStart-0">
          <input type="radio" name="sessionStart" id="sessionStart-0" value="RESET">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.resetTo`)}
        </label>
      </div>
      <div class="radio">
        <label for="sessionStart-1">
          <input type="radio" name="sessionStart" id="sessionStart-1" value="ADD">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.add`)}
        </label>
      </div>
      <div class="radio">
        <label for="sessionStart-2">
          <input type="radio" name="sessionStart" id="sessionStart-2" value="IGNORE" checked="checked">
          ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.ignore`)}
        </label>
      </div>
  </div>
</div>

<div class="form-group">
  <label class="col-md-4 control-label" for="heropoints">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.thisMany`,
  )}</label>
  <div class="col-md-4">
    <input id="heropoints" name="heropoints" type="number" value="1" class="form-control input-md">
  </div>
</div>

<hr>
<div class="form-group">
  <label class="col-md-4 control-label" for="characters">${game.i18n.localize(
      `${MODULENAME}.SETTINGS.heroPointHandler.addOne`,
  )}</label>
  <div class="col-md-4">`;

    for (let i = 0; i < actors.length; i++) {
        charactersContent += `
    <div class="radio">
        <label for="characters-${i}">
          <input type="radio" name="characters" id="characters-${i}" value="${actors[i]?.id}" ${
              checked === i ? 'checked="checked"' : ""
          }>
          ${actors[i]?.name}
        </label>
    </div>`;
    }

    const maxMinutes = Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")));
    const remainingContent = `
  <div class="radio">
    <label for="characters-NONE">
      <input type="radio" name="characters" id="characters-NONE" value="NONE" ${
          checked === -1 ? 'checked="checked"' : ""
      }>
      ${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.none`)}
    </label>
  </div>
</div>

<hr>
<script>
document.addEventListener('DOMContentLoaded', function() {
    const timerInput = document.getElementById("timerTextId");
    if (timerInput) {
        timerInput.addEventListener("input", function() {
            const value = this.value;
            if ((value !== "") && (value.indexOf(".") === -1)) {
                this.value = Math.max(Math.min(parseInt(value), ${Number.parseInt(
                    String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")),
                )}), 0);
            }
        });
    }
});
</script>
<div class="form-group">
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">${game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.timerValue`, {
          maxMinutes: maxMinutes,
      })}</span>
      <input id="timerTextId" name="timerText" class="form-control" value="${
          remainingMinutes || maxMinutes
      }" type="number">
    </div>
    <p class="help-block">${game.i18n.localize(`${MODULENAME}.SETTINGS.heroPointHandler.showAfter`)}</p>
  </div>
</div>
`;

    return startContent + charactersContent + remainingContent;
}

export function calcRemainingMinutes(useDefault: boolean): number {
    const savedTime: number = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.startTime");
    const savedMinutes = <number>game.user?.getFlag(MODULENAME, "heroPointHandler.remainingMinutes");
    const remainingMinutes: number = Math.clamp(
        savedMinutes ??
            (useDefault
                ? Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes")))
                : 0),
        0,
        Number.parseInt(String(game.settings.get(MODULENAME, "heroPointHandlerDefaultTimeoutMinutes"))),
    );
    const passedMillis = game.time.serverTime - (savedTime ?? game.time.serverTime);
    return remainingMinutes - Math.floor(passedMillis / ONE_MINUTE_IN_MS);
}

/**
 * Resets the hero points for all heroes in the game.
 *
 * @param {number} heropoints - The number of hero points to set for each hero.
 * @return {Promise<void>} - A promise that resolves when all hero points have been updated.
 */
export async function resetHeroPoints(heropoints: number) {
    for (const actor of heroes()) {
        await actor.update({
            // TODO Fix type.
            "system.resources.heroPoints.value": Math.min(heropoints, (<any>actor).system.resources.heroPoints.max),
        });
    }
}

/**
 * Adds hero points to the specified actor or all actors.
 *
 * @param {number} heropoints - The number of hero points to add.
 * @param {any} [actorId="ALL"] - The ID of the actor to add hero points to. If "ALL" is specified, hero points will be added to all actors.
 * @return {Promise<void>} - A promise that resolves when the hero points have been added.
 */
export async function addHeroPoints(heropoints: number, actorId: any = "ALL") {
    let actors;
    switch (actorId) {
        case "ALL":
            actors = heroes();
            break;
        case "NONE":
            actors = [];
            break;
        default:
            actors = [game.actors?.get(actorId)];
            break;
    }

    for (const actor of actors) {
        const system = actor.system;
        const value = Math.min(
            system.resources.heroPoints.value + heropoints,
            (<any>actor).system.resources.heroPoints.max,
        );
        await actor.update({
            "system.resources.heroPoints.value": value,
        });
    }
}

function addOneToSelectedCharacterIfAny(actorId: string): void {
    addHeroPoints(1, actorId).then(() => {
        const name = game?.actors?.find((actor) => actor.id === actorId)?.name;
        let message: any;
        if (actorId === "ALL") {
            message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: 1,
            });
        } else if (name) {
            message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedFor`, {
                name: name,
            });
        }
        if (message) {
            sendMessage(message);
            if (game.settings.get(MODULENAME, "heropointHandlerNotification")) {
                pushNotification(message);
            }
        }
    });
}

function sendMessage(message: string, whisper: string[] | undefined = undefined) {
    if (game.settings.get(MODULENAME, "heropointHandlerNotificationChat")) {
        ChatMessage.create({ flavor: message, whisper }, {}).then();
    } else {
        ui.notifications?.notify(message);
    }
}

function handleDialogResponse(html: any) {
    // Convert jQuery object to HTMLElement if needed
    const element = html instanceof jQuery ? html[0] : html;

    const sessionStartEl = element.querySelector('input[name="sessionStart"]:checked');
    const sessionStart = sessionStartEl ? sessionStartEl.value : "IGNORE";

    const heroPointsEl = element.querySelector('input[name="heropoints"]');
    const heroPoints = heroPointsEl ? parseInt(heroPointsEl.value) : 1;

    const actorIdEl = element.querySelector('input[name="characters"]:checked');
    const actorId = actorIdEl ? actorIdEl.value : "NONE";

    const remainingMinutesEl = element.querySelector('input[name="timerText"]');
    const remainingMinutes = remainingMinutesEl ? parseInt(remainingMinutesEl.value) : 0;

    if (sessionStart === "RESET") {
        resetHeroPoints(heroPoints).then(() => {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.resetToForAll`, {
                heroPoints: heroPoints,
            });
            sendMessage(message);
            addOneToSelectedCharacterIfAny(actorId);
        });
    } else if (sessionStart === "ADD") {
        addHeroPoints(heroPoints).then(() => {
            const message = game.i18n.format(`${MODULENAME}.SETTINGS.heroPointHandler.addedToForAll`, {
                heroPoints: heroPoints,
            });

            sendMessage(message);
            addOneToSelectedCharacterIfAny(actorId);
        });
    } else if (sessionStart === "IGNORE") {
        addOneToSelectedCharacterIfAny(actorId);
    }

    return remainingMinutes;
}
