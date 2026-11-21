import{r as e,t}from"./rolldown-runtime-hePW80VL.js";var n=t((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function D(e,t){return E(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var A=/\/+/g;function j(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function M(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function N(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,N(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+j(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(A,`$&/`)+`/`),N(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=D(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(A,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+j(a,u),c+=N(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+j(a,u++),c+=N(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return N(M(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function P(e,t,n){if(e==null)return e;var r=[],i=0;return N(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function F(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var I=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},L={map:P,forEach:function(e,t,n){P(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return P(e,function(){t++}),t},toArray:function(e){return P(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=L,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:F}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,I)}catch(e){I(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.8`})),r=t(((e,t)=>{t.exports=n()})),i=e(r(),1),a=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},o=(e=>e?a(e):a),s=e=>e;function c(e,t=s){let n=i.useSyncExternalStore(e.subscribe,i.useCallback(()=>t(e.getState()),[e,t]),i.useCallback(()=>t(e.getInitialState()),[e,t]));return i.useDebugValue(n),n}var l=e=>{let t=o(e),n=e=>c(t,e);return Object.assign(n,t),n},u=(e=>e?l(e):l);function d(e,t){let n;try{n=e()}catch{return}return{getItem:e=>{let r=e=>e===null?null:JSON.parse(e,t?.reviver),i=n.getItem(e)??null;return i instanceof Promise?i.then(r):r(i)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t?.replacer)),removeItem:e=>n.removeItem(e)}}var f=e=>t=>{try{let n=e(t);return n instanceof Promise?n:{then(e){return f(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return f(t)(e)}}}},p=(e,t)=>(n,r,i)=>{let a={storage:d(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},o=!1,s=0,c=new Set,l=new Set,u=a.storage;if(!u)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),n(...e)},r,i);let p=()=>{let e=a.partialize({...r()});return u.setItem(a.name,{state:e,version:a.version})},m=i.setState;i.setState=(e,t)=>(m(e,t),p());let h=e((...e)=>(n(...e),p()),r,i);i.getInitialState=()=>h;let g,_=()=>{if(!u)return;let e=++s;o=!1,c.forEach(e=>e(r()??h));let t=a.onRehydrateStorage?.call(a,r()??h)||void 0;return f(u.getItem.bind(u))(a.name).then(e=>{if(e){if(typeof e.version==`number`&&e.version!==a.version){if(a.migrate){let t=a.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error(`State loaded from storage couldn't be migrated since no migrate function was provided`)}else return[!1,e.state]}return[!1,void 0]}).then(t=>{if(e!==s)return;let[i,o]=t;if(g=a.merge(o,r()??h),n(g,!0),i)return p()}).then(()=>{e===s&&(t?.(r(),void 0),g=r(),o=!0,l.forEach(e=>e(g)))}).catch(n=>{e===s&&t?.(void 0,n)})};return i.persist={setOptions:e=>{a={...a,...e},e.storage&&(u=e.storage)},clearStorage:()=>{++s,u?.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>_(),hasHydrated:()=>o,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(l.add(e),()=>{l.delete(e)})},a.skipHydration||_(),g||h},m=`=miya
Miya|Moonlight Archer|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|1|burst,immobile,crit,late-power,skillshot,untargetable,short-cd-spam|2,5,1,2,2,3
P:Moon Blessing|Buff|—|Basic attacks stack attack speed. Full stacks fire extra arrows.|on-hit
1:Fission Shot|Skillshot|8-6s|Cone of split arrows. Skillshot poke and waveclear.
2:Arrow of Eclipse|Buff|10-6s|Huge attack-speed steroid plus a brief invis window.
U:Hidden Moonlight|Untargetable|38-28s|Becomes untargetable, refreshes stacks, short relocate.|untargetable
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt,aamon
I:winter-crown,immortality,wind-of-nature,warrior-boots

=balmond
Balmond|Bloody Beast|Fighter|Damage/Regen|Jungle,EXP Lane|Physical|Melee|1|burst,sustain,regen,spin,anti-heal-needed,execute|4,3,2,2,4,4
P:Bloodthirst|Regen|—|Charges a shield while dealing or taking damage, then pulses regen.
1:Soul Lock|Skillshot|8-6s|Charge in a line, slowing the first hero.
2:Cyclone Sweep|Persist-zone|6-4s|Spin dealing percent-HP physical damage around him.|percent-hp
U:Lethal Counter|Execute|30-22s|Slam that executes low-HP targets with true damage.|execute;true-damage
H:karrie,ruby,terizla,thamuz,esmeralda
S:xavier,pharsa,wanwan
I:sea-halberd,dominance-ice,antique-cuirass

=saber
Saber|Wandering Sword|Assassin|Charge/Finisher|Jungle,Roaming|Physical|Melee|1|burst,lock-on,dash,execute,dive|5,3,3,4,2,2
P:Enemy's Bane|Buff|—|Skills inflict a mark that his basics detonate for extra damage.
1:Flying Sword|Skillshot|10-6s|Launches orbiting swords that can be recast to stun.|stun
2:Triple Sweep|Dash|6-4s|Three slashes with a short dash. Gap closer.
U:Charge|Lock-on|32-22s|Dashes to a hero, knocks airborne, then a five-hit combo.|lock-on;airborne;suppress
H:lancelot,ling,fanny,kadita,diggie,chou
S:khufra,minsitthar,lolita
I:winter-crown,winter-truncheon,immortality,wind-of-nature

=alice
Alice|Queen of Blood|Tank,Mage|Charge/Regen|EXP Lane,Jungle|Magic|Ranged|2|sustain,regen,lifesteal,burst,anti-heal-needed,shield|3,5,2,3,4,3
P:Blood Ancestry|Buff|—|Stacks max HP, magic power and regen by absorbing blood orbs.
1:Flowing Blood|Skillshot|8-6s|Blood orb that heals her if she touches it after hitting an enemy.
2:Blood Ode|Persist-zone|6-4s|Drain aura. Spell vamp vs heroes.
U:Blood Ode|Burst|30-22s|Transforms, gaining spell vamp, extra drain and a blood surge.|spell-vamp
H:karrie,baxia,thamuz,kaja
S:helcurt,saber,lancelot
I:glowing-wand,necklace-of-durance,sea-halberd,dominance-ice

=nana
Nana|Sweet Leonin|Mage|Poke/Burst|Mid Lane|Magic|Ranged|1|poke,burst,skillshot,morph,peel,long-cd-ult|3,3,4,2,2,3
P:Molina Smooch|Morph|—|After a few hits Molina morphs the attacker into a cute form.|morph;slow
1:Magic Boomerang|Skillshot|6-4s|Returning skillshot. Double-tap poke.
2:Molina Blitz|Summon|10-7s|Places Molina. Explodes for damage and morph.|morph
U:Molina Energy Burst|Skillshot|36-28s|Long-range bouncing blast. Huge poke if Molina is out.
H:saber,hayabusa,lancelot,natalia,gusion
S:helcurt,ling,aamon
I:winter-truncheon,immortality,rapid-boots

=tigreal
Tigreal|Warrior of Dawn|Tank|Crowd Control|Roaming|Physical|Melee|1|initiator,stun,knockup,peel,lock-on|2,3,5,2,5,2
P:Fearless|Shield|—|After a few hits, next basic knocks back and grants a shield.
1:Attack Wave|Skillshot|8-6s|Shockwave that slows. Set-up tool.
2:Sacred Hammer|Dash|10-7s|Charge; recast slams and knocks airborne.|airborne
U:Implosion|Lock-on|42-32s|Pulls enemies in a circle then stuns. Classic set.|pull;stun
H:diggie,chou,fanny,ling,wanwan
S:minsitthar,akai,khufra
I:tough-boots,winter-crown,brute-force-breastplate

=alucard
Alucard|Demon Hunter|Fighter,Assassin|Chase/Damage|Jungle|Physical|Melee|1|lifesteal,chase,dash,sustain,anti-heal-needed,aa-enhance|4,4,1,4,3,2
P:Pursuit|Buff|—|After a skill, next basic lunges and restores HP. Endless Battle is the same trigger — buy it.
1:Ground Splitter|Dash|8-5s|Two-stage leap slash.
2:Whirling Smash|AoE|8-6s|Spin slash around him.
U:Fervor|Buff|32-24s|Lifesteal steroid plus extra leap charges.
H:ruby,khufra,thamuz,terizla,karrie
S:chou,minsitthar,phoveus
I:sea-halberd,dominance-ice,antique-cuirass,winter-crown

=karina
Karina|Shadow Blade|Assassin|Finisher/Magic Damage|Jungle|Magic|Melee|2|burst,dash,execute,invulnerable,anti-heal-needed|4,4,1,5,2,2
P:Ash Agony|Execute|—|Basics deal bonus magic vs low-HP or marked targets.
1:Dance of Blades|Invulnerable|8-5s|Spin, immune to basics, damages around her.|invulnerable
2:Shadow Assault|Dash|8-5s|Dash slash. Reset-friendly.
U:Death Lotus|Lock-on|32-22s|Rides a target dealing magic bursts. Can recast.|lock-on
H:saber,khufra,helcurt,chou,diggie
S:minsitthar,lolita,atlas
I:winter-truncheon,athenas-shield,radiant-armor

=akai
Akai|Panda Warrior|Tank|Guard/Crowd Control|Roaming|Physical|Melee|1|knockup,initiator,peel,dash,body-block|3,3,5,3,5,2
P:Tai Chi|Shield|—|Gains a shield and extra recovery after a few hits.
1:Heavy Spin|Skillshot|8-6s|Rolling cannonball that slows.
2:Blender Blow|Dash|10-7s|Jumps to a target, knocks nearby enemies airborne.|airborne
U:Hurricane Dance|Knockup|40-30s|Becomes a bouncing ball that knocks enemies around. Body-blocks dashes.|knockup;body-block
H:diggie,karrie,thamuz,baxia
S:chou,wanwan,pharsa
I:sea-halberd,antique-cuirass,tough-boots

=franco
Franco|Frozen Warrior|Tank|Initiator/Control|Roaming|Physical|Melee|2|suppress,hook,lock-on,initiator,slow|3,3,5,2,4,1
P:Wasteland Force|Slow|—|Basics slow. Sets up the hook.
1:Iron Hook|Skillshot|15-10s|Long hook. Pulls the first hero hit.|pull;skillshot
2:Fury Shock|Slow|7-5s|Point-blank slow / damage.
U:Bloody Hunt|Suppress|42-32s|Suppresses a target in place while allies collapse.|suppress;lock-on
H:diggie,akai,khufra,minsitthar,lolita,fanny
S:chou,wanwan,ling
I:tough-boots,winter-crown,brute-force-breastplate

=bane
Bane|Frozen King|Fighter,Mage|Push/Burst|Jungle,EXP Lane|Hybrid|Melee|1|burst,poke,wave-clear,shark,sustain|3,4,2,2,3,5
P:Sharknado|Buff|—|Every few basics or skills send a shark for extra damage.
1:Crab Claw Cannon|Skillshot|6-4s|Long cannon poke. Can be charged.
2:Rum|Heal|12-8s|Drinks, healing and empowering the next attacks.
U:Deadly Catch|AoE|32-24s|Tsunami smash / shark feast. Wave and teamfight nuke.
H:lancelot,saber,hayabusa,karrie
S:chou,thamuz,khufra
I:sea-halberd,antique-cuirass,athenas-shield

=bruno
Bruno|The Protector|Marksman|Finisher/Burst|Gold Lane|Physical|Ranged|2|burst,skillshot,stun,crit,powerball|3,4,2,3,2,3
P:Flying Steel|Buff|—|Basics throw his ball. Extra range and on-hit.
1:Volley Shot|Skillshot|8-6s|Powered throw. Landing distance scales with movespeed; ball stays 3s and will not cross walls. 2.2.16: MS on kick, not on hit.
2:Flying Tackle|Dash|9-7s|Slide in the joystick direction. No damage, no pull — retrieves a Powerball at the end. Tiny stun.
U:Worldie|Skillshot|36-28s|Piercing ball. First hero hit is stunned, slowed, and knocked to max range; then it bounces preferring heroes. No longer shreds Physical Defense.
H:saber,lancelot,hayabusa,natalia,gusion
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=clint
Clint|West Justice|Marksman|Finisher/Burst|Gold Lane|Physical|Ranged|1|burst,skillshot,poke,crit,trap|3,4,2,2,2,3
P:Quick Draw|Buff|—|Skills store extra enhanced basics.
1:Blind Smoke|Skillshot|8-6s|Grenade that blinds and damages in a zone.|blind
2:Howitzer|Skillshot|10-6s|Double pistol shot through a line. Trap synergy.
U:Grenade Rain|Skillshot|36-28s|Long-range howitzer burst.
H:saber,lancelot,fanny,natalia,gusion
S:chou,hayabusa,helcurt
I:winter-crown,immortality,warrior-boots

=rafaela
Rafaela|Wings of Holiness|Support|Regen/Guard|Roaming|Magic|Ranged|1|heal,peel,slow,anti-heal-needed,immobile|2,3,3,2,3,2
P:Healing Spring|Heal|—|Nearby allies regen. Weak to anti-heal.
1:Light of Retribution|Skillshot|5s|Holy bolts that bounce and reveal.
2:Holy Healing|Heal|10.5-9.5s|Heals allies and speeds them up.
U:Holy Baptism|Stun|36-28s|Forward stun wave. Set / peel.|stun
H:helcurt,saber,natalia,lancelot,kaja
S:hayabusa,gusion,ling
I:glowing-wand,necklace-of-durance,sea-halberd,dominance-ice

=eudora
Eudora|Lightning Weaver|Mage|Control/Burst|Mid Lane|Magic|Ranged|1|burst,stun,lock-on,immobile,long-cd-ult|5,2,4,1,1,2
P:Superconductor|Buff|—|After a skill, next skill is supercharged for extra damage / stun.
1:Forked Lightning|Skillshot|6-4s|Line lightning. Supercharged forks.
2:Electric Arrow|Stun|10-7s|Lock-on stun. Supercharged lasts longer.|stun;lock-on
U:Thunder's Wrath|Lock-on|32-22s|Massive single-target nuke. Supercharged adds a second bolt.|lock-on
H:saber,lancelot,hayabusa,natalia,helcurt,fanny
S:gusion,ling,aamon
I:athenas-shield,winter-truncheon,tough-boots,immortality

=zilong
Zilong|Spear of Dragon|Fighter,Assassin|Chase/Damage|EXP Lane|Physical|Melee|1|dash,lock-on,suppress,split-push,execute|4,3,3,4,2,3
P:Dragon Flurry|Buff|—|After a skill, next basics are faster spears.
1:Spear Flip|Lock-on|10-7s|Flips a target over his shoulder. Interrupt / set.|displacement
2:Spear Strike|Dash|8-5s|Spear dash. Gap closer and waveclear.
U:Supreme Warrior|Buff|32-24s|Move speed, attack speed, and immunity to slow.
H:khufra,ruby,chou,phoveus,minsitthar
S:thamuz,terizla,esmeralda
I:antique-cuirass,dominance-ice,winter-crown

=fanny
Fanny|Blade Dancer|Assassin|Chase/Finisher|Jungle|Physical|Melee|3|dash,high-mobility,burst,energy,cable|5,4,1,5,1,2
P:Air Superiority|Buff|—|Deals extra damage while flying. Energy is her resource.
1:Tornado Strike|AoE|3s|Spin slash. Weave between cables.
2:Steel Cable|Dash|0.5s energy|Fires a cable and flies to the wall. Infinite mobility if she hits.|dash;blink
U:Cut Throat|Lock-on|32-22s|Flies to a target for a huge strike. Often lethal mid-cable.|lock-on
H:khufra,saber,natalia,franco,akai,phoveus
S:minsitthar,lolita,atlas
I:winter-crown,immortality,tough-boots

=layla
Layla|Energy Gunner|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|1|immobile,late-power,poke,crit,skillshot|1,5,1,1,1,3
P:Malefic Gun|Buff|—|Range and damage grow with level and with distance.
1:Void Projectile|Skillshot|6-4s|Long skillshot. Extra damage at range.
2:Void Vortex|Slow|10-7s|Planted slow zone.
U:Destruction Rush|Skillshot|40-30s|Long-range laser. Needs peel.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt,aamon
I:winter-crown,immortality,wind-of-nature,warrior-boots

=minotaur
Minotaur|Son of Minos|Tank,Support|Crowd Control|Roaming|Physical|Melee|1|initiator,knockup,rage,peel,stun|2,3,5,2,5,2
P:Rage|Buff|—|Builds rage. Enraged state empowers skills.
1:Despair Stomp|AoE|8-6s|Stomp that slows, knocks airborne when enraged.|airborne
2:Motivation Roar|Heal|10-7s|AoE heal / speed. Enraged knocks back.
U:Minoan Fury|Knockup|48-36s|Channelled stomps that knock up a zone. Huge set.|knockup
H:diggie,chou,pharsa,wanwan,karrie
S:fanny,ling,helcurt
I:tough-boots,antique-cuirass,athenas-shield

=lolita
Lolita|Steel Elf|Support,Tank|Guard/Crowd Control|Roaming|Physical|Melee|2|peel,shield,projectile-block,stun,initiator|2,3,4,2,4,1
P:Steadfast Presence|Buff|—|Nearby allies gain physical defense.
1:Charge|Dash|10-7s|Shield charge. Recast slams.
2:Guardian's Bulwark|Projectile-block|12-8s|Raises a wall that blocks skillshots and basics.|projectile-block
U:Noumenon Energy Blast|Stun|42-32s|Charges a cone stun. Can walk while charging.|stun
H:karrie,thamuz,baxia,helcurt
S:pharsa,chang-e,gusion
I:antique-cuirass,athenas-shield,tough-boots

=hayabusa
Hayabusa|Crimson Shadow|Assassin|Chase/Burst|Jungle|Physical|Melee|2|burst,dash,untargetable,shadow,dive|5,3,1,5,1,2
P:Ninjutsu|Buff|—|Quad Shadow stacks reduce his skill cooldowns.
1:Phantom Shuriken|Skillshot|8-5s|Three shurikens. Stack his passive.
2:Quad Shadow|Dash|14-8s|Places a shadow; recast teleports to it.|dash;blink
U:Ougi: Shadow Kill|Untargetable|32-22s|Disappears into untargetable slashes on one target.|untargetable;lock-on
H:khufra,saber,natalia,helcurt,chou
S:minsitthar,akai,franco
I:winter-crown,immortality,tough-boots

=freya
Freya|Valkyrie|Fighter|Chase/Damage|EXP Lane,Jungle|Physical|Melee|1|dash,knockup,shield,sustain,anti-heal-needed,long-cd-ult|4,3,3,4,3,2
P:Spiritual Unity|Buff|—|Basics leap. After skills, orbs shield her, and the next basic after an orb heals.
1:Leap of Faith|Dash|8-5s|Leap smash.
2:Spirit Hits|AoE|8-5s|Three hammer hits around her. Airborne on the third.|airborne
U:Valkyrie Descent|Buff|60-44s|Valkyrie state: harder leaping basics and +30 movement speed, no lifesteal. Long cooldown — punish the window after it.
H:karrie,thamuz,ruby,khufra,terizla
S:chou,phoveus,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=gord
Gord|Professor of the Mystics|Mage|Poke/Burst|Mid Lane|Magic|Ranged|1|immobile,skillshot,persist-zone,stun,poke|3,4,3,1,1,4
P:Mystic Favor|Buff|—|Every few hits a true-damage bonus.
1:Mystic Projectile|Skillshot|6-4s|Skillshot that stuns if it hits the center.|stun;skillshot
2:Mystic Field|Persist-zone|8-6s|Ground zone that snares and amps his other skills.|root
U:Mystic Gush|Persist-zone|32-24s|Channeled laser. Massive if uninterrupted.|channel
H:saber,lancelot,hayabusa,natalia,fanny,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=natalia
Natalia|Bright Claw|Assassin|Chase/Finisher|Jungle,Roaming|Physical|Melee|2|stealth,burst,silence,dash,dive|5,3,2,5,1,2
P:Assassin Instinct|Stealth|—|Enters camouflage in brush / out of combat. Extra damage from stealth.
1:Roar of the Beast|Silence|8-5s|Cone silence.|silence
2:Nightraven's Mark|Dash|8-5s|Dash; marks then extra damage.
U:The Hunt|Buff|28-20s|Resets stealth, extra move speed, enhanced basics.
H:saber,khufra,lolita,akai,helcurt
S:minsitthar,franco,atlas
I:winter-crown,immortality,tough-boots,dominance-ice

=kagura
Kagura|Onmyouji Master|Mage|Poke/Finisher|Mid Lane|Magic|Ranged|3|poke,burst,dash,purify-style,umbrella,skillshot|4,4,3,4,2,3
P:Yin Yang Gathering|Buff|—|Link to her umbrella. Skills change if she holds it or not.
1:Seimei Umbrella Open|Skillshot|6-4s|Throws or recalls the umbrella. Slow / damage.
2:Rasho Umbrella Flee|Dash|8-5s|Dashes. With umbrella, a purifying knockback.|purify;dash
U:Yin Yang Overturn|Burst|36-26s|Pulls and knocks enemies around the umbrella, or a close-range wave.|pull;knockup
H:saber,helcurt,lancelot,hayabusa,gusion
S:natalia,chou,ling
I:athenas-shield,winter-truncheon,tough-boots

=chou
Chou|Kung Fu Boy|Fighter|Chase/Control|EXP Lane,Roaming|Physical|Melee|2|dash,knockup,immunity,peel,kick|4,3,4,5,3,2
P:Only Champion|Buff|—|Every few basics knock back slightly and give a shield.
1:Jeet Kune Do|Dash|8-5s|Three directional kicks. Last hit knocks up.|airborne
2:Shimo Enrai|Immunity|9-6s|Brief spell immunity plus a shockwave.|immunity
U:The Way of Dragon|Lock-on|36-26s|Kicks a target behind him. Interrupt / set / peel.|displacement;lock-on
H:khufra,phoveus,minsitthar,ruby,terizla
S:akai,atlas,franco
I:antique-cuirass,dominance-ice,tough-boots

=sun
Sun|Monkey King|Fighter|Push/Damage|EXP Lane,Jungle|Physical|Melee|1|split-push,clones,on-hit,sustain,anti-heal-needed|3,4,1,3,3,5
P:Simian God|Buff|—|Clones inherit a portion of his damage.
1:Endless Variety|Skillshot|8-5s|Throws a clone decoy.
2:Swift Monkey King|Dash|10-7s|Dash; clones copy.
U:Clone Techniques|Summon|36-28s|Spawns two clones. Split-push nightmare.
H:karrie,thamuz,terizla,baxia,pharsa
S:chou,khufra,ruby
I:sea-halberd,dominance-ice,antique-cuirass

=alpha
Alpha|Blade of Enmity|Fighter|Charge/Damage|Jungle,EXP Lane|Physical|Melee|1|true-damage,dash,knockup,sustain|4,3,3,3,3,3
P:Beta vis Beta|True-damage|—|Beta fires true damage bolts with his skills.
1:Force Swing|Skillshot|8-5s|Shockwave plus Beta shot.
2:Spear of Alpha|Dash|12-8s|Hooks himself in. Airborne on arrival.|airborne
U:Alphaserve|Persist-zone|36-26s|Laser over a zone, Beta true damage, slow.
H:karrie,ruby,thamuz,khufra
S:chou,phoveus,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=ruby
Ruby|Little Red Hood|Fighter|Crowd Control/Regen|EXP Lane|Physical|Melee|2|hook,knockup,regen,spell-vamp,anti-heal-needed,peel|3,3,5,3,4,2
P:Let's Dance!|Spell-vamp|—|Massive spell vamp. She never dies if she keeps hitting.
1:Be Good!|Skillshot|8-5s|Scythe throw. Can flash during it.
2:Don't Run, Wolfie!|Dash|10-7s|Dash that knocks airborne.|airborne
U:I'm Offended!|Pull|36-26s|Huge hook that stuns and pulls.|pull;stun
H:karrie,baxia,thamuz,pharsa,wanwan
S:esmeralda,terizla,xavier
I:sea-halberd,necklace-of-durance,glowing-wand,dominance-ice

=yi-sun-shin
Yi Sun-shin|Paenlong Legend|Assassin,Marksman|Finisher/Chase|Jungle|Physical|Ranged|3|ranged-melee,stealth,skillshot,execute|3,4,2,4,2,4
P:Heavenly Vow|Buff|—|Swaps melee/ranged stance. Ranged basics pierce.
1:Mountain Shocker|Skillshot|8-5s|Fan of arrows, or a melee dash.
2:Wavebreaker|Dash|10-7s|Dash; marks then extra damage.
U:Blood Floods|Stealth|36-26s|Global-style trampling shot that also stealths him.|stealth;global
H:khufra,saber,natalia,helcurt
S:chou,franco,akai
I:winter-crown,immortality,wind-of-nature

=moskov
Moskov|Spear of Quiescence|Marksman|Finisher/Chase|Gold Lane|Physical|Ranged|2|pierce,dash,stun,on-hit,crit|3,5,2,3,2,3
P:Spear of Quiescence|Buff|—|Basics pierce. Hits behind the target still count.
1:Spear of Misery|Dash|8-5s|Dash that can knock a target into a wall for a stun.|stun;dash
2:Abyss Walker|Buff|10-7s|Attack speed and a teleport window.
U:Spear of Destruction|Skillshot|40-30s|Long spear. Reveals and damages a line.
H:saber,lancelot,hayabusa,natalia,gusion
S:chou,ling,khufra
I:winter-crown,immortality,wind-of-nature

=johnson
Johnson|Wild Engine|Tank,Support|Support/Crowd Control|Roaming|Physical|Melee|2|initiator,stun,transform,set|2,3,5,4,5,1
P:Electromagnetic Energy|Shield|—|After a few hits, next basic shocks nearby enemies.
1:Impact Rounds|Skillshot|8-5s|Missiles that slow.
2:Electrifying Knockout|Dash|12-8s|Dash slam, stun in a small area.|stun
U:Full Throttle|Transform|40-30s|Turns into a car. Crash stuns a huge area. Can carry an ally.|stun;transform
H:diggie,karrie,thamuz,pharsa
S:chou,wanwan,fanny
I:tough-boots,antique-cuirass,athenas-shield

=cyclops
Cyclops|Starsoul Magician|Mage|Poke/Control|Mid Lane|Magic|Ranged|1|lock-on,stun,poke,immobile|4,3,4,2,2,3
P:Star Power|Buff|—|Skills and basics stack a stun.|stun
1:Stardust Shock|Lock-on|6-4s|Two lock-on stars.
2:Planets Attack|Skillshot|8-5s|Fan of planets.
U:Star Power Lockdown|Lock-on|32-22s|Imprisons a target in a star cage.|stun;lock-on
H:saber,lancelot,hayabusa,natalia,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=estes
Estes|Moon Elf King|Support|Regen/Guard|Roaming|Magic|Ranged|1|heal,anti-heal-needed,peel,immobile|2,4,2,2,3,1
P:Link of Life|Heal|—|Healing is amplified vs low-HP allies.
1:Moonlight Immersion|Heal|8-5s|Holds a heal channel on an ally. Recast to stick it.
2:Domain of Moon Goddess|Persist-zone|12-8s|Healing circle. Anti-heal shuts it down.
U:Blessing of Moon Goddess|Heal|40-30s|Huge team heal plus extra regen.
H:helcurt,saber,natalia,lancelot,kaja,baxia
S:hayabusa,gusion,chou
I:glowing-wand,necklace-of-durance,sea-halberd,dominance-ice

=hilda
Hilda|Power of Megalith|Fighter,Tank|Damage/Regen|Roaming,EXP Lane|Physical|Melee|1|regen,brush,burst,anti-heal-needed,split-push|4,3,2,3,5,2
P:Blessing of Wilderness|Regen|—|In brush she regen and gains a heavy shield. Ganks from fog.
1:Combat Ritual|Dash|8-5s|Empowered smash. Can be recast.
2:Art of Hunt|Skillshot|10-7s|Speed-up, then a slamming shockwave.
U:Power of Megalith|Execute|36-26s|Giant smash. Extra damage vs low HP. Resets brush power.
H:karrie,baxia,thamuz,pharsa,kaja
S:chou,ruby,terizla
I:sea-halberd,dominance-ice,antique-cuirass

=aurora
Aurora|Maiden of the Glacier|Mage|Crowd Control/Poke|Mid Lane|Magic|Ranged|1|freeze,stun,burst,skillshot,immobile|4,3,5,1,1,3
P:Pride of Ice|Freeze|—|Every few skills a hit freezes the target.|stun
1:Frost Shock|Skillshot|7-5s|AoE freeze patch.
2:Bitter Air|Skillshot|8-5s|Long skillshot. Supercharged if it hits frozen targets.
U:Frozen Sun|AoE|36-28s|Huge delayed freeze in a circle.|stun
H:saber,lancelot,hayabusa,natalia,fanny,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,tough-boots

=lapu-lapu
Lapu-Lapu|Courageous Blade|Fighter|Chase/Burst|EXP Lane|Physical|Melee|2|dash,burst,stance,knockup,immunity|4,4,3,4,3,3
P:Hero's Resolve|Shield|—|Charges a shield from dealing damage. Empowered skills consume it.
1:Justice Blades / Land of the Brave|Dash|8-5s|Double slash, or a leaping smash in Heavy Sword.
2:Brave Stance / Storm of Wrath|Buff|10-7s|Enters Heavy Sword, or a swirling slash.
U:Blessed Land / Forefathers' Blessing|AoE|32-22s|Drops a zone that empowers him; recast is a knock-up slam.|knockup
H:karrie,thamuz,khufra,ruby,phoveus
S:chou,terizla,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=vexana
Vexana|Shimmer of Hope|Mage|Poke/Control|Mid Lane|Magic|Ranged|2|undead,skillshot,stun,summon,poke|3,4,4,2,2,3
P:Nether Scepter|Buff|—|Skills apply a curse that detonates.
1:Deathly Gaze|Skillshot|8-5s|Cursed skillshot.
2:Nether Strike|Stun|10-7s|Cone fear / stun.|stun
U:Eternal Guard|Summon|40-30s|Raises an undead knight that fights and knocks people.
H:saber,lancelot,hayabusa,natalia,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=roger
Roger|Dire Wolf Hunter|Fighter,Marksman|Finisher/Burst|Jungle|Physical|Melee|2|transform,chase,burst,on-hit|4,4,1,4,3,3
P:Full Moon Curse|Buff|—|Human throws nets. Wolf restores HP on hit.
1:Open Fire / Wolf Hunt|Skillshot|8-5s|Ranged shots or a wolf leap.
2:Hunter's Step / Bloodthirsty Howl|Dash|10-7s|Dash / howl speed steroid.
U:Wolf Transformation|Transform|28-20s|Swaps forms. Wolf is the chase assassin.
H:khufra,ruby,thamuz,karrie,chou
S:phoveus,minsitthar,terizla
I:sea-halberd,antique-cuirass,winter-crown

=karrie
Karrie|Lost Star|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|2|true-damage,percent-hp,on-hit,anti-tank|3,5,1,3,2,3
P:Lightwheel Mark|True-damage|—|Every third hit deals true damage equal to a percent of max HP.|percent-hp;true-damage
1:Spinning Lightwheel|AoE|8-5s|Releases spinning wheels.
2:Phantom Step|Dash|8-5s|Short dash plus a mark.
U:Lightwheel Blast|Buff|36-26s|Drops a battery, huge attack speed, dual-form wheels. Harder-hitting wheels and +30% movement speed.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=gatotkaca
Gatotkaca|Mighty Legend|Tank,Fighter|Crowd Control/Burst|Roaming,EXP Lane|Physical|Melee|1|initiator,taunt,knockup,global|3,3,5,3,5,2
P:Steel Bones|Shield|—|Converts extra HP into extra defense. Takes reduced burst.
1:Blast Hammer|Skillshot|8-5s|Knock-up smash.|knockup
2:Unbreakable|Taunt|12-8s|Gains a shield and taunts nearby enemies.|taunt
U:Guardian's Rage|Global|42-32s|Leaps from anywhere on the map onto a zone, knocking airborne.|global;knockup
H:karrie,thamuz,baxia,diggie
S:chou,pharsa,wanwan
I:sea-halberd,antique-cuirass,tough-boots

=harley
Harley|Mage Genius|Assassin,Mage|Burst/Poke|Jungle,Mid Lane|Magic|Ranged|2|burst,dash,clone,poke|5,3,1,4,1,3
P:Magic Mastery|Buff|—|Skills and basics stack a detonation.
1:Deadly Magic|Skillshot|6-4s|Playing-card skillshots.
2:Space Escape|Dash|14-8s|Leaves a hat behind; recast returns to it.|blink
U:Pow-Pow Bomb|Lock-on|32-22s|Sticks a bomb to a target. Massive if they cannot peel it.|lock-on
H:helcurt,saber,natalia,khufra,chou
S:lancelot,hayabusa,lolita
I:winter-truncheon,athenas-shield,tough-boots

=irithel
Irithel|Jungle Heart|Marksman|Finisher/Burst|Gold Lane|Physical|Ranged|2|on-hit,move-while-attack,burst,crit|3,5,1,3,2,3
P:Heavy Crossbow|Buff|—|Basics spray while moving. Kiting queen.
1:Strafe|Buff|8-5s|Attack-speed steroid, extra bolts.
2:Force of the Queen|Skillshot|10-7s|Shockwave that knocks minions and slows heroes.
U:Heavy Shot|Buff|36-26s|Next few basics explode for huge damage.
H:saber,lancelot,hayabusa,natalia,gusion
S:chou,ling,khufra
I:winter-crown,immortality,wind-of-nature

=grock
Grock|Fortress Titan|Tank,Fighter|Crowd Control/Initiator|Roaming|Physical|Melee|2|wall,stun,initiator,near-wall-power|3,3,5,3,5,2
P:Ancestral Gift|Buff|—|Near walls / his own wall he gains defense, regen and extra damage.
1:Power of Nature|Skillshot|8-5s|Fist smash. Stun if they are near a wall.|stun
2:Guardian's Barrier|Wall|12-8s|Raises a wall. Blocks dashes and skillshots.|wall;body-block
U:Wild Charge|Dash|36-26s|Long charge that knocks enemies with him into a stun.|stun;dash
H:karrie,diggie,thamuz,pharsa
S:chou,wanwan,fanny
I:antique-cuirass,athenas-shield,tough-boots

=argus
Argus|Dark Angel|Fighter|Charge/Burst|EXP Lane|Physical|Melee|1|invulnerable,late-power,lifesteal,crit,attack-speed,anti-heal-needed|2,5,2,3,3,2
P:Warmonger|Buff|—|At 100 Malice the next basic is a Demonic Slash: 200 (+100% Total Physical Attack) Physical Damage, heals, ignores 40% physical defense. This is a basic-attack fighter.
1:Demonic Grip|Dash|8-5s|125 (+60% Extra Physical Attack) Physical Damage, 0.7s stun, pull.
2:Meteoric Sword|Skillshot|10-7s|300 (+100% Total Physical Attack) Physical Damage. Delay drops as attack speed rises.|airborne
U:Eternal Evil|Invulnerable|40-28s|4s Death Immunity. 100% of damage dealt to heroes converts to HP when it ends. The crit/AS page is bought for this window.|invulnerable;attack-speed
H:karrie,ruby,thamuz,khufra,terizla
S:chou,phoveus,wanwan
I:sea-halberd,dominance-ice,antique-cuirass

=odette
Odette|Swan Princess|Mage|Burst/Poke|Mid Lane|Magic|Ranged|1|channel,persist-zone,burst,immobile,knockup|3,4,3,1,1,3
P:Lakeside Dream|Buff|—|Skills apply a mark. Full marks stun.
1:Avian Dance|Skillshot|7-5s|Sound-wave cone.
2:Blue Nova|Skillshot|8-5s|Seeking orbs.
U:Swan Song|Channel|40-30s|Channeled nova. A shield from an ally makes it unstoppable.|channel;persist-zone
H:saber,lancelot,hayabusa,natalia,helcurt,fanny
S:gusion,chou,ling
I:winter-truncheon,athenas-shield,immortality

=lancelot
Lancelot|Blade of Roses|Assassin|Chase/Burst|Jungle|Physical|Melee|2|dash,invulnerable,burst,skillshot|5,3,1,5,1,2
P:Phantom Execute|Execute|—|Dashes deal extra damage to low-HP heroes.
1:Puncture|Dash|14-8s|Dash that is invulnerable during the thrust.|invulnerable;dash
2:Thorned Rose|AoE|8-5s|Spin; center is invulnerable.|invulnerable
U:Phantom Execution|Dash|28-20s|Three aimed invulnerable dashes.|invulnerable
H:khufra,saber,natalia,helcurt,chou,phoveus
S:minsitthar,franco,akai
I:winter-crown,immortality,tough-boots

=diggie
Diggie|Timekeeper|Support|Guard/Poke|Roaming|Magic|Ranged|1|purify,peel,anti-cc,zone,untargetable|2,4,3,2,3,2
P:Young Again|Untargetable|—|On death he becomes an untargetable egg that can still drop bombs.|untargetable
1:Auto Alarm Bomb|Skillshot|6-4s|Places a bomb that stuns if an enemy stays on it.|stun
2:Reverse Time|Cleanse|10-7s|Throws an owl that yanks an ally out of danger and cleanses them.|cleanse
U:Time Journey|Immunity|42-32s|AoE spell-immunity around him. Deletes Franco / Atlas / Tigreal ultimates.|immunity;purify
H:helcurt,natalia,saber,lancelot,kaja
S:gusion,fanny,ling
I:glowing-wand,divine-glaive,tough-boots

=hylos
Hylos|Grand Warden|Tank|Guard/Initiator|Roaming|Magic|Melee|1|slow,regen,mana-as-hp,zone,anti-heal-needed|3,3,4,2,5,2
P:Thickened Blood|Buff|—|Mana converts to extra HP. Skills cost percent mana.
1:Law and Order|Stun|8-5s|Locks a target in place.|stun;lock-on
2:Ring of Punishment|Persist-zone|0.5s toggle|Aura that slows and damages around him.|slow
U:Glorious Pathway|Zone|40-30s|A path that speeds allies and slows enemies.
H:karrie,baxia,thamuz,kaja,pharsa
S:chou,wanwan,diggie
I:sea-halberd,glowing-wand,dominance-ice,antique-cuirass

=zhask
Zhask|King of Swarms|Mage|Chase/Damage|Mid Lane|Magic|Ranged|2|summon,persist-zone,poke,immobile|3,4,3,2,2,4
P:Decay|Buff|—|Nightmaric spawn inherit his magic power.
1:Nightmaric Spawn|Summon|12-8s|Plants his turret. The real threat.
2:Mind Eater|Skillshot|8-5s|Skillshot; spawn copies it.
U:Dominator's Descent|Transform|48-36s|Becomes a giant spawn. Extra lasers and a knock-up.
H:saber,lancelot,hayabusa,natalia,fanny,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=helcurt
Helcurt|Shadowbringer|Assassin|Push/Burst|Jungle,Roaming|Physical|Melee|2|silence,darkness,burst,dash,lock-on|5,3,4,4,1,3
P:Race of the Abyss|Buff|—|Dead enemies restock a dash charge.
1:Shadow Transition|Dash|8-5s|Dash. Leaves a shadow.
2:Deadly Stinger|Silence|10-7s|Fan of stingers that silence.|silence
U:Dark Night Falls|Silence|36-26s|Map goes dark. Enemy vision dies; he gains speed and restored dashes.|silence;vision
H:diggie,khufra,lolita,akai,saber
S:minsitthar,franco,chou
I:winter-crown,immortality,tough-boots

=pharsa
Pharsa|Wings of Vengeance|Mage|Burst/Poke|Mid Lane|Magic|Ranged|2|long-range,aerial,skillshot,burst,immobile-ult|3,4,2,3,1,4
P:Spiritual Unity|Buff|—|Verri the bird marks targets for extra magic damage.
1:Energy Impact|Skillshot|6-4s|Fast magic bolt.
2:Winged Shield|Dash|12-8s|Becomes a bird, flies over terrain.
U:Feathered Air Strike|Aerial|36-26s|Channels from the sky, raining skillshots anywhere in a huge range.|skillshot;channel
H:saber,lancelot,hayabusa,natalia,helcurt,gusion
S:chou,ling,fanny
I:winter-truncheon,athenas-shield,immortality

=lesley
Lesley|Deadly Sniper|Marksman,Assassin|Finisher/Burst|Gold Lane|Physical|Ranged|1|crit,snipe,stealth,immobile,execute|2,5,1,2,1,2
P:Lethal Shot|Buff|—|Stands still to charge a lethal crit basic.
1:Master of Camouflage|Stealth|8-5s|Camo plus a lethal shot stack.
2:Tactical Grenade|Dash|10-7s|Knockback grenade and a short hop.|displacement
U:Ultimate Snipe|Lock-on|36-26s|Four long-range shots at one target. Interruptible.|lock-on;channel
H:saber,lancelot,hayabusa,natalia,fanny,gusion
S:chou,helcurt,ling
I:winter-crown,immortality,wind-of-nature

=jawhead
Jawhead|Steel Sweetheart|Fighter|Charge/Burst|Roaming,EXP Lane|Physical|Melee|2|lock-on,throw,dash,initiator,burst|5,3,4,4,3,2
P:Mecha Enhancement|Buff|—|Nearby allies get extra attack. Missiles stack on his target.
1:Ejector|Throw|12-8s|Grabs a unit and throws it. Can throw allies or enemies.|displacement
2:Smart Missiles|Lock-on|8-5s|Homing missiles.
U:Unstoppable Force|Dash|32-22s|Locks onto a hero, becomes unstoppable, slams them.|lock-on;stun
H:diggie,khufra,chou,minsitthar,ruby
S:akai,franco,atlas
I:tough-boots,antique-cuirass,dominance-ice

=angela
Angela|Bunnylove|Support|Guard/Support|Roaming|Magic|Ranged|1|attach,shield,heal,anti-heal-needed,peel|2,4,3,2,2,1
P:Love Charges|Buff|—|Her attach target gets extra regen.
1:Love Waves|Skillshot|6-4s|Heart bolts that slow.
2:Puppet-on-a-String|Root|10-7s|Tethers and immobilizes a target.|root
U:Heartguard|Attach|36-26s|Flies across the map onto an ally, shielding them and riding them.|global;shield
H:helcurt,saber,natalia,kaja,lancelot
S:hayabusa,gusion,chou
I:glowing-wand,necklace-of-durance,sea-halberd

=gusion
Gusion|Holy Blade|Assassin|Burst/Magic Damage|Jungle,Mid Lane|Magic|Melee|3|burst,dash,skillshot,reset|5,3,1,5,1,2
P:Dagger Specialist|Buff|—|Picking up daggers resets Skill 1. The whole combo is a reset puzzle.
1:Sword Spike|Skillshot|8-5s|Throws a dagger. Recast dashes to it.|dash
2:Shadowblade Slaughter|AoE|8-5s|Cone of daggers around him.
U:Incandescence|Dash|28-20s|Dashes, then can throw all remaining daggers at one target.|burst
H:khufra,helcurt,saber,natalia,chou,phoveus
S:minsitthar,lolita,franco
I:winter-truncheon,athenas-shield,tough-boots

=valir
Valir|Son of Flames|Mage|Damage/Guard|Mid Lane|Magic|Ranged|1|knockback,slow,poke,zone,anti-dash|3,4,4,2,2,4
P:Searing Torrent|Buff|—|Every third skill extra-burns and extra-knocks.
1:Burst Fireball|Skillshot|6-4s|Fireball that explodes.
2:Searing Torrent|Knockback|10-7s|Cone of flame that knocks enemies away. Deletes dash engages.|knockback
U:Vengeance Flame|Zone|40-30s|Gains a flame cloak that burns and knocks people off him. Can recast a huge fireball.
H:lancelot,fanny,ling,hayabusa,gusion
S:saber,natalia,chou
I:winter-truncheon,athenas-shield,immortality

=martis
Martis|Ashura King|Fighter|Finisher/Charge|Jungle,EXP Lane|Physical|Melee|2|execute,knockup,dash,reset,immunity|5,3,4,4,3,2
P:Ashura Will|Buff|—|Damage grows vs lower-HP targets.
1:Ashura Aura|AoE|8-5s|Pulls enemies in and damages.
2:Mortal Coil|Dash|10-7s|Two-stage knock-up dash.|knockup
U:Decimation|Execute|32-20s|Unstoppable execute dash. Takedown fully resets it.|execute;immunity
H:khufra,ruby,chou,karrie,terizla
S:phoveus,minsitthar,thamuz
I:antique-cuirass,dominance-ice,sea-halberd

=uranus
Uranus|Aethereal Defender|Tank|Regen|EXP Lane|Magic|Melee|2|regen,shield,anti-heal-needed,split-push,sustain|2,5,2,3,5,2
P:Radiance|Regen|—|A portion of damage taken is redistributed as regen over time.
1:Ionic Shield|Shield|8-5s|Shield that also damages around him.
2:Transcendent Ward|Dash|10-7s|Dash plus a trail that speeds him.
U:Consecration|Regen|36-26s|Huge regen steroid. Anti-heal is mandatory.|regen
H:karrie,baxia,thamuz,kaja,esmeralda
S:chou,pharsa,xavier
I:sea-halberd,glowing-wand,necklace-of-durance,dominance-ice

=hanabi
Hanabi|Scarlet Flower|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|1|on-hit,pierce,shield,immobile,crit|2,5,2,1,2,3
P:Ninjutsu: Petal Barrage|Buff|—|Basics can bounce to extra targets.
1:Ninjutsu: Soul Ensnare|Root|12-8s|Roots a target in petals.|root
2:Ninjutsu: Forbidden Jutsu|Shield|10-7s|Shield that also absorbs CC while it holds.|shield;tenacity
U:Higanbana|Skillshot|36-26s|A flower that blooms along a line, stunning.|stun
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=chang-e
Chang'e|Moon Palace Immortal|Mage|Poke/Burst|Mid Lane|Magic|Ranged|1|poke,skillshot,move-while-cast,long-range|3,4,2,3,1,4
P:Yin Yin|Buff|—|Her rabbit refunds cooldowns and extra-damages marked targets.
1:Starfall Blessing|Buff|8-5s|A shield and a spray of moon shots while moving.
2:Crescent Moon|Skillshot|6-4s|Long moon skillshot. Her bread and butter.
U:Meteor Shower|Persist-zone|40-30s|Rains meteors along a huge line. Can still walk.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=kaja
Kaja|Nazar King|Support|Initiator/Charge|Roaming|Magic|Melee|2|initiator,zone,pull,stun,dash,peel,long-cd-ult|4,3,5,4,3,2
P:Wings of Lightning|Buff|—|Skill damage paralyzes: a brief slow and 8% less damage dealt for 5s.
1:Ring of Order|AoE|7s|Lightning ring that expands and returns, slowing and healing him per hit.|slow
2:Soaring Wings|Dash|14s|Control-immune dash that knocks back and stuns on landing, then Soaring flight over walls.|stun;knockback;dash
U:Divine Binding|Zone|70-60s|Lasso area: enemies still inside after the delay are trapped 2.5s and dragged. Purify and Control Immunity do not free them.|zone;pull
H:valir,akai,grock
S:kimmy,estes,gloo
I:tough-boots,athenas-shield,winter-crown

=selena
Selena|Abyssal Witch|Assassin,Mage|Initiator/Finisher|Mid Lane,Roaming|Magic|Ranged|3|stun,trap,transform,burst,skillshot|5,3,5,4,1,2
P:Symbiotic Sentinel|Buff|—|Abyssal arrows mark. Elven form is poke; Abyssal form is the assassin.
1:Abyssal Trap|Trap|6-4s|Places a trap that stuns if an enemy walks on it.|stun
2:Abyssal Arrow|Skillshot|8-5s|Long arrow. Hitting a trap-marked enemy is a long stun.|stun;skillshot
U:Primal Sound|Transform|0s|Swaps to Abyssal form with a dash and a burst combo.
H:saber,helcurt,lancelot,natalia,khufra
S:chou,lolita,grock
I:winter-truncheon,athenas-shield,tough-boots

=aldous
Aldous|Soul Contractor|Fighter|Burst/Support|EXP Lane|Physical|Melee|1|stack,late-power,execute,dash,split-push|2,5,2,3,4,2
P:Contract: Transform|Buff|—|Stacks permanent attack by hitting heroes, turtles, lords.
1:Contract: Flame Sword|Buff|8-5s|Next basics smash with bonus damage and a shield.
2:Contract: Explosion|Dash|8s|AoE smash that can knock airborne. Damage reduction while casting scales 30-55%.|knockup
U:Contract: Chase Fate|Global|40-28s|Reveals an enemy anywhere and can dash across the map to them.|global;dash
H:karrie,ruby,khufra,chou,thamuz
S:phoveus,terizla,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=claude
Claude|Master Thief|Marksman|Burst/Chase|Gold Lane|Physical|Ranged|2|on-hit,dash,clone,burst,anti-tank|4,5,1,4,2,3
P:Battle Akimbo|Buff|—|Dexter the monkey copies his basics. Double the hits.
1:Art of Thievery|AoE|8-5s|Steals attack speed from enemies he hits.
2:Battle Side-by-Side|Dash|10-7s|Leaves Dexter as a decoy and blinks.|blink
U:Blazing Duet|Channel|36-26s|Point-and-spray burst. Huge vs tanks because of hit count.
H:saber,lancelot,natalia,gusion,fanny,hayabusa
S:chou,ling,khufra
I:winter-crown,immortality,wind-of-nature

=vale
Vale|Windtalker|Mage|Burst/Crowd Control|Mid Lane|Magic|Ranged|1|skillshot,knockup,burst,wind,immobile|4,3,5,2,1,3
P:Windtalker|Buff|—|Can add extra effects to skills (slow, damage, or lift).
1:Wind Blow|Skillshot|6-4s|Two wind skillshots.
2:Windstorm|Skillshot|8-5s|AoE storm.
U:Wind Death|Knockup|36-26s|Huge rectangular knock-up. Combo food.|knockup
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=leomord
Leomord|Sworn Sword|Fighter|Chase/Burst|Jungle|Physical|Melee|2|mount,dash,sustain,knockup|4,4,3,4,3,3
P:The Oathkeeper|Buff|—|Basics can send a sword wave. Mounted, his kit fully changes.
1:Momentum|Skillshot|8-5s|Sword wave; or a mounted charge.
2:Decimation Assailant|Dash|10-7s|Leap smash. Mounted becomes a circle slash.
U:Phantom Steed|Mount|40-28s|Calls Barbiel. Can even pick Leomord up from across a fight.|mount;dash
H:karrie,khufra,ruby,thamuz,chou
S:phoveus,minsitthar,terizla
I:sea-halberd,antique-cuirass,dominance-ice

=lunox
Lunox|Twilight Goddess|Mage|Burst/Damage|Mid Lane|Magic|Ranged|3|stance,burst,untargetable,mixed|4,5,2,3,2,3
P:Power of the Moon and Sun|Buff|—|Dark stacks amplify burst. Light stacks amplify sustained damage and CDR.
1:Starlight Pulse|AoE|4s|Light orbs. Builds light power.
2:Chaos Assault|Dash|6-4s|Dark dash. Builds dark power.
U:Order & Chaos|Stance|20-12s|Light: untargetable dream state. Dark: snappier dash and a scaling magic nuke.|untargetable;burst
H:helcurt,saber,natalia,lancelot,chou
S:hayabusa,khufra,gusion
I:winter-truncheon,athenas-shield,tough-boots

=hanzo
Hanzo|Akuma Ninja|Assassin|Burst/Poke|Jungle|Physical|Melee|2|spirit,body,burst,long-range|4,3,1,4,1,3
P:Amulet|Buff|—|Kills restore demonic energy for his spirit form.
1:Ninjutsu: Demon Hunter|Skillshot|8-5s|Shuriken that also restores energy.
2:Ninjutsu: Soul Salvage|Dash|10-7s|Dash slash.
U:Kinjutsu: Pinnacle Ninja|Spirit|20-12s|Leaves his body and possesses a long-range demon spirit. Body is vulnerable.|spirit
H:natalia,saber,helcurt,khufra,pharsa
S:chou,ling,hayabusa
I:winter-crown,immortality,tough-boots

=belerick
Belerick|Guard of Nature|Tank|Crowd Control/Regen|Roaming|Magic|Melee|1|taunt,regen,peel,anti-heal-needed|2,4,4,2,5,2
P:Deadly Vines|Buff|—|A portion of damage he takes is reflected as magic. Heals when allies deal that damage.
1:Ancient Seed|Skillshot|8-5s|Vine skillshot that later blooms.
2:Nature's Gift|Heal|12-8s|Heals himself and nearby allies.
U:Wrath of Dryad|Taunt|42-32s|Expands and taunts all enemies in a huge circle.|taunt
H:karrie,baxia,thamuz,kaja,diggie
S:chou,pharsa,wanwan
I:sea-halberd,glowing-wand,dominance-ice,antique-cuirass

=kimmy
Kimmy|Hoverjet Outrider|Marksman,Mage|Damage/Magic Damage|Mid Lane,Gold Lane|Magic|Ranged|3|move-while-attack,poke,hybrid,skillshot|4,4,1,4,1,4
P:Cheers! Packed Gun|Buff|—|Sprays magic basics in the aim direction while moving.
1:Energy Wrangler|Skillshot|6-4s|Spray of chemical rounds.
2:Chemical Spray|Skillshot|10-7s|Oil slick then ignite.
U:Transform|Buff|32-24s|Huge rocket that she can still steer.
H:saber,lancelot,natalia,gusion,fanny,hayabusa
S:chou,helcurt,ling
I:winter-crown,winter-truncheon,immortality

=thamuz
Thamuz|Lord Lava|Fighter|Chase/Damage|EXP Lane|Physical|Melee|2|regen,true-damage,chase,anti-heal-needed|4,4,2,4,4,3
P:Cauterize|True-damage|—|Lives in a lava state that burns nearby enemies for true damage and heals him.
1:Scorching Chasm|Skillshot|8-5s|Throws both scythes then pulls himself to them.
2:Molten Hook|Skillshot|10-7s|Hook that pulls him in and burns.
U:Cauterant Birth|Buff|36-26s|Resets lava form, extra lifesteal and a burst of true damage.
H:karrie,baxia,ruby,esmeralda,pharsa
S:chou,wanwan,xavier
I:sea-halberd,glowing-wand,dominance-ice,antique-cuirass

=harith
Harith|Time Traveler|Mage|Chase/Damage|Gold Lane,Jungle|Magic|Ranged|2|dash,shield,burst,short-cd-spam|4,4,2,5,2,3
P:Chrono Drive|Buff|—|After a dash, his next basic is a heavy magic swipe.
1:Synchro Reap|AoE|6-4s|Magic slash around him.
2:Chrono Dash|Dash|8-3s|Dash that can bounce off his ultimate wall. CDR on hit.|dash
U:Time Gate|Zone|32-22s|Drops a time wall that shields him and refreshes dashes.
H:khufra,phoveus,minsitthar,chou,helcurt
S:saber,natalia,franco
I:winter-truncheon,athenas-shield,tough-boots

=minsitthar
Minsitthar|Courageous Warrior|Fighter|Initiator/Crowd Control|EXP Lane,Roaming|Physical|Melee|1|anti-dash,pull,zone,peel|3,3,5,2,4,2
P:Spear of Justice|Buff|—|After a skill, next basic knocks back.
1:Spear of Quiescence|Skillshot|8-5s|Pulls the first hero hit.|pull
2:Shield Assault|Dash|10-7s|Shield dash that knocks airborne.|knockup
U:King's Calling|Zone|42-32s|Drops a royal zone. Enemies inside cannot use dash / blink / charge.|anti-dash;zone
H:karrie,pharsa,diggie,thamuz
S:chou,wanwan,baxia
I:antique-cuirass,athenas-shield,tough-boots

=kadita
Kadita|Ocean Goddess|Mage,Assassin|Burst/Charge|Mid Lane|Magic|Ranged|2|untargetable,burst,knockup,dive|5,3,3,4,2,2
P:Strength of the Ocean|Buff|—|Out of combat she regen a huge chunk of HP. Dive in, dive out.
1:Ocean Odyssey|Untargetable|10-7s|Becomes a wave, untargetable, then knocks airborne at the exit.|untargetable;knockup
2:Breath of the Ocean|AoE|8-5s|Tsunami around her.
U:Rough Waves|Burst|32-22s|Three waves that each deal more. Combined with S1 this is a delete combo.
H:khufra,helcurt,minsitthar,chou,natalia
S:saber,lolita,franco
I:winter-truncheon,athenas-shield,tough-boots

=faramis
Faramis|Soul Binder|Support,Mage|Guard/Charge|Mid Lane,Roaming|Magic|Ranged|2|revive,burst,anti-heal-needed,zone|3,4,2,3,3,3
P:Vicious Retriever|Buff|—|Souls he pulls refund cooldown and restore HP.
1:Shadow Tick|Skillshot|8-5s|Pulls souls in a line.
2:Cloak of Weakness|AoE|10-7s|Marks enemies so they take extra damage.
U:Altar of Faith|Revive|48-36s|Allies who die inside the altar resurrect with a portion of HP.|revive
H:helcurt,saber,natalia,kaja,lancelot
S:chou,hayabusa,gusion
I:glowing-wand,sea-halberd,divine-glaive

=badang
Badang|Tribal Warrior|Fighter|Charge/Burst|Roaming,EXP Lane|Physical|Melee|1|wall,punch,stun,dash|4,3,4,3,3,3
P:Fist Wind|Buff|—|Every few basics a fist wind that can bounce off his wall.
1:Qigong Fist|Skillshot|8-5s|Fist winds in a line.
2:Fist Break|Dash|10-7s|Dash punch, knock-up.|knockup
U:Fist Crack|Wall|36-26s|Raises an ancestral wall and then a flurry that stuns if they hit it.|wall;stun
H:karrie,ruby,khufra,chou,phoveus
S:thamuz,terizla,minsitthar
I:antique-cuirass,dominance-ice,sea-halberd

=khufra
Khufra|Desert Tyrant|Tank|Initiator/Crowd Control|Roaming|Physical|Melee|2|anti-dash,bounce,knockup,body-block,initiator|4,3,5,3,5,2
P:Spell of the Mummy|Anti-dash|—|While bouncing, any dash / charge / blink hero who touches him is knocked airborne.|anti-dash;knockup
1:Tyrant's Rage|Dash|10-7s|Ball charge that knocks airborne.|knockup
2:Bouncing Ball|Bounce|12-8s|Becomes a bouncing ball. This is the Fanny / Ling / Chou answer.|anti-dash
U:Sand Tomb|Pull|42-32s|Pulls enemies toward him and roots them in sand.|pull;root
H:diggie,karrie,thamuz,pharsa
S:chou,wanwan,baxia
I:antique-cuirass,athenas-shield,tough-boots

=granger
Granger|Death Chanter|Marksman|Burst/Finisher|Gold Lane|Physical|Ranged|2|burst,skillshot,dash,crit|4,4,1,3,1,3
P:Capriccio|Buff|—|Every 6th bullet is a guaranteed crit. He reloads in bursts.
1:Rhapsody|Skillshot|8-5s|Fires all remaining bullets in a cone.
2:Rhapsody|Dash|8-5s|Dash that also reloads.
U:Death Sonata|Skillshot|36-26s|Two enhanced super-crits that pierce.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=guinevere
Guinevere|Ms. Violet|Fighter|Burst/Magic Damage|EXP Lane|Magic|Melee|2|knockup,burst,dash,combo|5,3,4,4,2,2
P:Super Magic|Buff|—|Airborne enemies take extra magic damage from her.
1:Energy Wave|Skillshot|8-5s|Wave that can knock airborne if it hits a marked target.|knockup
2:Spatial Aggregation|Dash|10-7s|Leap. Second cast is the knock-up.|knockup
U:Violet Requiem|Burst|32-22s|Unstoppable flurry on airborne targets. Full combo is a delete.|burst;immunity
H:khufra,minsitthar,chou,diggie,karrie
S:phoveus,franco,ruby
I:athenas-shield,winter-truncheon,tough-boots

=esmeralda
Esmeralda|Astrologer|Tank,Mage|Regen/Mixed Damage|EXP Lane|Magic|Ranged|2|shield-steal,sustain,anti-heal-needed,anti-shield|4,4,2,3,5,3
P:Stardust Barrier|Shield|—|All of her HP shields can be stolen from enemies. She converts their shields into her own.
1:Frostmoon Shield|Shield|8-5s|Gains a shield and speeds up.
2:Stardust Dance|Dash|6-4s|Two dashes that steal shields.
U:Falling Stardust|Zone|36-26s|A growing zone that keeps stealing shields and dealing magic damage.
H:karrie,baxia,thamuz,terizla,kaja
S:chou,pharsa,xavier
I:sea-halberd,glowing-wand,necklace-of-durance,dominance-ice

=terizla
Terizla|Executioner|Fighter,Tank|Burst/Crowd Control|EXP Lane|Physical|Melee|1|slow,persist-zone,burst,sustain,anti-heal-needed|3,4,4,1,4,3
P:Body of Pain|Buff|—|Missing HP converts into extra damage. The lower he is, the harder he hits.
1:Revenge Strike|Dash|10-7s|Heavy swing that also pulls him forward.
2:Execution Strike|Skillshot|8-5s|Line smash, huge slow.
U:Tartarus Shock|Persist-zone|36-26s|A swinging hammer zone that slows to a crawl.
H:karrie,pharsa,wanwan,chou,vale
S:chou,ruby,xavier
I:sea-halberd,antique-cuirass,dominance-ice

=x-borg
X.Borg|Firaga Armor|Fighter|Regen/Burst|EXP Lane|Hybrid|Melee|2|percent-hp,armor,dash,anti-heal-needed|4,3,2,3,4,3
P:Firaga Armor|Buff|—|Armor bar on top of HP. When it breaks he can detonate and rebuild.
1:Fire Missiles|Skillshot|6-4s|Percent-HP fire bolts.|percent-hp
2:Fire Trace|Dash|8-5s|Dash that leaves a burn trail.
U:Last Insanity|Dash|36-26s|Charges then detonates the armor for massive percent HP. Survives as a tiny Borg.|percent-hp
H:karrie,pharsa,chou,ruby,thamuz
S:wanwan,xavier,minsitthar
I:sea-halberd,glowing-wand,antique-cuirass

=ling
Ling|Cyan Finch|Assassin|Chase/Burst|Jungle|Physical|Melee|3|dash,wall,crit,untargetable,energy|5,4,2,5,1,2
P:Cloud Walker|Buff|—|On walls he regenerates energy and is hard to hit. Light/heavy attacks.
1:Defiant Sword|Dash|4s|Dash slash. Can bounce to a wall.
2:Defiant Dance|AoE|8-5s|A half-second of reduced damage then a knock-up.|knockup
U:Tempest of Blades|Untargetable|36-26s|Becomes untargetable in a crit storm, then a finishing knock-up.|untargetable;crit
H:khufra,saber,natalia,franco,phoveus,minsitthar
S:akai,atlas,chou
I:winter-crown,immortality,tough-boots

=dyrroth
Dyrroth|Prince of the Abyss|Fighter|Charge/Burst|EXP Lane,Jungle|Physical|Melee|1|armor-break,dash,burst,anti-heal-needed|5,3,2,4,3,3
P:Wrath of the Abyss|Buff|—|A rage bar. Full rage empowers his 2 and 3 with extra range and armor reduction.
1:Burst Strike|Dash|8-5s|Two-stage dash.
2:Spectre Step|Dash|10-7s|Dash plus a heavy smash. Empowered shreds defense.
U:Abyssal Force|Burst|32-22s|A huge smash that executes if they are low. Empowered is disgusting.
H:karrie,ruby,khufra,chou,thamuz
S:phoveus,terizla,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=lylia
Lylia|Little Witch|Mage|Push/Damage|Mid Lane|Magic|Ranged|2|reset,slow,zone,gloom-bloom|3,4,3,3,2,4
P:Angry Gloom|Buff|—|Glooms she places can be detonated. Killing resets her ultimate.
1:Magic Shockwave|Skillshot|6-4s|Pushes a gloom and damages.
2:Gloom Blast|Zone|8-5s|Places a gloom.
U:Black Magic Wrath|Reset|30-12s|Teleports to a gloom, exploding it, and refunds HP. Takedowns fully reset.|reset;blink
H:saber,lancelot,hayabusa,natalia,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=baxia
Baxia|Mystic Tortoise|Tank|Support/Damage|Jungle,Roaming|Magic|Melee|1|anti-heal,dash,percent-hp,initiator|4,3,3,4,5,3
P:Baxia's Shield|Anti-heal|—|His damage applies a heavy anti-heal mark. Regen teams melt.|anti-heal
1:Baxia's Shield|Dash|10-7s|Tuck-and-roll. Speeds up, then slams.
2:Shield of Spirit|Skillshot|8-5s|Shield throw, percent HP, then a pull-back.
U:Tortoise's Puissance|Buff|36-26s|A trail that speeds allies and marks enemies with anti-heal.
H:karrie,pharsa,diggie,wanwan
S:chou,xavier,kaja
I:antique-cuirass,athenas-shield,tough-boots

=masha
Masha|Wild-oats Fist|Fighter,Tank|Push/Damage|EXP Lane|Physical|Melee|3|triple-hp,feral,wound,berserker,dash,stun,on-hit|3,4,3,4,4,4
P:Primal Pact|Buff|—|Three HP bars. Skill damage leaves a Wound; a basic from that side breaks it and she goes Feral — next 3 basics are wide claw strikes plus resilience, attack speed, and movespeed. Feral converts to HP out of combat.
1:Feral Swipe|Skillshot|8-5s|Energy wave that damages heroes in a line and clears minions fast.
2:Claw Strike|Dash|10-7s|Dash then a narrower claw that slows 50%. Cooldown resets every time she loses an HP bar — the chase tool.|slow
U:Savage Maul|Dash|32-22s|Charge the target hero, stun them, knock nearby enemies back.|stun;knockback
H:karrie,thamuz,baxia,ruby,pharsa
S:chou,wanwan,xavier
I:sea-halberd,dominance-ice,antique-cuirass

=wanwan
Wanwan|Agile Tiger|Marksman|Finisher/Burst|Gold Lane|Physical|Ranged|3|untargetable,weakness,dash,crit|4,5,2,5,1,3
P:Tiger Pace|Buff|—|Needles mark. Hitting all four weak points activates her ultimate.
1:Swallow's Path|Dash|8-5s|Dash that ignores collision and fires needles.
2:Crossbow of Tang|AoE|10-7s|Fan of needles. Hits weak points.
U:Swallow's Dance|Untargetable|0s gated|Becomes untargetable and dashes around auto-firing. Needs all weak points.|untargetable
H:khufra,saber,natalia,franco,akai,minsitthar
S:chou,helcurt,phoveus
I:winter-crown,immortality,tough-boots

=silvanna
Silvanna|Imperial Knightess|Fighter|Initiator/Magic Damage|EXP Lane|Magic|Melee|1|circle,stun,dash,burst|4,3,4,3,3,2
P:Knightess' Resolve|Shield|—|After a skill, next basic is a magic smash that also shields her.
1:Cometic Lance|Skillshot|8-5s|Lance throw then a dash to it.
2:Spiral Strangle|AoE|10-7s|Spin slash, slow.
U:Imperial Order|Zone|36-26s|Drops a circle, pulls a target in, stuns. They cannot leave.|stun;zone
H:karrie,chou,diggie,khufra,thamuz
S:ruby,minsitthar,phoveus
I:athenas-shield,winter-truncheon,tough-boots

=cecilion
Cecilion|Embrace of Night|Mage|Poke/Burst|Mid Lane|Magic|Ranged|1|mana-stack,long-range,skillshot,poke|2,5,3,1,1,4
P:Overflowing|Buff|—|Every skill hit stacks max mana forever. Late game his bars are absurd.
1:Bat Impact|Skillshot|6-4s|A bat that detonates.
2:Sanguine Claws|Root|10-7s|Two claws that join into a root.|root
U:Bats Feast|Persist-zone|40-30s|A huge channelled bat cloud. Carmilla synergy.|channel
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=carmilla
Carmilla|Shadow of Twilight|Support,Tank|Crowd Control/Damage|Roaming|Magic|Melee|2|link,stun,initiator,anti-heal-needed|3,4,5,3,4,2
P:Vampire Touch|Buff|—|Hits apply a stack. Full stacks briefly root.
1:Crimson Flower|AoE|8-5s|Two spinning flowers around her.
2:Bloodbath|Dash|10-7s|Dash, then a slam.
U:Curse of Blood|Link|42-32s|Links enemies together so they share damage and CC.|link;stun
H:diggie,karrie,baxia,thamuz,kaja
S:chou,wanwan,helcurt
I:sea-halberd,glowing-wand,tough-boots

=atlas
Atlas|Ocean Gladiator|Tank|Crowd Control/Initiator|Roaming|Physical|Melee|2|pull,suppress,initiator,set|3,3,5,3,5,2
P:Frigid Breath|Slow|—|Nearby enemies are slowed and periodically frozen (4s window, 4s freeze cooldown). Tankier while it lasts.
1:Annihilate|AoE|8-5s|Smash. If they are in the circle, a heavier hit.
2:Perfect Match|Dash|10-7s|Extends his body, then pulls himself to the fist.
U:Fatal Links|Suppress|48-36s|Throws a chain net, then drags every caught hero backward. Diggie food.|suppress;pull
H:diggie,chou,fanny,ling,wanwan
S:minsitthar,akai,khufra
I:tough-boots,antique-cuirass,athenas-shield

=popol-and-kupa
Popol and Kupa|Icefield Companions|Marksman|Push/Burst|Jungle,Gold Lane|Physical|Ranged|2|summon,trap,split-push,on-hit,shield,slow|3,4,3,4,3,4
P:We Are Friends!|Buff|—|Kupa fights beside him, scales with Popol's level and gear, and regens out of combat. If Kupa falls, Popol prays him back. Traps immobilize, then leave a frost slow zone.
1:Bite 'Em, Kupa!|Skillshot|8-5s|Spear plus Kupa's lunge bite that greatly slows. In Alpha Wolf form it knocks airborne.|slow;knockup
2:Kupa, Help!|Shield|10-7s|Recalls Kupa for a shield, then rides him for fast movement while Kupa heals.|shield;dash
U:We Are Angry!|Transform|36-26s|9s Enraged: Kupa heals to full and becomes the Alpha Wolf with extra HP and stronger skills.|transform;knockup
H:jawhead,harley,lolita,saber,natalia
S:lesley,baxia,selena
I:winter-crown,immortality,wind-of-nature

=yu-zhong
Yu Zhong|Black Dragon|Fighter|Regen/Damage|EXP Lane|Physical|Melee|2|transform,regen,knockup,anti-heal-needed|4,4,4,3,4,3
P:Shaoyang|Buff|—|Builds Shaoyang stacks. Full stacks transform parts of his kit and heal him.
1:Dragon Tail|AoE|8-5s|Tail sweep, knock-up at the tip.|knockup
2:Soul Grip|Skillshot|10-7s|A pull if it hits a marked target.|pull
U:Black Dragon Form|Transform|40-28s|Becomes a dragon, flies over terrain, then slams.|transform;knockup
H:karrie,baxia,thamuz,pharsa,ruby
S:chou,wanwan,xavier
I:sea-halberd,glowing-wand,dominance-ice

=luo-yi
Luo Yi|Yin-yang Geomancer|Mage|Support/Crowd Control|Mid Lane|Magic|Ranged|2|teleport,yin-yang,stun,zone|3,4,5,3,2,3
P:Duality|Buff|—|Yin and Yang marks. Mixing them on a target stuns and can teleport.|stun
1:Dispersion|Skillshot|6-4s|Yang burst.
2:Rotation|Skillshot|8-5s|Yin ring.
U:Diversion|Global|40-30s|Places two portals the whole team can use.|global;teleport
H:saber,lancelot,hayabusa,natalia,gusion
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=benedetta
Benedetta|Shadow Ranger|Assassin,Fighter|Chase/Burst|EXP Lane|Physical|Melee|3|dash,parry,immunity,burst|5,3,2,5,2,3
P:Elusive Shadow|Buff|—|A sword-intent bar. Full bar empowers her dash with extra slashes.
1:Phantom Slash|Dash|8-5s|Slash dash. Can be held to ride further.
2:An Eye for An Eye|Parry|10-7s|A brief invulnerability window that then stuns if she ate CC or damage.|immunity;stun
U:Alecto: Final Blow|Dash|32-22s|Unstoppable dash across a line, deleting anyone in the path.|immunity;dash
H:khufra,phoveus,minsitthar,chou,ruby
S:franco,akai,thamuz
I:antique-cuirass,dominance-ice,winter-crown

=khaleed
Khaleed|Desert Scimitar|Fighter|Damage/Regen|Roaming,EXP Lane|Physical|Melee|1|regen,dash,knockup,anti-heal-needed|4,3,3,4,4,3
P:Desert Physical|Regen|—|Dealing damage builds a sand bar that he can tap to regen.
1:Desert Tornado|Dash|8-5s|Rolls forward as a sand twister.
2:Tread Sands|Dash|10-7s|A leaping smash that knocks airborne.|knockup
U:Quicksand Howl|Channel|36-26s|A sandstorm around him. Damage reduction plus a final knock-up.
H:karrie,baxia,thamuz,pharsa,ruby
S:chou,wanwan,xavier
I:sea-halberd,dominance-ice,antique-cuirass

=barats
Barats|Dino Rider|Tank,Fighter|Damage/Crowd Control|Jungle|Physical|Melee|2|size-stack,knockup,detonate,anti-heal-needed|3,5,4,2,5,3
P:Big Guy|Buff|—|Stacks make Detona bigger. Bigger means more HP, more damage, more hitbox.
1:So-Called Teamwork|AoE|8-5s|Detona bites, then Barats shoots.
2:Dummy|Skillshot|10-7s|A sticky bomb that knocks airborne.|knockup
U:Detona's Welcome|Swallow|42-32s|Detona eats a hero, then can spit them. Suppress-style.|suppress
H:karrie,baxia,thamuz,kaja,diggie
S:chou,pharsa,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=brody
Brody|Lone Star|Marksman|Burst/Finisher|Gold Lane|Physical|Ranged|2|stun,execute,dash,burst|4,4,3,2,2,3
P:Abyssal Recall|Buff|—|His basics are slow but hit like trucks and apply a wound.
1:Abyssal Gift|Stun|10-7s|A stun on a wounded target.|stun
2:Penitence Lookout|Dash|8-5s|Dash that also lays a trapping eye.
U:Torn Apart|Execute|36-26s|Pulls all wounded targets and detonates the wounds.|execute
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=yve
Yve|Astrowarden|Mage|Burst/Poke|Mid Lane|Magic|Ranged|2|zone,immobile-ult,skillshot,poke|3,4,4,2,1,4
P:Galactic Power|Buff|—|Skills that hit heroes stack extra magic power for a few seconds.
1:Void Blast|Skillshot|6-4s|Meteor skillshot.
2:Void Crystal|Root|10-7s|Places a crystal that roots if they stay.|root
U:Real World Disruption|Zone|40-28s|Locks herself in a huge cosmic box she can still rain skills inside.|zone;channel
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=mathilda
Mathilda|Swift Plume|Support,Assassin|Initiator/Guard|Roaming|Magic|Melee|2|dash,shield,initiate,pick|4,3,3,5,3,2
P:Ancestral Guidance|Buff|—|Nearby allies who walk through her wisps gain a burst of move speed.
1:Soul Bloom|AoE|8-5s|Wisps around her, then a recast explosion.
2:Guiding Wind|Dash|12-8s|A leap. Allies can click the remnant to follow.|dash
U:Circling Eagle|Dash|36-26s|Locks onto a hero and circles them untargetable-style, then slams.|lock-on;dash
H:khufra,minsitthar,phoveus,chou,helcurt
S:saber,franco,akai
I:tough-boots,athenas-shield,immortality

=paquito
Paquito|Heavenly Fist|Fighter,Assassin|Chase/Damage|EXP Lane|Physical|Melee|3|combo,dash,shield,knockup|5,3,3,5,3,2
P:Champ|Buff|—|Every third skill is a heavy. He weaves lights and heavies like a boxer.
1:Jab|Dash|6-4s|A jab that can be a dash.
2:Hack|AoE|8-5s|An uppercut / hook depending on stance.
U:Roundhouse Nation|Buff|32-22s|A shield, a speed steroid, and an empowered heavy knock-up.|knockup;shield
H:khufra,phoveus,minsitthar,ruby,chou
S:thamuz,terizla,karrie
I:antique-cuirass,dominance-ice,sea-halberd

=gloo
Gloo|Swamp Spirits|Tank|Regen/Control|Roaming,EXP Lane|Magic|Melee|2|attach,regen,split,anti-heal-needed|3,4,3,2,5,2
P:Stickum Surge|Buff|—|His body can split. Hitting him while split is a nightmare. He also regen constantly.
1:Stick 'Em|Skillshot|8-5s|Blob skillshot that can split him.
2:Gooey Party|AoE|10-7s|Pulls blobs back, damaging and slowing.
U:Grab and Go|Attach|42-32s|Attaches to an enemy hero and transfers 60% of the damage he takes to them; stuns nearby.|attach;stun
H:karrie,baxia,thamuz,kaja,pharsa
S:chou,xavier,wanwan
I:sea-halberd,glowing-wand,dominance-ice

=beatrix
Beatrix|Dawnbreak Soldier|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|3|weapon-swap,burst,skillshot,crit|4,5,1,3,1,3
P:Reloading Technique|Buff|—|Four guns (Bennett, Wesker, Nibiru, Renner). She swaps between them for different patterns.
1:Morph Shot|Skillshot|6-4s|Uses the currently equipped gun.
2:Tactical Reposition|Dash|8-5s|Dash that also reloads.
U:Masterful Gunner|Swap|0s|Swap weapon. The whole kit is the ultimate.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=phoveus
Phoveus|Chains of Sin|Fighter|Regen/Damage|EXP Lane|Magic|Melee|2|anti-dash,punish,sustain,anti-heal-needed|4,3,4,3,4,2
P:Demonic Force|Anti-dash|—|Whenever an enemy uses a blink / charge / dash near him, he can recast his 2 for free.|anti-dash
1:Malice Crash|Skillshot|8-5s|A crashing fist, knock-up in the center.|knockup
2:Atonement|Dash|10-7s|A hook dash. This is the punish vs Fanny / Ling / Chou / Benedetta.
U:Chains of Isolation|Zone|36-26s|A cage that deals damage and keeps them in.|zone
H:karrie,pharsa,diggie,wanwan
S:ruby,thamuz,xavier
I:sea-halberd,athenas-shield,glowing-wand

=natan
Natan|Spacetime Walker|Marksman|Burst/Magic Damage|Gold Lane|Magic|Ranged|2|reverse,on-hit,magic-mm,dash|3,5,2,3,2,3
P:Entropic Reduction|Buff|—|Basics bounce. Stacks extra magic power as the fight goes.
1:Superposition|Skillshot|8-5s|A projectile that he can recast to reverse its path.
2:Interference!|Dash|10-7s|Dash that also drops a slowing field.
U:Time Reverse|Rewind|36-26s|Rewinds himself to an earlier position and HP. Spits in the face of burst.|rewind
H:saber,lancelot,natalia,gusion,fanny,helcurt
S:chou,ling,khufra
I:winter-crown,immortality,athenas-shield

=aulus
Aulus|Warrior of Ferocity|Fighter|Damage/Charge|Jungle|Physical|Melee|1|stack,late-power,on-hit,chase,attack-speed,crit|2,5,2,4,3,3
P:Fighting Spirit|Buff|—|Permanent attack-speed stacks from hitting. Late game he is a blender — Corrosion / Demon Hunter / Golden Staff, never a War Axe clone.
1:Undying Wrath|Buff|8-5s|Axe enhancement, extra range.
2:Lightning Crash|Dash|10-7s|Leap smash.
U:The Power of Axe|Buff|36-26s|Huge attack speed, extra movespeed, and a slash wave on basics. Less healing from enhanced basics since 2.2.16a.
H:karrie,khufra,chou,ruby,thamuz
S:phoveus,minsitthar,wanwan
I:sea-halberd,antique-cuirass,dominance-ice

=aamon
Aamon|Duke of Shards|Assassin|Chase/Magic Damage|Jungle|Magic|Melee|2|camo,burst,lock-on,shards|5,3,1,5,1,2
P:Invisible Armor|Camo|—|After a skill he camouflages. Shards orbit and then all dump onto one target.
1:Endless Shards|Skillshot|6-4s|Throws shards that return.
2:Slayer Shards|Dash|8-5s|Dash, hide, leave a shard.
U:Armour of Enmity|Burst|32-22s|Camo, then a huge shard dump on the nearest target.|camo;burst
H:khufra,helcurt,saber,natalia,chou,lolita
S:minsitthar,franco,akai
I:winter-truncheon,athenas-shield,tough-boots

=valentina
Valentina|Prophetess of the Night|Mage|Burst/Finisher|Mid Lane|Magic|Ranged|3|steal-ult,dash,burst|4,4,3,4,2,3
P:Icarus Primal|Buff|—|She can fly briefly after charging. Basics become magic bolts.
1:Shadow Strike|Skillshot|6-4s|A shadow bolt that can be recast as a dash-to.
2:Shadow Bloom|AoE|8-5s|An explosion that also heals her vs marked targets.
U:Icarus Fall|Steal|40-28s|Steals the current enemy ultimate and casts her own version.|steal
H:saber,helcurt,natalia,lancelot,gusion
S:chou,hayabusa,khufra
I:winter-truncheon,athenas-shield,immortality

=edith
Edith|Ancient Guard|Tank,Marksman|Control/Burst|EXP Lane,Roaming|Hybrid|Melee|2|transform,knockup,late-power|3,4,4,3,5,3
P:Overload|Buff|—|Phylax the armor stores damage. She can eject it.
1:Earth Shatter|Skillshot|8-5s|A stomp that knocks airborne.|knockup
2:Onward|Dash|10-7s|A hook / pull with Phylax.
U:Primal Wrath|Transform|40-28s|Ejects the armor and becomes a ranged magic marksman with huge attack speed.|transform
H:karrie,baxia,thamuz,diggie,pharsa
S:chou,wanwan,kaja
I:sea-halberd,antique-cuirass,athenas-shield

=floryn
Floryn|Budding Hope|Support|Poke/Guard|Roaming|Magic|Ranged|1|heal,global,anti-heal-needed,peel|2,4,3,2,2,2
P:Swoosh!|Buff|—|A seed that travels to the lowest-HP ally, healing them.
1:Swoosh!|Skillshot|6-4s|A seed skillshot that heals allies and damages enemies.
2:Bloom|Root|10-7s|A root in a small zone.|root
U:Flourishing Water|Global|48-36s|Global heal plus a shield on every ally. Anti-heal shuts it down.|global;heal
H:helcurt,saber,natalia,kaja,lancelot
S:gusion,hayabusa,chou
I:glowing-wand,necklace-of-durance,sea-halberd

=yin
Yin|Martial Genius|Fighter,Assassin|Burst/Control|Jungle,EXP Lane|Physical|Melee|2|domain,stun,dash,burst|5,3,4,4,3,2
P:Charged Fist|Buff|—|Empowers his next skill after a few basics.
1:Instant Blast|Dash|8-5s|Dash punch.
2:Thunder Smash|Stun|10-7s|A smash that stuns.|stun
U:Domain: Lieh|Domain|36-26s|Pulls one enemy into a 1v1 arena. Their allies cannot help.|domain;stun
H:khufra,chou,diggie,ruby,minsitthar
S:phoveus,karrie,thamuz
I:antique-cuirass,dominance-ice,winter-crown

=melissa
Melissa|Cursed Needle|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|2|zone,on-hit,peel,doll|3,5,3,2,2,3
P:Doll Disaster|Buff|—|Misha the doll fights with her. Basics can bounce.
1:Fly~Fly~|Skillshot|8-5s|Sends Misha out. Recast to hop to her.
2:Stay There!|Zone|10-7s|A cursed ring that knocks enemies who try to enter.|zone;knockback
U:Go! Misha!|Summon|36-26s|Misha grows, knocking enemies back and becoming a bodyguard.|knockback
H:saber,lancelot,gusion,fanny,hayabusa
S:natalia,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=xavier
Xavier|Defier of Light|Mage|Damage/Guard|Mid Lane|Magic|Ranged|1|long-range,stun,immobilize,poke,zone|3,4,4,2,1,4
P:Transcendence|Buff|—|Hits build a state. Max state makes his 1 a global-ish stun beam.
1:Infinite Extension|Skillshot|6-4s|A growing beam. In third state it stuns.|stun;skillshot
2:Mysticfield|Root|10-7s|A zone that immobilizes; its activation now carries the big AoE damage.|root;zone
U:End of Infinite|Skillshot|40-30s|A huge piercing beam across a massive line.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=julian
Julian|Scarlet Raven|Assassin,Fighter|Chase/Magic Damage|Jungle,EXP Lane|Magic|Melee|2|combo,dash,knockup,flex|5,3,3,5,3,3
P:Smith's Gift: Golden Touch|Buff|—|Casting 1-2-3 in a row empowers the next 1-2-3 into an enhanced set.
1:Scythe|Skillshot|6-4s|A scythe throw. Enhanced pulls.
2:Cage|Dash|8-5s|A dash. Enhanced is a knock-up.|knockup
U:Judgement|Burst|10-7s|A burst / sleep. Because of the passive, this is just part of the combo.
H:khufra,chou,helcurt,minsitthar,phoveus
S:saber,natalia,ruby
I:athenas-shield,winter-truncheon,tough-boots

=fredrinn
Fredrinn|Rogue Appraiser|Fighter,Tank|Damage/Chase|Jungle|Physical|Melee|2|crystal,percent-hp,taunt,sustain|4,4,4,3,5,3
P:Crystal Energy|Buff|—|Stores crystal. He can convert it into extra damage or extra sustain.
1:Piercing Shot|Skillshot|8-5s|A crystal line.
2:Rogue's Ambush|Dash|10-7s|Leap, then a smash.
U:Appraiser's Rage|Taunt|36-26s|A taunt plus a huge crystal dump. Percent HP.|taunt;percent-hp
H:karrie,baxia,thamuz,pharsa,kaja
S:chou,wanwan,xavier
I:sea-halberd,antique-cuirass,dominance-ice

=joy
Joy|Flash of Miracle|Assassin|Chase/Damage|Jungle|Magic|Melee|3|dash,immunity,combo,high-mobility|5,3,2,5,2,2
P:Happiness Shock|Buff|—|Each dash that hits a hero is a beat. Four beats = a stun and a burst.|stun
1:Look Alive!|Dash|4s|A short dash. Spam this.
2:Bounce By|Dash|6-4s|A longer dash that can bounce.
U:Meebo Meebo Bang Bang|Dash|28-20s|A chain of unstoppable dashes. Almost untargetable while she is in the beat.|immunity;dash
H:khufra,phoveus,minsitthar,franco,akai
S:chou,saber,natalia
I:winter-truncheon,athenas-shield,tough-boots

=novaria
Novaria|Star Rebel|Mage|Burst/Poke|Mid Lane|Magic|Ranged|2|long-range,skillshot,vision,poke|3,4,2,2,1,4
P:Astral Insight|Buff|—|Hits apply a mark. She can detonate from extreme range.
1:Astral Meteor|Skillshot|8-5s|A meteor she can recast to redirect.
2:Astral Spear|Skillshot|10-7s|A huge-range spear that also grants vision.
U:Astral Recall|Buff|36-26s|Gives her even more range and a speeding steroid. She snipes from fog.
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=arlott
Arlott|Lone Lancer|Fighter,Assassin|Charge/Burst|EXP Lane|Physical|Melee|2|dash,stun,reset,catch|5,3,4,4,3,2
P:Demon Hybrid|Buff|—|Hitting marked targets refunds dash cooldown. He never stops walking forward.
1:Dauntless Strike|Skillshot|8-5s|A lance line that marks and can stun.|stun
2:Inspiration|Dash|6-4s|A dash through the target. Resets if they were marked.
U:Nexus of Tides|Pull|36-26s|Pulls all marked heroes toward him and stuns.|pull;stun
H:khufra,phoveus,chou,ruby,minsitthar
S:karrie,thamuz,terizla
I:antique-cuirass,dominance-ice,sea-halberd

=ixia
Ixia|Arclight Outlaw|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|1|ult-channel,on-hit,immobile-ult,crit|3,5,2,1,2,3
P:Full Barrage|Buff|—|When she hits multiple heroes, extra bolts fire. Built for teamfights, not 1v1 chases.
1:Rain of Arrows|Skillshot|8-5s|A spray of arrows in a cone.
2:Piercing Shot|Skillshot|10-7s|A heavy arrow that knocks back.
U:Ultimatum|Channel|40-28s|Locks her in place and sprays a huge cone. Needs a peel tank or she dies.|channel;immobile
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=nolan
Nolan|Cosmic Wayfinder|Assassin|Chase/Burst|Jungle|Physical|Melee|2|dash,rift,burst,stack|5,3,2,5,1,2
P:Expulsion|Buff|—|Rift stacks. At max stacks his next skill expels extra damage and a slow.
1:Rapid Wrath|Dash|6-4s|Two-stage dash slash.
2:Rift Stomp|Dash|8-5s|A stomp that leaves a rift he can recall through.
U:Fracture|Burst|32-22s|A multi-slash in an area, dumping all rift stacks. Then he can rewind.|burst;blink
H:khufra,phoveus,minsitthar,franco,chou
S:saber,natalia,akai
I:winter-crown,immortality,tough-boots

=cici
Cici|Buoyant Performer|Fighter|Damage/Regen|EXP Lane|Physical|Melee|1|poke,yo-yo,sustain,anti-heal-needed|3,4,2,4,3,3
P:Buoyant Updraft|Buff|—|Hits speed her up. She kites melee fighters with the yo-yo.
1:Yo-yo Crash|Skillshot|6-4s|A yo-yo that she can recast to pull herself.
2:Bounce In, Bounce Out|Dash|8-5s|A dash that also shields her.
U:Showtime|Buff|36-26s|Huge attack speed, extra range, extra shield. She becomes a poke monster.
H:khufra,karrie,thamuz,phoveus,ruby
S:chou,wanwan,xavier
I:sea-halberd,antique-cuirass,dominance-ice

=chip
Chip|Phase Technician|Support,Tank|Support/Crowd Control|Roaming|Magic|Melee|2|portal,peel,dash,set|3,3,4,4,4,2
P:Token of Unity|Buff|—|Allies near him get extra defense. He is a walking fortress gate.
1:Chip Drop|Skillshot|8-5s|A bolt that marks the ground.
2:Let's Bump!|Dash|10-7s|A bump dash that knocks enemies.
U:Dimensional Gate|Portal|42-32s|Opens a portal the whole team can take. Set, peel, or reset a fight.|portal;global
H:karrie,baxia,thamuz,helcurt,kaja
S:chou,pharsa,diggie
I:antique-cuirass,athenas-shield,tough-boots

=zhuxin
Zhuxin|Beacon of Spirits|Mage|Damage/Crowd Control|Mid Lane|Magic|Ranged|2|tether,slow,burst,soul-lantern|4,4,4,3,2,3
P:Soulbloom|Buff|—|Lanterns she places tether enemies, slowing them and detonating for extra magic damage.
1:Firefly Dance|Skillshot|6-4s|A lantern throw that leaves a tether.
2:Li Yao|Dash|10-7s|A dash that also drops a lantern.
U:Flutter|Burst|36-26s|Pulls all tethered enemies and detonates. Huge if she has two lanterns down.|pull;burst
H:saber,lancelot,hayabusa,natalia,gusion,helcurt
S:chou,ling,fanny
I:winter-truncheon,athenas-shield,immortality

=suyou
Suyou|Mask of the Immortal|Assassin,Fighter|Chase/Burst|Jungle|Physical|Melee|3|stance,tap-hold,dash,burst|5,3,3,5,3,2
P:Transient Immortal|Stance|—|Tap-cast skills put him in Mortal form (attack speed, move speed). Hold-cast puts him in Immortal form (extra basic damage, physical damage reduction).
1:Blade Surge|Skillshot|8-5s|Tap: throw the weapon through a line. Hold: a dash slash with CC.|dash;cc
2:Shadowbane|AoE|8-5s|Tap: a quick AoE. Hold: a heavier slam that knocks airborne.|knockup
U:Mask of the Immortal|Burst|32-22s|A form-dependent finishing combo. Mortal chases, Immortal duels.
H:khufra,phoveus,minsitthar,chou,franco
S:saber,natalia,akai
I:winter-crown,antique-cuirass,tough-boots

=lukas
Lukas|Beast of Light|Fighter|Regen/Damage|EXP Lane,Jungle|Physical|Melee|1|transform,regen,anti-heal-needed,chase,sustain|4,4,3,4,4,3
P:Beast of Light|Buff|—|Building Light stacks lets him leap into a beast form with extra HP regen and bonus damage.
1:Radiant Clash|Dash|8-5s|A leaping smash. Beast form extends the leap.
2:Solar Brand|AoE|8-5s|A brand that heals him when it detonates on heroes.
U:Apotheosis|Transform|36-26s|Full beast form. Extra durability, a knock-up, and a heavy regen pulse.|transform;regen
H:karrie,baxia,thamuz,pharsa,ruby
S:chou,wanwan,xavier
I:sea-halberd,glowing-wand,dominance-ice,antique-cuirass

=kalea
Kalea|Surging Wave|Support,Fighter|Control/Regen|Roaming|Magic|Melee|2|engage,heal,knockup,anti-heal-needed|4,3,5,4,3,2
P:Surging Tide|Buff|—|Hitting enemies with skills leaves a tide mark. Allies who attack marked targets are healed.
1:Wavebreak|Dash|8-5s|A crashing wave that knocks airborne.|knockup
2:Undertow|Pull|10-7s|Pulls a target through water.|pull
U:Sea's Bargain|Engage|36-26s|A long engage that heals the lowest-HP ally and slams the main target.|heal;knockup
H:helcurt,saber,natalia,kaja,baxia
S:chou,khufra,diggie
I:glowing-wand,sea-halberd,tough-boots,necklace-of-durance

=zetian
Zetian|Celestial Empress|Mage|Damage/Crowd Control|Mid Lane|Magic|Ranged|2|imperial,zone,stun,poke|3,4,5,2,2,4
P:Mandate of Heaven|Buff|—|Skills apply an imperial seal. Full seals stun and drop extra celestial damage.|stun
1:Phoenix Edict|Skillshot|6-4s|A celestial skillshot that marks.
2:Jade Palace|Zone|10-7s|A palace zone that slows and then roots.|root
U:Reign of the Empress|AoE|40-28s|A huge delayed celestial smash. Long stun if they were sealed.|stun;zone
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:helcurt,chou,ling
I:winter-truncheon,athenas-shield,immortality

=obsidia
Obsidia|Sovereign of Dark's End|Marksman|Finisher/Damage|Gold Lane|Physical|Ranged|2|execute,dark-bolt,poke,late-power|3,5,2,2,2,3
P:Dark's End|Execute|—|Basics apply abyss marks. At full marks the next shot deals extra percent-missing-HP damage.
1:Void Needle|Skillshot|6-4s|A piercing dark bolt. Extra damage at range.
2:Abyss Step|Dash|10-7s|A short dash that also drops a slowing shadow.
U:Sovereign Volley|Skillshot|38-28s|A charged volley that executes wounded heroes. Interruptible.|execute;channel
H:saber,lancelot,hayabusa,natalia,gusion,fanny
S:chou,ling,helcurt
I:winter-crown,immortality,wind-of-nature

=sora
Sora|Shifting Cloud|Fighter,Assassin|Charge/Burst|EXP Lane|Physical|Melee|3|stance,thunder,torrent,untargetable,knockup|4,4,4,5,3,2
P:Mystic Surge|Stance|—|Thunder converts HP into attack for assassin mode. Torrent converts attack into HP for brawler mode. Cloudstep stacks unlock True Art.
1:Sundering Strike|Dash|5s|Two strikes then a lunge. Thunder: four hits. Torrent: slows and a 0.5s stun.|stun;dash
2:Windstride|Dash|8s|A leap then a slam. Thunder summons a storm. Torrent knocks airborne.|knockup
U:Shifting Skies|Untargetable|32-24s|Swipe Thunder: untargetable lightning. Swipe Torrent: a pull then percent-HP smash. True Art is a movable storm.|untargetable;pull
H:khufra,phoveus,minsitthar,chou,ruby
S:franco,akai,karrie
I:antique-cuirass,sea-halberd,winter-crown,tough-boots

=marcel
Marcel|Soul Photographer|Support|Crowd Control/Support|Roaming|Physical|Melee|2|freeze,zone,peel,shield,lock-on|3,3,5,3,4,2
P:Platinum Snap|Freeze|12s/target|Clemar auto-snaps nearby enemies, briefly Frozen-Momenting them (cannot move or start new casts) and shielding Marcel plus a nearby ally.|freeze;true-damage
1:Framed Moment|Slow|12-10s|A frame around him that slows, then detonates.
2:Tracking Shot|Dash|12-10s|Tracking haste toward enemies, then a dash that leaves a phantom frame.
U:Golden Hour|Freeze|74-62s|A wide-angle shot that Frozen-Moments everyone in the frame. Projectiles freeze mid-air. Long CD.|freeze;zone
H:diggie,fanny,ling,lancelot,chou,kadita
S:minsitthar,akai,khufra
I:tough-boots,athenas-shield,immortality

=hirara
Hirara|Fallen Scarlet|Assassin|Chase/Finisher|Jungle|Physical|Melee|3|dash,combo,untargetable,immobilize,energy|5,3,3,5,1,2
P:Twin Fans: Ukifune|Buff|—|Two fans, two skills. Drag one onto the other for a combo. Uses Crimson / Death Energy. Reduced damage to minions.
1:Meisen-e|Dash|10-6.5s|Up to two joystick dashes, damaging enemies hit.|dash
2:Kaerazu|AoE|5s|Fan-shaped Crimson Maple, then a delayed second hit at the spot.
U:Infernal Torrent / Falling Maple|Combo|energy|Torrent: dash into a spin that immobilizes. Falling Maple: untargetable for up to 1s then a 3x Maple burst.|untargetable;root
H:khufra,phoveus,minsitthar,saber,franco,akai
S:chou,natalia,lolita
I:winter-crown,immortality,tough-boots

`,h=[`Tank`,`Fighter`,`Assassin`,`Mage`,`Marksman`,`Support`];function g(e){let t=e.trim();if(!h.includes(t))throw Error(`Bad role: ${e}`);return t}function _(e){let t=Number(e);if(t<1||t>5)throw Error(`Bad stat ${e}`);return t}function v(e){if(e===`P`)return`Passive`;if(e===`1`)return`Skill1`;if(e===`2`)return`Skill2`;if(e===`3`)return`Skill3`;if(e===`U`)return`Ultimate`;throw Error(`Bad ability key ${e}`)}function y(e){let t=e.split(/\n(?==)/).map(e=>e.trim()).filter(Boolean),n=[];for(let e of t){let t=e.split(`
`).map(e=>e.trim()).filter(e=>e&&!e.startsWith(`//`));if(!t[0]?.startsWith(`=`))continue;let r=t[0].slice(1).trim(),i=t[1];if(!i)throw Error(`Missing header for ${r}`);let a=i.split(`|`);if(a.length!==10)throw Error(`Header fields ${a.length} for ${r}: ${i}`);let[o,s,c,l,u,d,f,p,m,h]=a,y=h.split(`,`).map(e=>e.trim());if(y.length!==6)throw Error(`Stats for ${r}`);let b={earlyPower:_(y[0]),latePower:_(y[1]),ccLevel:_(y[2]),mobility:_(y[3]),durability:_(y[4]),waveClear:_(y[5])},x=[],S=[],C=[],w=[];for(let e of t.slice(2)){let t=e[0],n=e.slice(2);if(t===`P`||t===`1`||t===`2`||t===`3`||t===`U`){let[e,r,i,a,o]=n.split(`|`);x.push({key:v(t),name:e,type:r,cooldown:i,summary:a,notes:o?o.split(`;`).map(e=>e.trim()).filter(Boolean):[]})}else t===`H`?S=n.split(`,`).map(e=>e.trim()).filter(Boolean):t===`S`?C=n.split(`,`).map(e=>e.trim()).filter(Boolean):t===`I`&&(w=n.split(`,`).map(e=>e.trim()).filter(Boolean))}n.push({id:r,name:o,title:s,roles:c.split(`,`).map(g),specialties:l.split(`/`).map(e=>e.trim()),lanes:u.split(`,`).map(e=>e.trim()),damageType:d,range:f,difficulty:Number(p),tags:m.split(`,`).map(e=>e.trim()).filter(Boolean),stats:b,abilities:x,hardCounters:S,softCounters:C,counteredByItems:w})}return n}var b=u()(p(e=>({portraits:{},itemIcons:{},emblemIcons:{},talentIcons:{},spellIcons:{},extraHeroes:[],fetchedAt:null,latestPatch:null,liveGear:{},liveSkills:{},tierBoards:null,tierUpdated:null,tierSource:null,apply:t=>e(e=>({portraits:{...e.portraits,...t.portraits},itemIcons:{...e.itemIcons,...t.itemIcons},emblemIcons:{...e.emblemIcons,...t.emblemIcons},talentIcons:{...e.talentIcons,...t.talentIcons},spellIcons:{...e.spellIcons,...t.spellIcons},extraHeroes:t.extraHeroes?.length?t.extraHeroes:e.extraHeroes,fetchedAt:t.fetchedAt})),applyPatch:t=>e({latestPatch:t}),applyGear:(t,n)=>e(e=>({liveGear:{...e.liveGear,[t]:n}})),applySkills:(t,n)=>e(e=>({liveSkills:{...e.liveSkills??{},[t]:n}})),applyTier:t=>e({tierBoards:t.boards,tierUpdated:t.updated,tierSource:t.source})}),{name:`clan-jedi-live-art-v4`}));function x(){return b.getState().extraHeroes}var S=y(m),C=new Map(S.map(e=>[e.id,e])),w=new Map(S.map(e=>[e.name.toLowerCase(),e]));function T(){let e=x();if(!e.length)return S;let t=new Set(S.map(e=>e.id));return[...S,...e.filter(e=>!t.has(e.id))]}function E(){let e=b(e=>e.extraHeroes);return(0,i.useMemo)(()=>{let t=new Set(S.map(e=>e.id));return[...S,...e.filter(e=>!t.has(e.id))]},[e])}function D(e){return C.get(e)??x().find(t=>t.id===e)}function O(e){return C.get(e)??w.get(e.toLowerCase())??x().find(t=>t.name.toLowerCase()===e.toLowerCase()||t.id===e)}var k=[`Tank`,`Fighter`,`Assassin`,`Mage`,`Marksman`,`Support`];function A(e){return e.roles[0]}var j={Tank:`var(--color-role-tank)`,Fighter:`var(--color-role-fighter)`,Assassin:`var(--color-role-assassin)`,Mage:`var(--color-role-mage)`,Marksman:`var(--color-role-marksman)`,Support:`var(--color-role-support)`};export{O as a,E as c,u as d,r as f,T as i,b as l,k as n,D as o,j as r,A as s,S as t,p as u};