# Utangulizi wa JavaScript

Hebu tuone ni kitu gani maalum kuhusu JavaScript, tunaweza kupata nini kwa kutumia lugha hii, na teknolojia nyingine gani inafanya vizuri nayo.

## JavaScript ni nini?

*JavaScript ilianzishwa awali kwa lengo la "kufanya kurasa za wavuti kuwa hai.".

Programu katika lugha hii huitwa scripts. Zinaweza kuandikwa moja kwa moja katika HTML ya ukurasa wa wavuti na kukimbia moja kwa moja wakati ukurasa unapakia.

Scripts hupatikana na kutafsiriwa kama maandishi safi. Haziitaji maandalizi au uundaji maalum ili kuzitumia.

Katika hili, JavaScript ni tofauti sana na lugha nyingine inayoitwa [Java](https://en.wikipedia.org/wiki/Java_(programming_language)).

```smart header="Kwa nini inaitwa <u>Java</u>Script?"

Wakati JavaScript ilianzishwa, awali ilikuwa na jina lingine: "LiveScript". Lakini Java ilikuwa maarufu sana wakati huo, hivyo iliamuliwa kwamba kuipatia lugha mpya jina la "mdogo wake" Java ingesaidia.

Lakini kama ilivyokua, JavaScript ilikuwa lugha huru kabisa yenye maelezo yake ya kipekee inayoitwa [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), na sasa haina uhusiano wowote na Java.
```

Leo hii, JavaScript inaweza kutumika si tu kwenye kivinjari, bali pia kwenye seva, au kwa kweli kwenye kifaa chochote kilicho na programu maalum inayoitwa [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Kivinjari kinayo injini ya ndani inayoitwa mara nyingi "JavaScript virtual machine".

Injini tofauti zina majina tofauti ya kificho. Kwa mfano:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- katika Chrome, Opera, na Edge.
- [SpiderMonkey](https://en.wikipedia.org/wiki/SpiderMonkey) -- katika Firefox.

- ...Kuna majina mengine ya kificho kama vile "Chakra" kwa IE, "JavaScriptCore", "Nitro" na "SquirrelFish" kwa Safari, n.k.

Maneno yaliyotajwa hapo juu ni muhimu kukumbuka kwa sababu hutumiwa katika makala za waendelezaji kwenye mtandao. Tutayatumia pia. Kwa mfano, ikiwa "kifaa X kinatumiwa na V8," basi inawezekana kinaweza kutumika kwenye Chrome, Opera, na Edge.

```smart header="Injini hufanya kazi vipi?"

Injini ni ngumu. Lakini msingi ni rahisi.

1. Injini (iliyopachikwa ikiwa ni kivinjari) hulisoma ("kuchambua") script.
2. Kisha inaihuisha ("kuiweka tayari") kwa kuichakata kuwa kanuni ya chombo.
3. Na kisha kanuni ya chombo hufanya kazi, kwa kasi kubwa.

Injini hupata uboreshaji kila hatua ya mchakato. Hata inaangalia script iliyoundwa wakati inafanya kazi, huchambua data inayopitia kupitia script, na inaboresha kanuni ya chombo kulingana na ujuzi huo.
```

## Je, JavaScript inayofanya kazi kwenye kivinjari inaweza kufanya nini?

Lugha ya programu ya JavaScript ya kisasa ni salama. Haiwezi kutoa ufikiaji wa ngazi ya chini kwa kumbukumbu au CPU, kwa sababu ilianzishwa kwa kivinjari ambacho hauhitaji hivyo.

Uwezo wa JavaScript hutegemea sana mazingira inayofanya kazi. Kwa mfano, Node.js inasaidia kazi ambazo huruhusu JavaScript kusoma/andika faili mbalimbali, kufanya ombi la mtandao, n.k.

JavaScript inayofanya kazi kwenye kivinjari inaweza kufanya kila kitu kinachohusiana na upangaji wa wavuti, mwingiliano na mtumiaji, na seva ya wavuti.

Kwa mfano, JavaScript inayofanya kazi kwenye kivinjari inaweza:

- Kuongeza HTML mpya kwenye ukurasa, kubadilisha yaliyopo, kubadilisha mtindo.
- Kujibu vitendo vya mtumiaji, kufanya kazi wakati wa kubonyeza kipanya, kusonga kipanya, kubonyeza funguo.
- utuma maombi kupitia mtandao kwenda kwenye seva za mbali, kupakua na kupakia faili (teknolojia inayoitwa [AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)) na [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Kupata na kuweka vidakuzi, kuuliza maswali kwa wageni, kuonyesha ujumbe.
- Kukumbuka data upande wa mteja ("kumbukumbu ya ndani").

## Je, JavaScript ndani ya kivinjari HAKIWEZI kufanya nini?
Uwezo wa JavaScript ndani ya kivinjari umepunguzwa ili kumlinda mtumiaji. Lengo ni kuzuia ukurasa wa wavuti mbaya usipate ufikiaji wa habari za kibinafsi au kuharibu data ya mtumiaji.

Mifano ya vizuizi kama hivyo ni pamoja na:

- JavaScript kwenye ukurasa wa wavuti haiwezi kusoma/kuandika faili yoyote kwenye diski ngumu, kuiga faili hizo au kutekeleza programu. Haina ufikiaji wa moja kwa moja kwenye kazi za OS.

    Vivinjari vya kisasa vinawezesha kufanya kazi na faili, lakini ufikiaji ni mdogo na unatolewa tu ikiwa mtumiaji atafanya hatua fulani, kama "kuacha" faili kwenye dirisha la kivinjari au kuitumia kupitia tag ya <input>.

    Kuna njia za kuingiliana na kamera/mikrofoni na vifaa vingine, lakini zinahitaji idhini ya wazi ya mtumiaji. Kwa hivyo, ukurasa wenye uwezo wa JavaScript hauwezi kufanya kazi ya kisiri kwa kumruhusu kamera ya wavuti, kuchunguza mazingira na kutuma habari kwa [NSA].(https://en.wikipedia.org/wiki/National_Security_Agency).
- Tabsi/Dirisha tofauti kwa kawaida hazijui kuhusu nyingine. Mara nyingi hazina ufahamu kuhusu nyingine, kwa mfano wakati dirisha moja linatumia JavaScript kuifungua nyingine. Lakini hata katika kesi hii, JavaScript kutoka ukurasa mmoja hauwezi kufikia ukurasa mwingine ikiwa zinatoka kwenye tovuti tofauti (kutoka kwenye kikoa, protokali au bandari tofauti).

    Hii inaitwa "Same Origin Policy" (Sera ya chanzo kimoja). Kufanya kazi kuzunguka hilo, ukurasa wote lazima wakubaliane kubadilishana data na lazima ziwe na msimbo maalum wa JavaScript unaoishughulikia. Tutashughulika na hili kwenye somo letu.

    Kikwazo hiki, tena, ni kwa usalama wa mtumiaji. Ukurasa kutoka `http://anysite.com` Ukurasa ambao mtumiaji amefungua hauruhusiwi kupata ufikiaji wa kichupo kingine cha kivinjari chenye URL hiyo, `http://gmail.com`, Kwa mfano, ukurasa wa mtandao ambao mtumiaji ameufungua haupaswi kuweza kupata upatikanaji wa kichupo kingine cha kivinjari chenye URL, kama vile na kuiba habari kutoka huko. JavaScript inaweza kuwasiliana kwa urahisi kupitia mtandao na seva ambapo ukurasa wa sasa ulitoka. Lakini uwezo wake wa kupokea data kutoka kwa tovuti / uwanja mwingine umepunguzwa. Ingawa ni sawa, inahitaji makubaliano wazi (yaliyotolewa katika vichwa vya HTTP) kutoka kwa upande wa mbali. Mara nyingine tena, hii ni kikwazo cha usalama.

![](limitations.svg)

Vikwazo kama hivyo havipo kama JavaScript inatumika nje ya kivinjari, kwa mfano kwenye seva. Vivinjari vya kisasa pia huruhusu programu-jalizi / ugani ambao unaweza kuomba idhini iliyopanuliwa.

## Nini kinachofanya JavaScript kuwa tofauti na lugha nyingine za programu?

Kuna mambo mengi mazuri kuhusu JavaScript, angalau matatu kati ya hayo ni:

```linganisha
+ Ushirikiano kamili na HTML/CSS.
+ Vitu vya rahisi hufanywa kwa njia rahisi.
+ Inasaidiwa na vivinjari vyote vikuu na imezoeleka kuwa haiwezeshwi.
```
JavaScript ni teknolojia pekee ya kivinjari ambayo inachanganya mambo haya matatu.

Hiyo ndio inayofanya JavaScript kuwa ya kipekee. Ndio sababu inatumika sana kwa kujenga interface za kivinjari.

Hata hivyo, JavaScript inaweza kutumika kwa kujenga seva, programu za rununu, nk.

## Lugha "juu" ya JavaScript

Sintaksia ya JavaScript haifai mahitaji ya kila mtu. Watu tofauti wanataka vipengele tofauti.

Hii inatarajiwa, kwa sababu miradi na mahitaji ni tofauti kwa kila mtu.

Kwa hivyo, hivi karibuni lugha nyingi mpya zimeonekana, ambazo hufanywa kuwa zilizohaririwa (zilizobadilishwa) kuwa JavaScript kabla hazijazinduliwa kwenye kivinjari.

Zana za kisasa hufanya uhariri huu kuwa haraka sana na wazi, huku kuruhusu watengenezaji kuandika katika lugha nyingine na kuiwezesha kuwa "chini ya kapoti" kiatomati.

Mifano ya lugha kama hizo ni:

- [CoffeeScript](https://coffeescript.org/) Ni "sukari ya sintaksia" kwa ajili ya JavaScript. Inaleta sintaksia fupi, kuruhusu kuandika msimbo wazi na sahihi. Kawaida, watumiaji wa Ruby wanapenda hii.
- [TypeScript](https://www.typescriptlang.org/) iliyokusudiwa kuzidisha "aina ya data yenye nguvu" ili kusaidia maendeleo na usaidizi wa mfumo mgumu. Imetengenezwa na Microsoft.
- [Flow](https://flow.org/) pia inaongeza aina za data, lakini kwa njia tofauti. Imetengenezwa na Facebook.
- [Dart](https://www.dartlang.org/) ni lugha isiyoegemea kivinjari ambayo ina injini yake inayotumika katika mazingira yasiyo ya kivinjari (kama programu za rununu), lakini pia inaweza kubadilishwa kuwa JavaScript. Iliyoundwa na Google.
- [Brython](https://brython.info/) ni Python transpiler kwenda JavaScript ambayo inawezesha kuandika programu kwa kutumia Python pekee bila ya kutumia JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) ni lugha ya programu ya kisasa, fupi na salama ambayo inaweza kulenga kivinjari au Node.

Kuna zaidi ya hizi. Bila shaka, hata kama tunatumia mojawapo ya lugha hizi zilizotafsiriwa, tunapaswa pia kujua JavaScript ili kuelewa kabisa tunachofanya.

## Muhtasari

- JavaScript kwanza kabisa ilianzishwa kama lugha ya kivinjari tu, lakini sasa inatumika katika mazingira mengi zaidi pia.
- Leo hii, JavaScript ina nafasi ya pekee kama lugha inayotumiwa sana katika vivinjari, na imeunganishwa kabisa na HTML/CSS.
- Kuna lugha nyingi zinazopata "kutafsiriwa" kwa JavaScript na kutoa huduma fulani. Inapendekezwa kuziangalia, angalau kwa ufupi, baada ya kumaliza kujifunza JavaScript.
