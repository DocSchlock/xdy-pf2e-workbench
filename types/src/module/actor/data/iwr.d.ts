import { ImmunityType, IWRType, ResistanceType, WeaknessType } from "@actor/types.ts";
import { IWRException } from "@module/rules/rule-element/iwr/base.ts";
import { PredicatePF2e, PredicateStatement } from "@system/predication.ts";
declare abstract class IWR<TType extends IWRType> {
    #private;
    readonly type: TType;
    readonly exceptions: IWRException<TType>[];
    /** A definition for a custom IWR */
    readonly definition: PredicatePF2e | null;
    source: string | null;
    protected abstract readonly typeLabels: Record<TType, string>;
    constructor(data: IWRConstructorData<TType>);
    abstract get label(): string;
    /** A label showing the type, exceptions, and doubleVs but no value (in case of weaknesses and resistances) */
    get applicationLabel(): string;
    /** A label consisting of just the type */
    get typeLabel(): string;
    protected describe(iwrType: IWRException<TType>): PredicateStatement[];
    get predicate(): PredicatePF2e;
    toObject(): Readonly<IWRDisplayData<TType>>;
    /** Construct an object argument for Localization#format (see also PF2E.Actor.IWR.CompositeLabel in en.json) */
    protected createFormatData({ list, prefix, }: {
        list: IWRException<TType>[];
        prefix: string;
    }): Record<string, string>;
    test(statements: string[] | Set<string>): boolean;
}
type IWRConstructorData<TType extends IWRType> = {
    type: TType;
    exceptions?: IWRException<TType>[];
    customLabel?: Maybe<string>;
    definition?: Maybe<PredicatePF2e>;
    source?: string | null;
};
type IWRDisplayData<TType extends IWRType> = Pick<IWR<TType>, "type" | "exceptions" | "source" | "label">;
declare class Immunity extends IWR<ImmunityType> implements ImmunitySource {
    protected readonly typeLabels: {
        acid: string;
        air: string;
        "area-damage": string;
        auditory: string;
        bleed: string;
        blinded: string;
        bludgeoning: string;
        clumsy: string; /** A label showing the type, exceptions, and doubleVs but no value (in case of weaknesses and resistances) */
        cold: string;
        confused: string;
        controlled: string;
        "critical-hits": string;
        curse: string;
        custom: string;
        dazzled: string;
        deafened: string;
        "death-effects": string;
        detection: string;
        disease: string;
        doomed: string;
        drained: string;
        earth: string;
        electricity: string;
        emotion: string;
        energy: string;
        enfeebled: string;
        fascinated: string;
        fatigued: string;
        "fear-effects": string;
        fire: string;
        fleeing: string;
        force: string;
        frightened: string;
        grabbed: string;
        healing: string;
        illusion: string;
        immobilized: string;
        inhaled: string;
        light: string;
        magic: string;
        mental: string;
        metal: string;
        "misfortune-effects": string;
        "non-magical": string;
        "nonlethal-attacks": string;
        "object-immunities": string;
        "off-guard": string;
        olfactory: string;
        paralyzed: string;
        "persistent-damage": string;
        petrified: string;
        physical: string;
        piercing: string;
        plant: string;
        poison: string;
        polymorph: string;
        possession: string;
        precision: string;
        prone: string;
        radiation: string;
        restrained: string;
        "salt-water": string;
        scrying: string;
        sickened: string;
        slashing: string;
        sleep: string;
        slowed: string;
        sonic: string;
        "spell-deflection": string;
        spirit: string;
        stunned: string;
        stupefied: string;
        "swarm-attacks": string;
        "swarm-mind": string;
        trip: string;
        "unarmed-attacks": string;
        unconscious: string;
        visual: string;
        vitality: string;
        void: string;
        water: string;
        wood: string;
        wounded: string;
        arcane: string;
        divine: string;
        occult: string;
        primal: string;
        holy: string;
        unholy: string;
        abysium: string;
        adamantine: string;
        dawnsilver: string;
        djezet: string;
        duskwood: string;
        inubrix: string;
        noqual: string;
        orichalcum: string;
        siccatite: string;
        silver: string;
        "cold-iron": string;
    };
    /** No value on immunities, so the full label is the same as the application label */
    get label(): string;
}
interface IWRSource<TType extends IWRType = IWRType> {
    type: TType;
    exceptions?: IWRException<TType>[];
}
type ImmunitySource = IWRSource<ImmunityType>;
declare class Weakness extends IWR<WeaknessType> implements WeaknessSource {
    protected readonly typeLabels: {
        acid: string;
        air: string;
        alchemical: string;
        "area-damage": string;
        "arrow-vulnerability": string;
        "axe-vulnerability": string;
        bleed: string;
        bludgeoning: string;
        cold: string;
        "critical-hits": string;
        custom: string;
        earth: string;
        electricity: string;
        emotion: string;
        energy: string;
        fire: string;
        force: string;
        "ghost-touch": string;
        glass: string;
        light: string;
        magical: string;
        mental: string;
        metal: string;
        "non-magical": string;
        "nonlethal-attacks": string;
        "persistent-damage": string;
        physical: string;
        piercing: string;
        plant: string;
        poison: string;
        precision: string;
        radiation: string;
        salt: string;
        "salt-water": string;
        slashing: string;
        sonic: string;
        spells: string;
        spirit: string;
        "splash-damage": string;
        "unarmed-attacks": string;
        "vampire-weaknesses": string;
        vitality: string;
        void: string;
        vorpal: string;
        "vorpal-fear": string;
        "vulnerable-to-sunlight": string;
        water: string;
        weapons: string;
        "weapons-shedding-bright-light": string;
        wood: string;
        arcane: string;
        divine: string;
        occult: string;
        primal: string;
        holy: string;
        unholy: string;
        abysium: string;
        adamantine: string;
        dawnsilver: string;
        djezet: string;
        duskwood: string;
        inubrix: string;
        noqual: string;
        orichalcum: string;
        siccatite: string;
        silver: string;
        "cold-iron": string;
    };
    value: number;
    constructor(data: IWRConstructorData<WeaknessType> & {
        value: number;
    });
    get label(): string;
    toObject(): Readonly<WeaknessDisplayData>;
}
type WeaknessDisplayData = IWRDisplayData<WeaknessType> & Pick<Weakness, "value">;
interface WeaknessSource extends IWRSource<WeaknessType> {
    value: number;
}
declare class Resistance extends IWR<ResistanceType> implements ResistanceSource {
    protected readonly typeLabels: {
        acid: string;
        air: string;
        "all-damage": string;
        "area-damage": string;
        bleed: string;
        bludgeoning: string;
        cold: string;
        "critical-hits": string;
        custom: string;
        "damage-from-spells": string;
        earth: string;
        electricity: string;
        energy: string;
        fire: string;
        force: string;
        "ghost-touch": string;
        light: string;
        magical: string;
        mental: string;
        metal: string;
        "non-magical": string;
        nonlethal: string;
        "nonlethal-attacks": string;
        "persistent-damage": string;
        physical: string;
        piercing: string;
        plant: string;
        poison: string;
        precision: string;
        "protean-anatomy": string;
        radiation: string;
        salt: string;
        "salt-water": string;
        slashing: string;
        sonic: string;
        spells: string;
        spirit: string;
        "unarmed-attacks": string;
        vitality: string;
        void: string;
        vorpal: string;
        "vorpal-adamantine": string;
        water: string;
        weapons: string;
        "weapons-shedding-bright-light": string;
        wood: string;
        arcane: string;
        divine: string;
        occult: string;
        primal: string;
        holy: string;
        unholy: string;
        abysium: string;
        adamantine: string;
        dawnsilver: string;
        djezet: string;
        duskwood: string;
        inubrix: string;
        noqual: string;
        orichalcum: string;
        siccatite: string;
        silver: string;
        "cold-iron": string;
    };
    value: number;
    readonly doubleVs: IWRException<ResistanceType>[];
    constructor(data: IWRConstructorData<ResistanceType> & {
        value: number;
        doubleVs?: IWRException<ResistanceType>[];
    });
    get label(): string;
    get applicationLabel(): string;
    toObject(): ResistanceDisplayData;
    /** Get the doubled value of this resistance if present and applicable to a given instance of damage */
    getDoubledValue(damageDescription: Set<string>): number;
}
type ResistanceDisplayData = IWRDisplayData<ResistanceType> & Pick<Resistance, "value" | "doubleVs">;
interface ResistanceSource extends IWRSource<ResistanceType> {
    value: number;
    doubleVs?: IWRException<ResistanceType>[];
}
/** Weaknesses to things that "[don't] normally deal damage, such as water": applied separately as untyped damage */
declare const NON_DAMAGE_WEAKNESSES: Set<WeaknessType>;
export { Immunity, NON_DAMAGE_WEAKNESSES, Resistance, Weakness };
export type { ImmunitySource, IWRSource, ResistanceSource, WeaknessSource };
