"""Patch 2.2.23 (and 2.2.16a) data refresh for the bundled hero/item/spell/emblem tables.
Data literals only: hero tags/stats/cooldowns/counters, item passives, Sprint cooldown, Concussive Blast text.
One logic edit in the Codex tier board: the "board still reads 2.1.95a" notice stays hidden once the live
board is newer than the shipped seed (otherwise a new notice would appear when the patch feed moves to 2.2.23).
Called by build_static.py with its sub() helper; every replacement must hit exactly once."""
import os

ROSTER = {
'popol-and-kupa': ("""Popol and Kupa|Icefield Companions|Marksman|Push/Burst|Jungle,Gold Lane|Physical|Ranged|2|summon,trap,split-push,on-hit|3,4,3,3,3,4
P:We Are Friends!|Buff|—|Kupa the wolf fights beside him. If Kupa dies, a long respawn.
1:Bite 'Em, Kupa!|Dash|8-5s|Kupa pounces, knocking airborne.|knockup
2:Kupa, Help!|Trap|10-7s|Drops a totem trap that roots.|root
U:Popol's Surprise|Summon|36-26s|Enrages Kupa into a giant wolf. Extra HP and a fear slam.
H:saber,natalia,gusion,fanny,lancelot
S:khufra,chou,helcurt""",
"""Popol and Kupa|Icefield Companions|Marksman|Push/Burst|Jungle,Gold Lane|Physical|Ranged|2|summon,trap,split-push,on-hit,shield,slow|3,4,3,4,3,4
P:We Are Friends!|Buff|—|Kupa fights beside him, scales with Popol's level and gear, and regens out of combat. If Kupa falls, Popol prays him back. Traps immobilize, then leave a frost slow zone.
1:Bite 'Em, Kupa!|Skillshot|8-5s|Spear plus Kupa's lunge bite that greatly slows. In Alpha Wolf form it knocks airborne.|slow;knockup
2:Kupa, Help!|Shield|10-7s|Recalls Kupa for a shield, then rides him for fast movement while Kupa heals.|shield;dash
U:We Are Angry!|Transform|36-26s|9s Enraged: Kupa heals to full and becomes the Alpha Wolf with extra HP and stronger skills.|transform;knockup
H:jawhead,harley,lolita,saber,natalia
S:lesley,baxia,selena"""),
'aldous': ("""2:Contract: Explosion|Dash|10-7s|AoE smash that can knock airborne.|knockup""",
           """2:Contract: Explosion|Dash|8s|AoE smash that can knock airborne. Damage reduction while casting scales 30-55%.|knockup"""),
'aldous-line': ("""Aldous|Soul Contractor|Fighter|Burst/Support|EXP Lane|Physical|Melee|1|stack,late-power,execute,dash,split-push|1,5,2,3,4,2""",
                """Aldous|Soul Contractor|Fighter|Burst/Support|EXP Lane|Physical|Melee|1|stack,late-power,execute,dash,split-push|2,5,2,3,4,2"""),
'atlas': ("""P:Frigid Breath|Slow|—|Nearby enemies are constantly slowed.""",
          """P:Frigid Breath|Slow|—|Nearby enemies are slowed and periodically frozen (4s window, 4s freeze cooldown). Tankier while it lasts."""),
'freya': ("""Freya|Valkyrie|Fighter|Chase/Damage|EXP Lane,Jungle|Physical|Melee|1|dash,knockup,shield,sustain,anti-heal-needed|4,3,3,4,3,2
P:Spiritual Unity|Buff|—|Basics leap. After skills, orbs shield her.""",
"""Freya|Valkyrie|Fighter|Chase/Damage|EXP Lane,Jungle|Physical|Melee|1|dash,knockup,shield,sustain,anti-heal-needed,long-cd-ult|4,3,3,4,3,2
P:Spiritual Unity|Buff|—|Basics leap. After skills, orbs shield her, and the next basic after an orb heals."""),
'freya-ult': ("""U:Valkyrie Descent|Buff|36-28s|Enters Valkyrie state with range, shield and leap resets.""",
              """U:Valkyrie Descent|Buff|60-44s|Valkyrie state: harder leaping basics and +30 movement speed, no lifesteal. Long cooldown — punish the window after it."""),
'gloo': ("""Gloo|Swamp Spirits|Tank|Regen/Control|Roaming,EXP Lane|Magic|Melee|2|attach,regen,split,anti-heal-needed|3,4,4,2,5,2""",
         """Gloo|Swamp Spirits|Tank|Regen/Control|Roaming,EXP Lane|Magic|Melee|2|attach,regen,split,anti-heal-needed|3,4,3,2,5,2"""),
'gloo-ult': ("""U:Grab and Go|Attach|42-32s|Attaches to an enemy hero, sharing a chunk of their HP, stunning nearby.|attach;stun""",
             """U:Grab and Go|Attach|42-32s|Attaches to an enemy hero and transfers 60% of the damage he takes to them; stuns nearby.|attach;stun"""),
'kaja': ("""Kaja|Nazar King|Support|Initiator/Charge|Roaming|Magic|Melee|2|suppress,dash,lock-on,peel,initiator|4,3,5,4,3,2
P:Wrath Sanction|Buff|—|Nearby enemies take extra magic damage from his hits.
1:Ring of Order|Skillshot|8-5s|Electric ring skillshot.
2:Lightning Bomb|Dash|10-7s|Dashes, dropping a lightning zone.
U:Divine Judgment|Suppress|36-26s|Flies to a target and suppresses them, dragging them backward.|suppress;lock-on
H:diggie,chou,fanny,ling,kadita
S:minsitthar,akai,khufra""",
"""Kaja|Nazar King|Support|Initiator/Charge|Roaming|Magic|Melee|2|initiator,zone,pull,stun,dash,peel,long-cd-ult|4,3,5,4,3,2
P:Wings of Lightning|Buff|—|Skill damage paralyzes: a brief slow and 8% less damage dealt for 5s.
1:Ring of Order|AoE|7s|Lightning ring that expands and returns, slowing and healing him per hit.|slow
2:Soaring Wings|Dash|14s|Control-immune dash that knocks back and stuns on landing, then Soaring flight over walls.|stun;knockback;dash
U:Divine Binding|Zone|70-60s|Lasso area: enemies still inside after the delay are trapped 2.5s and dragged. Purify and Control Immunity do not free them.|zone;pull
H:valir,akai,grock
S:kimmy,estes,gloo"""),
'karrie': ("""U:Lightwheel Blast|Buff|36-26s|Drops a battery, huge attack speed, dual-form wheels.""",
           """U:Lightwheel Blast|Buff|36-26s|Drops a battery, huge attack speed, dual-form wheels. Harder-hitting wheels and +30% movement speed."""),
'lukas': ("""Lukas|Beast of Light|Fighter|Regen/Damage|EXP Lane,Jungle|Physical|Melee|1|transform,regen,anti-heal-needed,chase|4,4,3,4,4,3""",
          """Lukas|Beast of Light|Fighter|Regen/Damage|EXP Lane,Jungle|Physical|Melee|1|transform,regen,anti-heal-needed,chase,sustain|4,4,3,4,4,3"""),
'lunox': ("""U:Order & Chaos|Stance|20-12s|Light: untargetable dream state. Dark: huge magic nuke plus sleep.|untargetable;burst""",
          """U:Order & Chaos|Stance|20-12s|Light: untargetable dream state. Dark: snappier dash and a scaling magic nuke.|untargetable;burst"""),
'masha': ("""Masha|Wild-oats Fist|Fighter,Tank|Push/Damage|EXP Lane|Physical|Melee|3|triple-hp,feral,wound,berserker,dash,stun,on-hit|4,4,3,4,4,3""",
          """Masha|Wild-oats Fist|Fighter,Tank|Push/Damage|EXP Lane|Physical|Melee|3|triple-hp,feral,wound,berserker,dash,stun,on-hit|3,4,3,4,4,4"""),
'masha-s1': ("""1:Feral Swipe|Skillshot|8-5s|Energy wave that damages and slows heroes in a line.
2:Claw Strike|Dash|10-7s|Dash then a wide claw. Cooldown resets every time she loses an HP bar — the chase tool.""",
             """1:Feral Swipe|Skillshot|8-5s|Energy wave that damages heroes in a line and clears minions fast.
2:Claw Strike|Dash|10-7s|Dash then a narrower claw that slows 50%. Cooldown resets every time she loses an HP bar — the chase tool.|slow"""),
'xavier': ("""Xavier|Defier of Light|Mage|Damage/Guard|Mid Lane|Magic|Ranged|1|long-range,stun,immobilize,poke|3,4,4,1,1,4""",
           """Xavier|Defier of Light|Mage|Damage/Guard|Mid Lane|Magic|Ranged|1|long-range,stun,immobilize,poke,zone|3,4,4,2,1,4"""),
'xavier-s2': ("""2:Mysticfield|Root|10-7s|A zone that immobilizes.|root""",
              """2:Mysticfield|Root|10-7s|A zone that immobilizes; its activation now carries the big AoE damage.|root;zone"""),
'aulus': ("""U:The Power of Axe|Buff|36-26s|Huge attack speed, extra movespeed, and a slash wave on basics.""",
          """U:The Power of Axe|Buff|36-26s|Huge attack speed, extra movespeed, and a slash wave on basics. Less healing from enhanced basics since 2.2.16a."""),
'hirara': ("""1:Meisen-e|Dash|9s|Up to two joystick dashes, damaging enemies hit.|dash""",
           """1:Meisen-e|Dash|10-6.5s|Up to two joystick dashes, damaging enemies hit.|dash"""),
'rafaela': ("""1:Light of Retribution|Skillshot|6-4s|Holy bolts that bounce and reveal.
2:Holy Healing|Heal|10-7s|Heals allies and speeds them up.""",
            """1:Light of Retribution|Skillshot|5s|Holy bolts that bounce and reveal.
2:Holy Healing|Heal|10.5-9.5s|Heals allies and speeds them up."""),
'kalea': ("""Kalea|Surging Wave|Support,Fighter|Control/Regen|Roaming|Magic|Melee|2|engage,heal,knockup,anti-heal-needed|3,3,5,4,3,2""",
          """Kalea|Surging Wave|Support,Fighter|Control/Regen|Roaming|Magic|Melee|2|engage,heal,knockup,anti-heal-needed|4,3,5,4,3,2"""),
}

def apply(sub, out):
    A = os.path.join(out, 'assets')
    heroes = os.path.join(A, 'heroes-BSU0i1V0.js')
    for k, (old, new) in ROSTER.items():
        sub(heroes, old, new, 1)
    idx = os.path.join(A, 'index-C3feqQ8p.js')
    sub(idx, "taking damage cuts the attacker's Attack Speed and Attack Speed cap to 75% for 2s.",
             "taking damage cuts the attacker's Attack Speed and Attack Speed cap to 80% for 2s.", 1)
    sub(idx, "being hit by a skill cuts the attacker's Physical Damage by 6% for 2s, stacking 3 times.",
             "being hit by a skill cuts the attacker's Physical Damage by 8% for 2s, stacking 3 times.", 1)
    icon = os.path.join(A, 'ItemIcon-DC0OG2jp.js')
    sub(icon, "{id:`sprint`,name:{en:`Sprint`,es:`Sprint`},cooldown:100,", "{id:`sprint`,name:{en:`Sprint`,es:`Sprint`},cooldown:75,", 1)
    sub(icon, "effect:{en:`After the next basic attack, deal 100 (+7% total HP) magic damage to nearby enemies. CD 15s.`,es:`Tras el siguiente básico, 100 (+7% vida total) de daño mágico a enemigos cercanos. CD 15s.`}",
              "effect:{en:`After the next basic attack, deal 100 (+8% total HP) magic damage to nearby enemies (50% vs minions). CD 15s.`,es:`Tras el siguiente básico, 100 (+8% vida total) de daño mágico a enemigos cercanos (50% a minions). CD 15s.`}", 1)
    sub(icon, "Concussive Blast scales 7% total HP.`,`Set Tanque: +500 vida y +10 def híbrida, más Vitalidad +225. Tenacidad es 5% de reducción de daño bajo 50% de vida. Explosión concusiva escala 7% de vida total.`",
              "Concussive Blast scales 8% total HP.`,`Set Tanque: +500 vida y +10 def híbrida, más Vitalidad +225. Tenacidad es 5% de reducción de daño bajo 50% de vida. Explosión concusiva escala 8% de vida total.`", 1)
    codex = os.path.join(A, 'codex-B5u49Vl-.js')
    sub(codex, "k=x&&x!==`2.1.95a`&&x!==`2.2.16`,", "k=x&&x!==`2.1.95a`&&x!==`2.2.16`&&x!==`2.2.23`&&!(e?.boards?.length&&E>`2026-09-02`),", 1)
