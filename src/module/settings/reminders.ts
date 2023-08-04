import { SettingsMenuPF2eWorkbench } from "./menu.js";
import { MODULENAME, updateHooks } from "../xdy-pf2e-workbench.js";

export class WorkbenchRemindersSettings extends SettingsMenuPF2eWorkbench {
    static override namespace = "remindersSettings";

    public static override get settings(): Record<string, SettingRegistration> {
        return {
            reminderCannotAttack: {
                name: `${MODULENAME}.SETTINGS.reminderCannotAttack.name`,
                hint: `${MODULENAME}.SETTINGS.reminderCannotAttack.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            reminderCannotAttackIgnoreDeadEidolon: {
                name: `${MODULENAME}.SETTINGS.reminderCannotAttackIgnoreDeadEidolon.name`,
                hint: `${MODULENAME}.SETTINGS.reminderCannotAttackIgnoreDeadEidolon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            reminderTargeting: {
                name: `${MODULENAME}.SETTINGS.reminderTargeting.name`,
                hint: `${MODULENAME}.SETTINGS.reminderTargeting.hint`,
                scope: "world",
                config: true,
                default: "no",
                type: String,
                choices: {
                    no: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.no`),
                    reminder: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.reminder`),
                    mustTarget: game.i18n.localize(`${MODULENAME}.SETTINGS.reminderTargeting.mustTarget`),
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            actionsReminderAllow: {
                name: `${MODULENAME}.SETTINGS.actionsReminderAllow.name`,
                hint: `${MODULENAME}.SETTINGS.actionsReminderAllow.hint`,
                scope: "world",
                config: true,
                default: "none",
                type: String,
                choices: {
                    none: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.none`),
                    all: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.all`),
                    gm: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.gm`),
                    players: game.i18n.localize(`${MODULENAME}.SETTINGS.actionsReminderAllow.players`),
                },
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            reminderBreathWeapon: {
                name: `${MODULENAME}.SETTINGS.reminderBreathWeapon.name`,
                hint: `${MODULENAME}.SETTINGS.reminderBreathWeapon.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            reminderBreathWeaponHidden: {
                name: `${MODULENAME}.SETTINGS.reminderBreathWeaponHidden.name`,
                hint: `${MODULENAME}.SETTINGS.reminderBreathWeaponHidden.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            heroPointHandler: {
                name: `${MODULENAME}.SETTINGS.heroPointHandler.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandler.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            heroPointHandlerStartTimerOnReady: {
                name: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandlerStartTimerOnReady.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            heroPointHandlerDefaultTimeoutMinutes: {
                name: `${MODULENAME}.SETTINGS.heroPointHandlerDefaultTimeoutMinutes.name`,
                hint: `${MODULENAME}.SETTINGS.heroPointHandlerDefaultTimeoutMinutes.hint`,
                scope: "world",
                config: true,
                default: 60,
                type: Number,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
            heropointHandlerNotification: {
                name: `${MODULENAME}.SETTINGS.heropointHandlerNotification.name`,
                hint: `${MODULENAME}.SETTINGS.heropointHandlerNotification.hint`,
                scope: "world",
                config: true,
                default: false,
                type: Boolean,
                onChange: () => updateHooks(),
                requiresReload: true,
            },
        };
    }
}
