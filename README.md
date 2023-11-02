# xdy-pf2e-workbench

![](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fpackage.json&label=version&query=$.version&colorB=blue)
![GitHub release](https://img.shields.io/github/release-date/xdy/xdy-pf2e-workbench) [![GitHub commits](https://img.shields.io/github/commits-since/xdy/xdy-pf2e-workbench/latest)](https://github.com/xdy/xdy-pf2e-workbench/commits/)  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) ![GitHub contributors](https://img.shields.io/github/contributors/xdy/xdy-pf2e-workbench)

![](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fversion%3Fstyle%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fstatic%2Fmodule.json)
![](https://img.shields.io/endpoint?url=https%3A%2F%2Ffoundryshields.com%2Fsystem%3FnameType%3Dshort%26showVersion%3D1%26style%3Dflat%26url%3Dhttps%3A%2F%2Fraw.githubusercontent.com%2Fxdy%2Fxdy-pf2e-workbench%2Fmain%2Fstatic%2Fmodule.json)

![GitHub all releases](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/total) ![the latest version zip](https://img.shields.io/github/downloads/xdy/xdy-pf2e-workbench/latest/xdy-pf2e-workbench.zip) ![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fxdy-pf2e-workbench)

<a href="https://weblate.foundryvtt-hub.com/engage/xdy-pf2e-workbench/"><img src="https://weblate.foundryvtt-hub.com/widgets/xdy-pf2e-workbench/-/multi-auto.svg" alt="Translation status" /></a>

This module is intended to hold a few features for the foundry vtt pf2e system that could well have been separate
modules and may well be eaten by the system at some point.

My current ideas (as in, no guarantee they'll ever actually get done) can be seen [here](featureIdeas.md)

## Current features (order by setting section)

A demo video of most features: https://www.youtube.com/watch?v=WzDq2N1X07s

* Mystification section
    * Enable NPC Mystification. Sets the name of a token on the current scene based on it's traits.
        * Numerous subsettings, for instance: if mystified by dragging it from the sidebar while holding the configured
          modifier key, clicking the mystify button in the token hud or using the mystify keyboard shortcut (no default
          set). There are several options to filter out certain types of traits. A prefix or postfix can be added to the
          mystified name (either a user-provided word, or one rolled on a user-provided rollable table. A sample table
          named "Workbench Adjectives" is included with the module and need not be imported into the world, just
          enter "Workbench Adjectives" - without the quotes - in the appropriate textfield). A random number
          can also be added after the postfix, and optionally be kept when demystifying the creature. E.g. 'Skeletal
          Champion' could become 'Jack the Mindless Undead Skeleton 23'. Note that player owned tokens will not be
          mystified.
    * Option to use the mystified name in chat messages created from that npc (actions/spells). Relies on the original
      actor name being present in the text. Only works if the original npc name is actually used and correctly spelled
      in the message.

* Reminder section
    * Option to remind when attack is made by a token that probably can't attack (due to being unconscious / dead /
      defeated / has no hp / etc).
        * Suboption to allow Eidolons to attack even if they have 0 hp.
    * Option to remind when an attack is made without targeting.
    * Option to show reminder each turn that the number of actions is other than three. Handles Quickened, Slowed and
      Stunned.
    * Option to automatically add a reminder effect when breath weapons are used (i.e. sent to chat.) Breath weapon
      description must match ```"<p>.*can't use.*1d([46]) rounds.*</p>"``` or the localized equivalent for it to be
      recognized.
    * Hero point handler. Gives option to (using Configure Controls) add a keybind to open a dialog that can reset or
      add hero points for all characters, add one hero point to a random (or selected) character (on new timers only)
      and, most importantly, start a timer to make the dialog reappear after (by default) 60 minutes. Timer now survives
      refreshes. Reopen the dialog to see how much time remains (press escape to leave without changes).
        * Set number of minutes till the next time the dialog is shown.

* Quality of Life section
    * Option to add an npc scaler feature when right clicking on an npc (This feature has been taken over from the
      delisted [PF2e Toolbox](https://github.com/Djphoenix719/FVTT-PF2EToolbox#npc-scaler) module. Thanks DJ! At some
      point Avery will
      have the time to add it to the system, until then I'll maintain it.)
    * Option to add a quick roller button to the journal directory, enabling improvised npc rolls with no actual npc
      using the suggested values from the GMG (This feature has been taken over from the
      delisted [PF2e Toolbox](https://github.com/Djphoenix719/FVTT-PF2EToolbox#quick-roller) module. Thanks DJ!)
    * Option to hold CTRL while casting a spell to cast it as a whispered chat message. Separate option to output a
      separate public chat message with a Recall Knowledge button to recognize it, an optional save button and an
      optional trait list, unless you hold CTRL+SHIFT to entirely skip this message.
    * Option to alter the token animation speed. (Not compatible with Multi Level Tokens teleport functionality.)

* World Automation section
    * Option to automatically move combatant that goes to 0 hp to just before the current combatant. (Normally due to
      the current combatant just having downed the target combatant.)
    * Enable/disable the option to autoroll damage on a hit.
    * Enable/disable the option to automatically apply persistent healing.
    * Option to automatically reduce Stunned condition at the start of the turn hidden behind option to show actions
      reminder each turn, which handles Quickened, Slowed and Stunned.
    * Option automatically give Unconscious if Dying is removed when at 0 hp.
    * Option to automatically increase Wounded when Dying is removed (handles the
      feats [Bounce Back](https://2e.aonprd.com/Feats.aspx?ID=1441)
      and [Numb to Death](https://2e.aonprd.com/Feats.aspx?ID=1182). Only works for players if they themself apply the
      damage/healing.
    * Option to automatically increase Dying on reaching 0 hp (handles the
      feats [Orc Ferocity](https://2e.aonprd.com/Feats.aspx?ID=83)
      , [Undying Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1291)
      , [Incredible Ferocity](https://2e.aonprd.com/Feats.aspx?ID=90)
      , [Rampaging Ferocity](https://2e.aonprd.com/Feats.aspx?ID=1294) and partial handling
      of [Deliberate Death](https://2e.aonprd.com/Feats.aspx?ID=2355))
        * Suboption to increase dying by one more when damaged by an enemy's targeted critical attack.
        * Suboption to increase dying when taking damage while already dying (does not know about
          immunities/weaknesses/resistance, so taking 0 damage will trigger it).
        * Suboption for how to handle if the final damage was nonlethal.
    * Option to automatically remove Dying when healed to above 0 hp.
    * Option to drop all held items on becoming unconscious.
    * Option to automate the results of the dying recovery roll button being clicked. (I.e. it does not automatically
      roll to try recover the dying character.)

* Client Automation section
    * Optional settings to (if the GM allows it) automatically roll damage on a hit for strikes and/or spell attacks.
      Needs the PF2e system setting 'Show results on attacks and saves' to be set so that the attacker can see the
      result in the chat. (E.g. for non-gm use either 'Owner' or 'All'). It also rolls for damage if a miss is turned
      into a hit via a reroll on the chat card.
        * Strikes. On a critical success it rolls critical damage.
        * Spell attacks (incl support for heightened spells). On a critical success it rolls normal damage, use the '
          double damage' button on the damage card.
        * Non-attack spells that deal damage (rolled when spell is cast, before saves, so targets need to manually apply
          the correct amount of damage based on save.) On a critical success it rolls normal damage, use the 'double
          damage' button on the damage card.
    * Optional settings to (if the GM allows it) automatically applying persistent damage, fast healing and
      regeneration (with an optional extra debug chat message), inspired by @Jamz' code.
    * Option to automatically reduce the Frightened condition at the end of each turn. See the included effect 'Effect:
      Minimum Frightened' for how to set a minimum frightened level that the module won't reduce below.

* Variant Rules
    * Option to allow item bonuses when using [ABP](https://2e.aonprd.com/Rules.aspx?ID=1357). (Currently broken)

* House Rules
    * Option to enable Keeley's Hero Point Rule (if reroll die is 10 or less, get a +10 bonus). Courtesy of stwlam
    * Option to enable my personal house rules (currently adds saves to crit spec for flail and hamer)
    * Not yet needed option to add Ancestry Paragon feat slots (don't enable until if/when the system removes them due
      to not being in the remaster rules)
    * Not yet needed option to add Dual Class feat slots (don't enable until if/when the system removes them due to not
      being in the remaster rules)
    * REALLY experimental option to use json to potentially brick your world. (Or,
      see [docs/housepatcher.md](docs/housepatcher.md) for more details.)

* No section
    * Optional setting to automatically collapse chat cards with an h3 header (intended for item cards like spells,
      feats, items, actions, etc). Can be configured to default to collapsed or expanded.
    * Option to either expand all damage cards, or only expand new cards. If the latter, on a refresh the last three
      messages are expanded if they are damage cards.
    * Option to add all skill actions to the character Actions page. (This feature has been taken over from the
      discontinued https://github.com/jamespdaily/pf2e-sheet-skill-actions/ module. Thanks James!)
        * The module will hide any skill actions that you're currently not trained in.
        * Actions that require a feat (e.g. Bon Mot) will not show up unless you actually have the feat.
    * Option to set a custom pause text and image, as well as to move it's position to center of screen.
    * A few potentially useful internal functions have been made available for macro use. Name and simple example of
      each can be found below:

```
        resetHeroPoints: resetHeroPoints, // game.PF2eWorkbench.resetHeroPoints(1)
        addHeroPoints: addHeroPoints, // game.PF2eWorkbench.addHeroPoints(1, "ALL") OR game.PF2eWorkbench.addHeroPoints(1, _token.actor.id)
        scaleNPCToLevelFromActor: scaleNPCToLevelFromActor, // await game.PF2eWorkbench.scaleNPCToLevelFromActor(_token.actor.id, 24);
        moveSelectedAheadOfCurrent: moveSelectedAheadOfCurrent, // await game.PF2eWorkbench.moveSelectedAheadOfCurrent(await game.combat?.getCombatantByToken(_token.id).id)
        doMystificationFromToken: doMystificationFromToken, // await game.PF2eWorkbench.doMystificationFromToken(_token.id, true) OR await game.PF2eWorkbench.doMystificationFromToken(_token.id, false)
        generateNameFromTraitsFromTokenId: generateNameFromTraitsForToken, // await game.PF2eWorkbench.generateNameFromTraitsFromTokenId(_token.id)
        noOrSuccessfulFlatcheck: noOrSuccessfulFlatcheck, // await game.PF2eWorkbench.noOrSuccessfulFlatcheck(game.messages.get("messageId"))
        basicActionMacros: basicActionMacros, // await game.PF2eWorkbench.basicActionMacros()
        callHeroPointHandler: callHeroPointHandler, // await game.PF2eWorkbench.callHeroPointHandler()
        mystifyNpcItems: mystifyNpcItems, // await game.PF2eWorkbench.mystifyNpcItems() OR await game.PF2eWorkbench.mystifyNpcItems(items, minimumRarity, usingPartyLevel, minimumLevel, multiplier)
        isSpellAvailable: isSpellAvailable, // game.PF2eWorkbench.isSpellAvailable(_token.actor, "Breathe Fire", { spellRank: 1, spellcastingEntry: 'Arcane Prepared Spells'})
```

* New Keybinds in Configure Controls
    * Optional keybind to mystify a creature.
    * Optional keybind to open the Hero Point Handler.
    * Optional keybinds for executing a macro in any position on any page of the macro hotbar, whether that page is
      currently showing or not.
    * Optional keybind called "Add user targets" that lets the GM add token targets to other users by selecting or
      hovering over those tokens, pressing the keybind and choosing which user should target those tokens. Enables GMs
      to help players having problems with targeting.

* Assorted other features
    * The latest versions of all V11-compatible macros
      from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e are included in each Workbench release.
      They can be found in the compendium "Symon-provided macros (asymonous-benefactor-macros)", with the express
      permission of said asymonous^H^H^H^H^H^H^H^H^Hanonymous (and colorless) benefactor. What documentation exists
      can be found towards the start of the macro. If you have issues with these macros, report them
      here: https://gitlab.com/symonsch/my-foundryvtt-macros/-/issues
    * The compendium "PF2e Workbench Items (xdy-pf2e-workbench-items)" contains a few useful effects and items:
        * Aura effects for Aura of Despair, Inspire Courage and Inspire Defense that automatically
          apply the effect to tokens within the aura. (Technically these not all these should be auras, but, close
          enough... Inspire Courage and Inspire Defense's effect can pass through walls that allow sound to pass)
        * Effect for Dirge of Doom that you can give to targets to give them frightened and not let the automated
          frightened removal reduce frightened below 1.
        * Effect: Minium Frightened that you can give to targets to not let the automated frightened removal reduce
          frightened below 1.
        * Effect that you can use to change Focus Point Maximum of a character
    * The compendium "PF2e Workbench Macros (xdy-pf2e-workbench-macros)" contains a few macros you might find useful.
        * 'Basic Action Macros' shows a dialog with a button for most macros, with bonus and whether you're the best in
          the party at that action (a setting to turn this off exists). (
          Thanks ApoAstolov). The five colors are denoting ranks, in order, grey=untrained, blue=trained, purple=expert,
          gold=master, red=legendary, with 'glow' meaning that you are the best in the party.
        * 'Build Npc Spellbook Journal' that builds a journal with the contents of an npc's spell list. Courtesy of
          Avery (Velara).
        * 'Whirlwind Strike' performs a Whirlwind Strike around the selected token if it has the Whirlwind Strike Feat,
          has the effect "Reach 'aura' (Workbench)' using the first reach weapon, or failing that the first weapon of
          any type.
* The compendium "PF2e Workbench Customizable Macros (xdy-customizable-macros)" contains customizable macros
  provided by ApoApostolov and esheyw. They are *intended* to be customized by the user by changing the javascript
  code (such as by adding/removing actions, setting what actors are part of the party, etc.) They are not really
  supported by me, so, if your changes break them, you get to keep all the parts! :) (Or, ping the original author.)
    * Customizable Basic Action Macros. A variant of Basic Action Macros that you can customize for your own needs.
      Add/remove actions, change party members, go wild!
      See https://apoapostolov.notion.site/PF2-Basic-Actions-Macro-1255adc12ecf44e881e6cd87941f7858 for
      documentation.
    * Customizable Procedural Checks. A framework for running several macros at once, requires customization to be
      useful. (At a minimum, change the actor id:s, this gets you a macro that can be used in exploration mode to
      perform standard actions when the group is about to open a door.)
      See https://apoapostolov.notion.site/PF2-Procedural-Checks-Macro-996bd20ace45411eb4b1f566686ecdb1 for
      documentation.
    * Customizable Refocus. This macro works the way it did before the Pathfinder Remaster changes.
      Like the other macros in this compendium it will most likely never be updated. If it does get updated you will
      need to reimport it manually.
    * Customizable isSpellAvailable. This macro can be used to check if a spell is available for an actor.
      See https://discord.com/channels/880968862240239708/880969304365994034/1161188968424018020
    * Customizable getAllFromAllowedPacks. This macro can be used to get all items from allowed packs.
      See https://discord.com/channels/880968862240239708/1116034857907273832/1164695510158946305
* There are a few more compendiums included with this module with assorted utility macros and items that do not
  need to be imported, as indicated by their labels all ending with 'do not import'

* Experimental features:
    * If a feature name starts with mentioning that it's experimental, use with caution. It's probably barely tested and
      may wreck your chat or brick your world. (No warranty expressed or implied. No user serviceable parts inside. Void
      where prohibited. Ei saa peittää. Do not taunt happy fun ball: https://www.youtube.com/watch?v=GmqeZl8OI2M)

* Deprecated features (will be removed eventually):
    * Option to automatically handle [Massive Damage](https://2e.aonprd.com/Rules.aspx?ID=384) as well as automatic
      handling of [Death effects](https://2e.aonprd.com/Rules.aspx?ID=383) will be removed from the Workbench once
      they're handled by the pf2e system.

* Recently removed features:
    * Creature Builder. Use https://github.com/miki4920/fvtt-module-pf2e-MonsterMaker instead.
    * Workbench Flat Check Notes. Use https://foundryvtt.com/packages/pf2-flat-check
      or https://foundryvtt.com/packages/pf2e-flatcheck-helper instead.
    * Workbench ABP. Use https://github.com/reonZ/pf2e-arp instead.
    * Option to change the max number of hero points a character can have. (It was long broken, instead add an
      ActiveEffectLike RE that overrides system.resources.heroPoints.max to whatever value you want to use.)
    * Option to apply Encumbered condition automatically based on current bulk when bulk changes as it's now part of the
      pf2e system.
    * Several deprecated 'Condition for (n) (timeperiod)s' effects as that is better handled by the Condition Manager
      macro found in the 'Symon-provided Macros' compendium.
    * Refocus macro (it broke with a recent system update). The customizableRefocusPremaster macro in the '
      xdy-customizable-macros' compendium apparently still works, so I'll keep that around until it too breaks, but
      won't get any further updates.) Post remaster
      use ```canvas.tokens.controlled.forEach(x=>x.actor.spellcasting.refocus({all:true}))``` instead to regain all
      focus at once for the selected tokens.
    * "Aura: Bless" and "Aura: Protective Ward" as they are now part of the pf2e system.
    * isSpellAvaiable was removed from the api and added to the "PF2e Workbench Customizable Macros" compendium.
    * Effects that you can use to implement ABP, "Another Alternative Bonus Progression" (by @crackjackflood) and an
      accompanying 'Feat' to add it to a character.

## Installation

Install by either searching for xdy-pf2e-workbench in [FoundryVTT's](https://foundryvtt.com/) Module tab and clicking
Install or by clicking the 'Install Module' button in that tab and entering the following as the Manifest
URL: https://github.com/xdy/xdy-pf2e-workbench/releases/latest/download/module.json

If you want to install this module for foundry 0.89 or lower use this (unsupported) module.json
link: https://github.com/xdy/xdy-pf2e-workbench/releases/download/v1.7.1/module.json

If you want to install this module for foundry 9 use this (unsupported) module.json
link: https://github.com/xdy/xdy-pf2e-workbench/releases/download/v3.44.3/module.json

If you want to install this module for foundry 10 use this (unsupported) module.json
link: https://github.com/xdy/xdy-pf2e-workbench/releases/download/v4.77.2/module.json

## Supported pf2e-specific QOL modules

As in, I try to keep the Workbench compatible with these modules (as I use them myself). In general, if the module does
something that the Workbench also does, I suggest disabling the Workbench equivalent.

* [PF2e Action Support](https://github.com/reyzor1991/foundry-vtt-pf2e-action-support)
* [PF2e Dailies](https://github.com/reonZ/pf2e-dailies)
* [PF2e Dorako UI](https://github.com/Dorako/pf2e-dorako-ui)
* [PF2e Extempore Effects](https://github.com/shemetz/pf2e-extempore-effects)
* [PF2e Flat Check](https://github.com/jessev14/pf2-flat-check) (Has explicit support in the autoroll damage feature.)
* [PF2e Giveth](https://github.com/reonZ/pf2e-giveth)
* [PF2e Hands Management](https://github.com/reyzor1991/foundry-vtt-pf2e-notification)
* [PF2e Hero Actions](https://github.com/reonZ/pf2e-hero-actions)
* [PF2e Interactive Token Tooltip](https://github.com/reonZ/pf2e-token-hud)
* [PF2e Keybind Menagerie](https://github.com/Drental/foundryvtt-pf2e-f-is-for-flatfooted)
* [PF2e Modifiers Matter](https://github.com/shemetz/pf2e-modifiers-matter)
* [PF2e Perception]() (not yet released)
* [PF2e Ranged Combat](https://github.com/JDCalvert/FVTT-PF2e-Ranged-Combat)
* [PF2e Reaction Checker](https://github.com/reyzor1991/foundry-vtt-pf2e-reaction)
* [PF2e Spells Summary](https://github.com/reonZ/pf2e-spells-summary)
* [PF2e Stances](https://github.com/reonZ/pf2e-stances)
* [PF2e Staves](https://github.com/jessev14/pf2e-staves)
* [PF2e Target Damage](https://github.com/MrVauxs/PF2e-Target-Damage)
* [pf2e Utility Buttons](https://github.com/oWave/pf2e-flatcheck-helper)

I do use other modules, and will try to avoid breaking even those I don't use, but they have lower priority.
(My [current module list](docs/current_modules.txt))

## NOT supported modules

As in, these are broken/known to clash with the Workbench (not linking these): PF2e Sheet Skill Actions, PF2e Toolbox.

### Patch Notes:

See [CHANGELOG.md](CHANGELOG.md)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CONTRIBUTORS.md](CONTRIBUTORS.md)

## The Programmer's Mantra

```

It is by caffeine alone I set my mind in motion
It is by the beans of Java that thoughts acquire speed
The hands acquire shakes
The shakes become a warning
It is by caffeine alone I set my mind in motion

```

* Help xdy stay awake long enough to add more
  bugs! [![Donate via Ko-Fi](https://img.shields.io/badge/support-ko--fi-ff4646?style=flat-square&logo=ko-fi)](https://ko-fi.com/xdy1337)

### Licenses

This module uses trademarks and/or copyrights owned by Paizo Inc., used
under [Paizo's Community Use Policy (paizo.com/communityuse)](paizo.com/communityuse). We are expressly prohibited from
charging you to use or access this content. This module is not published, endorsed, or specifically approved by Paizo.
For more information about Paizo Inc. and Paizo products, visit [paizo.com](paizo.com).

Open Game License:

* See [OpenGameLicense.md](OpenGameLicense.md)

Project Licensing:

* Everything in this project that is not covered by one of the following license exceptions is made available under the
  Apache License (see [LICENSE](LICENSE)).

Virtual Table Top Platform Licenses:

* Foundry VTT support is covered by the following
  license: [Limited License Agreement for module development](https://foundryvtt.com/article/license/).

Asset licenses:

* The cover image is modified by me
  from [Picture taken at a garage exhibit at LACMA.](https://unsplash.com/photos/1UimDTf69ho)
  by [Elmer Mercanas](https://unsplash.com/@elmercanasjr) under the [Unsplash License](https://unsplash.com/license)
* The icon for Basic Action Macros was made by Oskar and popy and is available under
  the [CC0 license](https://creativecommons.org/share-your-work/public-domain/cc0/)
* The icon for Another Alternative Bonus Progression is made by @CrackJackFlood and are "made by me no license free for
  public use".

build-packs license:

* The build-packs.ts script has been dreadfully hacked
  from https://github.com/CarlosFdez/pf2e-persistent-damage/blob/master/build-packs.ts and is, like the original,
  provided under the [ISC license](https://www.isc.org/licenses/)

asymonous-benefactor-macros:

* The macros found in the asymonous-benefactor-macros pack are, with the express permission of said
  asymonous^H^H^H^H^H^H^H^H^Hanonymous benefactor, collected
  from https://gitlab.com/symonsch/my-foundryvtt-macros/-/tree/main/PF2e at build time. Attribution for the macros can
  normally be found inside each macro, and the source url for each macro is added at the end of the file.

"Workbench Adjectives" table is based on a list
in [Unique Names Generator](https://github.com/andreasonny83/unique-names-generator/blob/main/src/dictionaries/adjectives.ts)
and is provided under the [MIT license](https://github.com/andreasonny83/unique-names-generator/blob/main/LICENSE)

