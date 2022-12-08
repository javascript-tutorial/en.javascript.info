# Ma'lumot turlari

JavaScriptdagi qiymat har doim aniq bir turda bo'ladi. Masalan, satr yoki raqam. 

JavaScriptda 8 ta asosiy ma'lumot turi mavjud. Biz bu qismda ularni barchasini umumiy qamrab olamiz va keyingi bo'limlardan har biri haqida batafsil to'xtalib o'tamiz. 

Biz o'zgaruvchiga istalgan shaklni joylay olamiz. Masalan, o'zgaruvchi bir holatda satr bo'lib,  raqamni kiritishi mumkin:

```js
// xato yo'q
let message = "hello";
message = 123456;
```

JavaScript kabi bunday narsalarga imkon beruvchi tillarni dasturlash "dinamik tarzda yozilgan" (dynamically typed) deb nomlanadi, va bu ma'lumot turlarini mavjudligini bildiradi, ammo o'zgaruvchilar bularning birortasiga ham tegishli emas. 

## Raqam

```js
let n = 123;
n = 12.345;
```

 Bu yerda *raqam* turi ham butun ham butun bo'lmagan raqamlarni ko'rsatadi

Raqamlar uchun ko'p amal (operatsiya)lar mavjud, jumladan, ko'paytirish `*`, bo'lish `/`, qo'shish `+`, ayrish `-`, vo boshqalar.

Odatiy raqamlar bilan bir qatorda, ma'lumotning bu turiga tegishli bo'lgan yana "maxsus raqamli qiymatlar" (special numeric values) ham mavjud: `Infinity`, `-Infinity` va `NaN` 

- `Infinity` - bu matematik cheksizlik [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞ ni bildiradi. Bu maxsus qiymat bo'lib, u har qanday sondan katta.

    Unga nolga bo'lish natijasida erishishimiz mumkin: 

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Yoki uni to'g'ridan to'g'ri ta'kidlash:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` komputerga oid xatoni bildiradi. U noto'g'ri yoki ma'noga ega bo'lmagan matematik amal natijasidir , masalan:

    ```js run
    alert( "not a number" / 2 ); // NaN, bunday bo'lish asossiz
    ```

    `NaN` qiyin tushuncha. `NaN` dagi istalgan qo'shimcha matematik amal `NaN` ga qaytib keladi:

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "not a number" / 2 - 1 ); // NaN
    ```

    Shu tufayli, agar matemaik ifodaning biror joyida `NaN` bor bo'lsa, u butun natijaga tarqaladi (bunga faqatkina bitta istisno bor: `NaN ** 0` `1` ga teng).

```smart header="Matematik amallar xavfsizdir"
JavaScriptda matematikani bajarish "xavfsiz". Biz istagan narsamizni qila olamiz: nolga bo'la olamiz, raqamli bo'lmagan qatorlarni raqam deb qaray olamiz, va hokazo.

Script hech qachon falokatli xato bilan to'xtab qolmaydi ("ishdan chiqmaydi"). eng yomon holatda, `NaN` ga duch kelishimiz mumkin.
```

Maxsus raqamli qiymatlar rasmiy ravishda "raqam"(number) turiga tegishli. Albatta, ular bu so'zning umumiy ma'nosida raqamlar emas. 

Raqamlar bilan ishlashni <info:number> bo'limida ko'proq ko'rib chiqamiz.

## BigInt [#bigint-type]

JavaScript da "raqam" turi <code>(2<sup>53</sup>-1)</code> (bu  `9007199254740991` ga teng) dan katta butun son qiymatini, yoki manfiylar uchun <code>-(2<sup>53</sup>-1)</code> dan kichigina son qiymatini ko'rsata olmaydi. Bu ularning ichki ifodasidan kelib chiqqan texnik cheklov. 

 Shularning o'zi ham ko'p maqsadlarga yetarli bo'la oladi, lekin ba'zan bizga juda katta raqamlar kerak bo'ladi. Misol uchun, kriptografiya yoki mikrosoniyali aniqlikdagi vaqt belgilari uchun.

`BigInt` ixtiyoriy uzunlikdagi butun sonlarni ifodalash uchun tilga yaqinda qo'shilgan. 

 `BigInt` qiymati butun sonning oxiriga `n` qo'shimchasini kiritish orqali yaratiladi:

```js
//  oxiridagi "n" belgi BigInt ma'nosini bildiradi
const bigInt = 1234567890123456789012345678901234567890n;
```

`BigInt` raqamlari kamdan kam hollarda kerak bo'lganligi tufayli biz ularni bu qismda ko'rib chiqmaymiz, lekin ularga alohida bo'lim <info:bigint> bag'ishladik. Sizga katta raqamlar kerak bo'lganda uni o'qib chiqing.


```smart header="Compatibility issues"
Xozirda `BigInt`  Firefox/Chrome/Edge/Safari lar tomonidan ishlatila oladi, lekin IE da emas.
```

Siz brauzerning qaysi versiyalari ishlatila olishini bilish uchun [*MDN* BigInt compatibility table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility)ni tekshirishingiz mumkin.

## Qator

JavaScriptda satr qo'shtirnoqlar bilan o'rab olinishi kerak.

```js
let str = "Hello"; "salom" ;
let str2 = 'Single quotes are ok too'; yakka qo'shtirnoqlar ham qabul qilinadi ; 
let phrase = `boshqa bir  ${str} nio'rnata oladi`; 
```

JavaScriptda 3 turdagi qo'shtirnoq bor.

1. Ikkitalik qo'shtirnoq: `"Hello"`.
2. Yakka qo'shtirnoq: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Ikkitali va yakka qo'shtirnoqlar "oddiy" qo'shtirnoqlar hisoblanadi. JavaScriptda ularda amaliy jihatdan hech qanaqa farq yo'q.

Backtick lar "kengaytirilgan funksionallik" (extended functionality) qo'shtirnoqdir. Ular bizga o'zgaruvchilar va ifodalarni `${…}` belgilari ichiga o'rab olish orqali satrga kiritish imkoniyatini beradi, misol uchun:

```js run
let name = "John";

// o'zgaruvchini kiritamiz
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// ifodani kiritamiz
alert( `natija *!*${1 + 2}*/!*` ); // natija 3 
```

`${…}` belgining ichidagi ifoda baholanadi va natija satrning bir qismiga aylanib qoladi. Buning ichiga istalgan narsa qo'yishimiz mumkin: `name`ga o'xshash o'zgaruvchi yoki  `1 + 2` ga o'xshash arifmetik ifoda yoki biror mukammalroq narsa.

Shuni yodda tutiki, bu faqat backticklardagina bo'ladi. Boshqa qo'shtirnoqnlarni bunday o'rnatish funksiyasi yo'q!
```js run
alert( "natija ${1 + 2}" ); // natija ${1 + 2} (ikkitalik quote hech narsa qilmaydi)
```

Biz satrlarni <info:string> bo'limida batafsiroq ko'rib chiqamiz.

```smart header="*belgi* (character) turi mavjud emas."
Ba'zi tillarda yakkalik belgiga maxsus "belgi" (character) turi bor. Masalan, C tilida va Java da bu "char" (character) dep nomlanadi. 

JavaScriptda bunday shakl yo'q, faqat bitta shakl mavjud: `satr`. Satr nol (bo'sh), bitta yoki bir nechata belgilaridan tashkil topgan bo'lishi mumkin,
```

## Boolean (mantiqiy turi)

The boolean turining faqat 2 dona qiymati bor:  `true` (to'g'ri)  va  `false` (noto'g'ri) .

Bu tur ko'pincha ha/yo'q qiymatlarini saqlab qo'yishda ishlatiladi: `true` "ha, to'g'ri" degani, va `false` "yo'q, noto'g'ri" degani.

Misol uchun:

```js
let nameFieldChecked = true; // ha, nom maydoni tekshirildi
let ageFieldChecked = false; // yo'q, yosh maydoni tekshirilmadi
```

Boolean da qiymatlar, shuningdek qiyoslashlar natijasida ham keladi:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (to'g'ri) (qiyoslash natijasi "yes" (ha))
```

Booleanlarga <info:logical-operators> bo'limida batafsilroq qarab chiqamiz.

## The "null" value

Maxsus `null` qiymati yuqorida ta'kidlab o'tilgan turlarning biortasiga ham tegishli emas.

U o'zining alohida turini shakllantiradi va u faqat `null` qiymatdan iborat:

```js
let age = null;
```

JavaScriptda boshqa ba'zi tillarga o'xshab, `null` "mavjud bo'lmagan obyekt ma'nosini bildirmaydi" yoki a "null ko'rsatkich" emas.

U faqatkina  "nothing" (hech narsa) , "empty" (bo'sh) yoki "value unknown" (noma'lum qiymat) larni bildiruvchi maxsus qiymat.

Yuqoridagi kod `age` noma'lum ekanligini bildiradi. 

## The "aniqlanmagan qiymat" (undefined value) 

`undefined` maxsus qiymat ham boshqalardan ajralib turadi. U ham xuddi `null` singari o'zining turini shakllantiradi.

`undefined` ning ma'nosi "qiymat belgilanmagan".

Agar o'zgaruvchi ma'lum qilinsa, ammo belgilanmasa, demak uning qiymati  `undefined` (aniqlanmagan) bo'ladi:

```js run
let age;

alert(age); // belgi "undefined" ni ko'rsatadi
```

Aslida, `undefined` ni o'zgaruvchiga ochig ravishda belgilashni iloji bor:

```js run
let age = 100;

// qiymatni aniqlanmaganga o'zgartiramiz
age = undefined;

alert(age); // "undefined"
```

...Ammo bunday qilish tavsiya qilinmaydi. Ko'p holatlarda, foydalanuvchi `null`  "empty" (bo'sh) yoki "unknown" (noma'um) qiymatlarni o'zgaruvchiga belgilash uchun `null`dan foydalanadi, `undefined` esa belgilanmagan narsalarga birlamchi boshlang'ich qiymat sifatida saqlab qo'yiladi.

## Jismlar va Ishoralar (Objects and Symbols)

`object` turi o'ziga xos hisoblanadi.

Boshqa barcha turlar "primitive" (sodda) deb ataladi chunki ularning qiymati faqat bitta narsani o'z ichiga oladi (u qator yoki raqam yoki nimadir bo'lishidan qat'iy nazar). obyektlar bulardan farqli o'laroq, ma'lumotlar to'plami va mukammalroq bo'lgan birliklarni saqlashda foydalaniladi.


Shu darajada muhim bo'lishi bilan bir qatorda, jismlar yana o'ziga xos yondashuvga ham arziydi. ular bilan keyinroq, primitive (sodda)lar haqida ko'proq o'rganib bo'lganimizdan kegin, <info:object> bo'limida ko'proq shug'ullanamiz. 

`symbol` turi jismlar uchun yagona aniqlovchilar (identifiers) yaratishda foydalaniladi. To'liqlikni ta'minlash uchun, uni shu yerda ta'kidlab o'tdik, ammo tavsilotlarini jismlarni o'rganganimizgacha kechiktirb turamiz. 

## The typeof operator [#type-typeof]

`typeof` operatori argument (berilgan fikr) turini qaytaradi.Har xil turdagi qiymatlarni jarayondan o'tqazayotkanimizda yoki qisqa tekshiruv qilmoqchi bo'lganimizda ular foydali bo'ladi. 

`typeof x` ni chaqirish satrni shakl nomi bilan qaytardai:

```js
typeof undefined // "undefined" (aniqlanmagan)

typeof 0 // "number" (raqam)

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string" (satr)

typeof Symbol("id") // "symbol" (ishora)

*!*
typeof Math // "object" (jism) (1)
*/!*

*!*
typeof null // "object" (jism) (2)
*/!*

*!*
typeof alert // "function" (funksiya) (3)
*/!*
```

So'ngi uchta qatorga qo'shimcha tushuntirish(sharh) kerak bo'lishi mumkin:

1. `Math` bu matematik ammallar bilan ta'minlaydigan ichki(built-in) qurilma. biz uni <info:number> bo'limida o'rganamiz. Bu yerda esa u faqatkina jism (obyekt)ga misol xizmatini bajaradi. 
2. `typeof null` ning natijasi `"object"` dir. Bu `typeof` da rasmiy tan olingan xato bo'lib, JavaScriptning dastlabki kunlaridan kelib chiqqan va mos kelish uchun saqlab qo'yilgan.`null` albatta obyekt emas. U o'zining alohida turiga ega bo'lgan maxsus qiymat. `typeof` ning buyerdagi xarakteristikasi xatodir.
3. `typeof alert` ning natijasi`"function"` (funksiya)dir, chunki `alert` o'zi ham funksiya. Biz funksiyalarni keyingi qismlarda o'rganib chiqamiz, va unda JavaScriptda maxsus "function" (funksiy) turi yo'qligini ham ko'ramiz. Funksiyalar obyekt turiga tegishli. Ammo `typeof` ularga boshqacha qarab, `"function"` qaytaradi. Bu ham JavaScriptning dastlabki kunlaridan kelib chiqadi. Texnik jihatdan bunday xossalar to'g'ri emas, lekin amalda qulay bo'lishi mumkin.

```smart header="The `typeof(x)` sintaksis"
boshqa sinkaksisga ham duch kelishingiz mumkin: `typeof(x)`. U `typeof x` bilan bir xil.

Aniqroq qilib aytkanda: `typeof` bu operator hisoblanadi, funksiya emas. Bu yerdagi qavs `typeof`ning biror bo'lagi emas. U matematik gruppalashda ishlatiladigan qavs turi.

Odatda, bunday qavslar matematik ifodani o'z ichiga oladi, masalan `(2 + 2)` kabi, lekin bu yerda ularda faqat bitta argument bor `(x)`. Sintaktik ravishda, Ular`typeof` operatori va uning argumenti o'rtasidagi bo'shliqdan qochish imkonini beradi, va bu ba'zilarga yoqadi>

`typeof x` sintalsisi ancha keng tarqalgan bo'lishiga qaramay ba'zi odamlar `typeof(x)` ni afzal ko'radi, .
```

## Xulosa 

JavaScriptda 8 ta ma'lumot turi mavjud.

- `number` istalgan raqamalar turi uchun: butun yoki butun bo'lmagan sonlar, butun sonlar <code>±(2<sup>53</sup>-1)</code> kodi bilan chegaralanadi.
- `bigint` istalgan uzunlikdagi butun sonlar uchun.
- `string` satrlar uchun. Satrda nol yoki ko'p belgilar bo'lishi mumkin, bularga alohida yakka shakl yo'q.
- `boolean` `true`/`false` (to'g'ri/noto'g'ri) uchun.
- `null` noma'lum qiymatlar uchun -- a standalone type that has a single value `null`.
- `undefined` belgilanmagan qiymatlar uchun -- a standalone type that has a single value `undefined`.
- `object` mukammalroq ma'lumot tuzilmalari uchun.
- `symbol` yagona aniqlovchilar uchun.

`typeof` operatori bizga o'zgaruvchida qaysi bir tur o'rnatilganini ko'rish imkonini beradi.
 
- Odatda `typeof x`sifatida foydalaniladi, lekin `typeof(x)` ham ishlatilishi mumkin.
- Satrni bir xil tur nomi bilan qaytaradi, xuddi `"string"` ga o'xshab.
- `null` uchun `"object"` (obyekt)ni qaytaradi  -- bu tildagi xatodir, u aslida obyekt emas.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
Keyingi bo'limlarda biz e'tiborimizni primitive (sodda) qiymatlarga qaratamiz va ular bilan tanishib chiqqanimizdan so'ng, obyektlarga o'tamiz. 