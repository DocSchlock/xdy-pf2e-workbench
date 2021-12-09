// Keyboard key controlling whether the actor should be mystified, if this feature is toggled on
import { MODULENAME } from "./xdy-pf2e-workbench";

export let mystifyKey: string;

export function registerSettings() {
    console.log(`${MODULENAME} | registerSettings`);

    //TODO Make a settings menu with the following settings that is set to be restricted to GMs
    const settings = (game as Game).settings;
    settings.register(MODULENAME, "npcMystifier", {
        name: "SETTINGS.npcMystifier.name",
        hint: "SETTINGS.npcMystifier.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierMethod", {
        name: "SETTINGS.npcMystifierMethod.name",
        hint: "SETTINGS.npcMystifierMethod.hint",
        scope: "world",
        config: true,
        default: "traits",
        type: String,
        choices: {
            traits: "SETTINGS.npcMystifierMethod.traits",
        },
    });

    //These apply to all mystification methods, I think
    settings.register(MODULENAME, "npcMystifierPrefix", {
        name: "SETTINGS.npcMystifierPrefix.name",
        hint: "SETTINGS.npcMystifierPrefix.hint",
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    settings.register(MODULENAME, "npcMystifierPostfix", {
        name: "SETTINGS.npcMystifierPostfix.name",
        hint: "SETTINGS.npcMystifierPostfix.hint",
        scope: "world",
        config: true,
        type: String,
        default: "",
    });

    settings.register(MODULENAME, "npcMystifierKey", {
        name: "SETTINGS.npcMystifierKey.name",
        hint: "SETTINGS.npcMystifierKey.hint",
        scope: "world",
        config: true,
        type: String,
        choices: {
            ALT: "Alt",
            CONTROL: "Ctrl",
            SHIFT: "Shift",
        },
        default: "CONTROL",
        onChange: (key) => {
            return (mystifyKey = <string>key);
        },
    });

    settings.register(MODULENAME, "npcMystifierAddRandomNumber", {
        name: "SETTINGS.npcMystifierAddRandomNumber.name",
        hint: "SETTINGS.npcMystifierAddRandomNumber.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierKeepNumberAtEndOfName", {
        name: "SETTINGS.npcMystifierKeepNumberAtEndOfName.name",
        hint: "SETTINGS.npcMystifierKeepNumberAtEndOfName.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierUseMystifiedNameInChat", {
        name: "SETTINGS.npcMystifierUseMystifiedNameInChat.name",
        hint: "SETTINGS.npcMystifierUseMystifiedNameInChat.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    //TODO These apply only to trait mystification and should be grouped together, maybe on a separate tab?
    settings.register(MODULENAME, "npcMystifierFilterRarities", {
        name: "SETTINGS.npcMystifierFilterRarities.name",
        hint: "SETTINGS.npcMystifierFilterRarities.hint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterRaritiesReplacement", {
        name: "SETTINGS.npcMystifierFilterRaritiesReplacement.name",
        hint: "SETTINGS.npcMystifierFilterRaritiesReplacement.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    settings.register(MODULENAME, "npcMystifierFilterEliteWeak", {
        name: "SETTINGS.npcMystifierFilterEliteWeak.name",
        hint: "SETTINGS.npcMystifierFilterEliteWeak.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterCreatureTypesTraits", {
        name: "SETTINGS.npcMystifierFilterCreatureTypesTraits.name",
        hint: "SETTINGS.npcMystifierFilterCreatureTypesTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterCreatureFamilyTraits", {
        name: "SETTINGS.npcMystifierFilterCreatureFamilyTraits.name",
        hint: "SETTINGS.npcMystifierFilterCreatureFamilyTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterOtherTraits", {
        name: "SETTINGS.npcMystifierFilterOtherTraits.name",
        hint: "SETTINGS.npcMystifierFilterOtherTraits.hint",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
    });

    settings.register(MODULENAME, "npcMystifierFilterBlacklist", {
        name: "SETTINGS.npcMystifierFilterBlacklist.name",
        hint: "SETTINGS.npcMystifierFilterBlacklist.hint",
        scope: "world",
        config: true,
        default: "",
        type: String,
    });

    mystifyKey = (<string>settings.get(MODULENAME, "npcMystifierKey")).toLocaleUpperCase();
}
