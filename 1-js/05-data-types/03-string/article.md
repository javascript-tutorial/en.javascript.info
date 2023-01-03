# String-lar

JavaScript-da matnli ma'lumotlar string-lar sifatida saqlanadi. BItta belgi uchun alohida tur mavjud emas.

String-lar uchun ichki format har doim [UTF-16](https://en.wikipedia.org/wiki/UTF-16) bo'lib, u sahifa kodlanishiga bog'liq emas.

## Quotes (Qo'shtirnoqlar)

Keling, quote turlarini eslaylik.

String-lar yakka qo'shtirnoq, ikkitalik qo'shtirnoq yoki backtick-lar ichiga kiritilishi mumkin:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

Yakka va ikkitalik qo'shtirnoqlar asosan bir xil. Biroq, backtick-lar uni `${}` ichiga o'rash orqali istalgan ifodani string ichiga kiritish imkonini beradi:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Backticklar-dan foydalanishning yana bir afzalligi shundaki, ular string-ga bir nechta satrlarni qamrab olish imkonini beradi:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // a list of guests, multiple lines
```

Tabiiy ko'rinadi, to'g'rimi? Ammo yakka yoki ikkitalik qo'shtirnoqlar bu tarzda ishlamaydi.

Agar biz ulardan foydalansak va bir nechta qatorlardan foydalanishga harakat qilsak, xatolik paydo bo'ladi:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
```

Yakka va qo'sh qo'shtirnoqlar kop qatorli string-larga bo'lgan ehtiyoj e'tiborga olinmagan til yaratilishining qadimgi davrlaridan kelib chiqqan. Backtick-lar ancha keyin paydo bo'ldi va shuning uchun ular ko'p qirrali.

Backtick-lar, shuningdek, birinchi backtick-dan oldin "template function" (shablon funktsiyasi)ni belgilashga imkon beradi. Sintaksis: <code>func&#96;string&#96;</code>. `func` funktsiyasi avtomatik ravishda chaqiriladi, string va kiritilgan ifodalarni qabul qiladi va ularga ishlov bera oladi. Bu "tagged templates" (teglangan shablonlar) deb ataladi. Bu xususiyat maxsus shablonni amalga oshirishni osonlashtiradi, lekin amalda kamdan-kam qo'llaniladi. Bu haqda ko'proq ma'lumotni [qo'llanma] (mdn:/JavaScript/Reference/Template_literals#Tagged_templates)da o'qishingiz mumkin.

## Maxsus belgilar

Yakka va qo'sh qo'shtirnoqli ko'p qatorli string-larni `\n` sifatida yozilgan "yangi qator belgisi" yordamida yaratish hali ham mumkin, bu chiziq uzilishini bildiradi:

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // a multiline list of guests
```

Masalan, ushbu ikkita qator teng, faqatgina turlicha yozilgan:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Boshqa, ko'p uchramaydigan "maxsus" belgilar mavjud.

Mana to'liq ro'yxat:

| Belgi | Tavsif |
|-----------|-------------|
|`\n`|Yangi qator|
|`\r`|Windows matn fayllarida ikkita belgidan iborat `\r\n` yangi uzilishni bildirsa, Windows bo'lmagan operatsion tizimda bu shunchaki `\n`. Bu tarixiy sabablarga ko'ra, Windows dasturiy ta'minotining aksariyati `\n` ni ham tushunadi.|
|`\'`, `\"`|Qo'shtirnoqlar|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- muvofiqligi uchun saqlanadi, hozirda foydalanilmaydi. |
|`\xXX`|Berilgan o'n oltilik Unicode `XX` bilan Unicode belgisi, masalan. `'\x7A'` `'z'` bilan bir xil|
|`\uXXXX`|UTF-16 kodlashda `XXXX` o'n oltilik kodli Unicode belgisi, masalan, `\u00A9` -- mualliflik huquqi `©` belgisi uchun Unicode. Bu to'liq 4 ta o'n oltilik raqam bo'lishi kerak.|
|`\u{X…XXXXXX}` (1 dan 6 gacha o'n oltilik belgilar)|Berilgan UTF-32 kodlashiga ega Unicode belgisi. Ba'zi noyob belgilar 4 baytni egallagan holda ikkita Unicode belgisi bilan kodlangan bo'ladi. Shu tarzda biz uzun kodlarni kiritishimiz mumkin.|

Unicode-ga misollar:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)
```

Barcha maxsus belgilar backslash `\` belgisi bilan boshlanadi. U "escape character" (qochish belgisi) deb ham ataladi.

Undan string-ga qo'shtirnoq kiritmoqchi bo'lganimizda ham foydalanishimiz mumkin.

Masalan:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

Ko'rib turganingizdek, ichki qo'shtirnoqni oldiga backslash `\'`ni qo'shishimiz kerak, chunki aks holda u string tugashini bildiradi.

Albatta, faqat o'rab turuvchilar bilan bir xil bo'lgan qo'shtirnoqlardan qochish kerak. Shunday qilib, yanada elegant yechim sifatida biz qo'sh qo'shtirnoq yoki backtick-larni olishimiz mumkin:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

E'tibor bering, `\` teskari chiziq JavaScript orqali string-ni to'g'ri o'qish uchun xizmat qiladi va keyin yo'qoladi. Ichki xotiradagi string-da `\` mavjud bo'lmaydi. Yuqoridagi misollardan `alert` da buni aniq ko'rishingiz mumkin.

Agar satr ichida haqiqiy backslash `\`ni ko'rsatishimiz kerak bo'lsa-chi?

Buning imkoni bor, lekin uni `\\` kabi ikki barobar qilishimiz kerak:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## String uzunligi

 `length` xossasi string uzunligiga ega:

```js run
alert( `My\n`.length ); // 3
```

Yodda tuting, `\n` bu yakka "maxsus" belgi, shuning uchun uzunlik aslida `3` bo'ladi.

```warn header="`length` is a property"
Ba'zi boshqa tillardan xabari bor odamlar ba'zan `str.length` o'rniga `str.length()` deb noto'g'ri yozishadi. Bu ishlamaydi.

Yodda tuting, `str.length` bu funktsiya emas, balki raqamli xossa. Undan keyin qavslar qo'shishning hojati yo'q.
```

## Belgilarga kirish

`pos` o'rindagi belgini olish uchun to'rburchak `[pos]` qavslardan foydalaning  yoki [str.charAt(pos)](mdn:js/String/charAt) metodini chaqiring. Birinchi belgi nol o'rindan boshlanadi:

```js run
let str = `Hello`;

// the first character
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// the last character
alert( str[str.length - 1] ); // o
```

To'rtburchak qavslar belgini olishning zamonaviy usuli hisoblanadi, `charAt` esa asosan tarixiy sabablarga ko'ra mavjud.

Ular o'rtasidagi yagona farq shundaki, agar hech qanday belgi topilmasa, `[]` `undefined`ni, `charAt` esa bo'sh string-ni qaytaradi:

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (an empty string)
```

Biz yana `for..of` yordamida belgilarni alanib chiqishimiz mumkin:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
}
```

## String-lar o'zgarmasdir

JavaScript-da string-larni o'zgartirib bo'lmaydi. Belgini o'zgartirishnig imkoni yo'q.

Keling, uning ishlamasligini ko'rsatishga xarakat qilib ko'ramiz:

```js run
let str = 'Hi';

str[0] = 'h'; // error
alert( str[0] ); // doesn't work
```

Odatdagi vaqtinchalik yechim butunlay yangi string yaratish va uni eskisi o'rniga `str` ​​ga tayinlashdir.

Masalan:

```js run
let str = 'Hi';

str = 'h' + str[1]; // replace the string

alert( str ); // hi
```

Keyingi bo'limlarda bunga ko'proq misollar ko'rib chiqamiz.

## Holni o'zgartirish

[toLowerCase()](mdn:js/String/toLowerCase) va [toUpperCase()](mdn:js/String/toUpperCase) metodlari holatni o'zgartirishadi:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

Yoki bitta belgini kichik harf bilan yozishni xohlasak::

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## substring-ni qidirish

String ichidan substring qidirishning bir nechta usullari mavjud.

### str.indexOf

Birinchi metod bu [str.indexOf(substr, pos)](mdn:js/String/indexOf).

U `str` dan `substr` ni qidiradi, berilgan `pos` o'rindan boshlanadi va o'xshash topilgan o'rinni yoki agar hech nima topilmasa `-1`ni qaytaradi.

Masalan:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive

alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)
```

Ixtiyoriy ikkinchi parametr bizga ma'lum bir o'rindan qidirishni boshlash imkonini beradi.

Masalan, `"id"` birinchi `1`chi o'rinda paydo bo'ladi. Keyingi paydo bo'lishlarini qidirish uchun, keling qidiruvni `2`chi o'rindan boshlaymiz:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

Agar bizni barcha paydo bo'lishlar qiziqtirsa, biz `indexOf` ni loop-da ishga tushirishimiz mumkin. Har bir yangi chaqiruv oldingi o'xshashlikdan keyingi o'rin bilan amalga oshiriladi:

```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // let's look for it

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // continue the search from the next position
}
```

Xuddi shu algoritmni qisqaroq qilib ko'rsatish mumkin:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Shunga o'xshash string-ning oxiridan boshiga qarab qidiradigan [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) metodi ham mavjud.

U paydo bo'lishlarni teskari tartibda ro'yhatga oladi.
```

`if` testida `indexOf` bilan bilan biroz noqulaylik bo'ladi. Uni `if`ni ichiga quyidagi kabi qo'yolmaymiz:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // doesn't work!
}
```

Yuqoridagi misoldagi `alert` ko'rinmaydi chunki `str.indexOf("Windget")` `0`ni qaytaradi (bu moslikni dastlabki o'rinda topilganini bildiradi). To'g'ri, lekin `if` `0`ni `false` deb hisoblaydi.

Shuning uchun, biz aslida `-1`ni tekshirishimiz kerak, quyidagidek:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // works now!
}
```

#### The bitwise NOT trick

Bu yerda ishlatilgan qadimgi hiylalardan biri bu [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~` operatoridir. U raqamni 32 bitlik butun songa konvertatsiya qiladi (mavjud kasr qismni olib tashlaydi) va keyin o'zining ikkilik ko'rinishidagi barcha bitlarni teskariga o'zgartiradi.

Amalda bu oddiy narsani anglatadi: 32 bitlik butun sonlar uchun `~n` `-(n+1)`ga teng.

Masalan:

```js run
alert( ~2 ); // -3, the same as -(2+1)
alert( ~1 ); // -2, the same as -(1+1)
alert( ~0 ); // -1, the same as -(0+1)
*!*
alert( ~-1 ); // 0, the same as -(-1+1)
*/!*
```

Ko'rib turganingizdek, `~n` faqat `n == -1` bo'lganida (ya'ni har qanday 32 bitli butun `n` uchun) nolga teng.

Shunday qilib, `if (~str.indexOf("...") )` tekshiruvi faqat`indexOf` ning natijasi `-1` bo'lmagandagina to'g'ri bo'ladi. Boshqacha qilib aytganda, faqat moslik topilgandagina.

Odamlar undan `indexOf` tekshiruvlarini qisqartirish uchun foydalanadilar:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // works
}
```

Odatda til xususiyatlaridan noaniq tarzda foydalanish tavsiya etilmaydi, ammo bu maxsus hiyla eski kodda keng qo'llaniladi, shuning uchun uni tushunishimiz kerak.

Esda tuting: `if (~str.indexOf(...))` "if topildi" tarzida o'qiydi.

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check correct only if a string is not that long.

Ayni vaqtda bunday hiylani faqat eski kodda ko'rishimiz mumkon, chunki zamonaviy JavaScript `.includes` metodini (pastda ko'ramiz) beradi.

### includes, startsWith, endsWith

Zamonaviyroq [str.includes(substr, pos)](mdn:js/String/includes) metodi returns `true/false` depending on whether `str` ichida `substr` bor yoki yo'qligiga qarab `true/false`ni qaytaradi.

Agar biz moslikni tekshirishimiz kerak bo'lsa, lekin uning o'rni kerak bo'lmasa, bu eng to'g'ri tanlovdir.

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes`ning ixtyoriy ikkinchi argumenti bu qidirishni boshlash o'rnini bildiradi:

```js run
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
```

[str.startsWith](mdn:js/String/startsWith) va [str.endsWith](mdn:js/String/endsWith) metodlari aynan o'zlari anglatgan narsani bajaradilar:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
```

## substring-ni olish

JavaScript-da substring-ni olishning 3 ta metodi mavjud: `substring`, `substr` va `slice`.

`str.slice(start [, end])`
: String-ning `start`dan `end`(o'z ichida olmaydi)gacha bo'lgan qismini qaytaradi.

    Masalan:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    Agar ikkinchi argument bo'lmasa, u holda `slice` string-ning oxiriga qadar boradi:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
    ```

    `start/end` uchun manfiy qiymatlar qo'yishning imkoni bor. Ular o'rin string oxiridan boshlab sanalishini anglatadi:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: String-ning `start` va `end` *o'rtasidagi* qismini qaytaradi.

    Bu deyarli `slice` bilan bir xil, ammo u `start`ga `end`dan kattaroq bo'lsih imkonini beradi.

    Masalan:

    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Manfiy argumentlar (slice-dan farqli) qo'llab quvvatlanmaydi, ularga `0` sifatida qaraladi.

`str.substr(start [, length])`
: String-ning `start` dan boshlab berilgan `length` (uzunlik) ga teng qismini qaytaradi.

    Avvalgi metodlardan farqi shundaki, bu metod bizga oxirgi o'rinni o'rniga `length` ni aniqlash imkonini beradi:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
    ```

    Birinchi argument negative bo'lishi mumkin, bu oxiridan sanashni anglatadi:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
    ```

Keling, chalkashmaslik uchun ushbu matodlarni takrorlaymiz:

| metod | tanlaydi... | manfiylar |
|--------|-----------|-----------|
| `slice(start, end)` | `start` dan `end` gacha (`end` kirmaydi) | mafiylarga ruxsat beradi |
| `substring(start, end)` | `start` va `end` o'rtasi | manfiy qiymatlar `0`ni anglatadi |
| `substr(start, length)` | `start` dan boshlab `length` ta belgi | manfiy `start`ga ruxsat beradi |

```smart header="Which one to choose?"

Ularning barchasi vazifani bajarishi mumkin. Rasman `substr` kichik kamchiliklarga ega: u asosiy JavaScript spetsifikatsiyasida emas, balki Annex B da tasvirlangan, bu asosan tarixiy sabablarga ko'ra mavjud bo'lgan faqat brauzer funksiyalarini qamrab oladi. Shunday qilib, brauzer bo'lmagan muhitlar uni qo'llab-quvvatlamasligi mumkin. Ammo amalda u hamma joyda ishlaydi.

Qolgan ikkita variantdan `slice` biroz moslashuvchan, u manfiy argumentlarga ruxsat beradi va yozishni qisqartiradi. Shunday qilib, ushbu uchta metoddan faqat `slice` ni eslab qolish kifoya.
```

## String-larni taqqoslash

Bizga <info:comparison> bo'limidan ma'lumki, string-lar alifbo tartibda belgi-ma belgi taqqoslanadi.

Shunga qaramay, ba'zi bir istisnolar mavjud.

1. Kichik harf har doim bosh harfdan katta:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Diakritik belgilarga ega harflar "tartibdan tashqari"::

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    Agar biz ushbu mamlakat nomlarini tartiblasak, bu g'alati natijalarga olib kelishi mumkin. Odatda odamlar `Zealand` ro'yxatda `Österreich` dan keyin kelishini kutishadi.

Nima sodir bo'lishini tushunish uchun, keling, JavaScriptda string-larning ichki ko'rinishini ko'rib chiqamiz.

Barcha stringlar [UTF-16](https://en.wikipedia.org/wiki/UTF-16) orqali kodlangan. Ya'ni: Har bir belgi tegishli raqamli kodga ega. Koddan belgini olish va qaytarishning maxsus metodlari mavjud.

`str.codePointAt(pos)`
: `pos` o'rindagi belgi kodini qaytaradi:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: o'zining raqamli `code` (kodi) dan belgi yaratadi:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Unicode belgilarni kodlari boʻyicha `\u` va undan keyin keluvchi o'n oltilik kod yordamida qoʻshishimiz mumkin:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Endi `65..220` (lotin alifbosi va biroz qo'shimcha) kodlari bo'lgan belgilarni ularning string-ini yasash orqali ko'rib chiqamiz:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Ko'rdingizmi? Avval bosh harflar, keyin bir nechta maxsus belgilar, keyin kichik harflar va ouput ning oxiriga yaqin `Ö` keladi. 

Endi nega `a > Z` ekanligi aniq bo'ldi.

Belgilar ularning raqamli kodi bilan taqqoslanadi. Kattaroq kod belgi kattaroq ekanligini anglatadi. `a` (97) kodi `Z` (90) kodidan kattaroqdir.

- Barcha kichik harflar katta harflardan keyin keladi, chunki ularning kodlari kattaroqdir.
- `Ö` kabi ba'zi harflar asosiy alifbodan ajralib turadi. Bu erda uning kodi `a` dan `z` gacha bo'lgan hamma narsadan kattaroqdir.

### To'g'ri taqqoslashlar [#correct-comparisons]

String-larni taqqoslashning "to'g'ri" algoritmi ko'ringaniga qaraganda murakkabroq, chunki alifbolar turli tillar uchun turlichadir..

Shuning uchun, brauzer taqqoslash uchun tilni bilishi lozim.

Yaxshiyamki, barcha zamonaviy brauzerlar (IE10- qo'shimcha kutubxona [Intl.js](https://github.com/andyearnshaw/Intl.js/) ni talab qiladi) xalqarolashtirish standarti [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf) ni qo'llab-quvvatlaydi.

U turli tillardagi string-larni ularning qoidalariga rioya qilgan holda solishtirishning maxsus metodini taqdim etadi.

[str.localeCompare(str2)](mdn:js/String/localeCompare) chaqiruvi til qoidalarifa muvofiq `str` `str2` dan kichik, teng yoki katta ekanligini ko'rsatuvchi butun sonni qaytaradi:

- Agar`str` `str2`dan kichik bo'lsa, manfiy son qaytaradi.
- Agar`str` `str2`dan katta bo'lsa, musbat son qaytaradi.
- Agar ular teng bo'lsa, `0` ni qaytaradi.

Masalan:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```
Bu usul [documentation](mdn:js/String/localeCompare)da koʻrsatilgan ikkita qoʻshimcha argumentga ega boʻlib, bu unga tilni aniqlash imkonini beradi (odatda muhitdan olingan bo'lib, harflar tartibi tilga bogʻliq bo'ladi) va  harf sezgirligi yoki `"a"` va `"á"` ga bir xil sifatida qarash kabi qoʻshimcha qoidalarni oʻrnatishga imkon beradi.

## Ichki qismlar, Unicode

```warn header="Advanced knowledge"

Ushbu bo'lim string-ning ichki qismlariga chuqurroq kiradi. Agar siz emoji, noyob matematik yoki ieroglif belgilar yoki boshqa noyob belgilar bilan shug'ullanishni rejalashtirgan bo'lsangiz, bu bilim siz uchun foydali bo'ladi.

Agar buni rejalashtirmagan bo'lsangiz, bo'limni o'tkazib yuborishingiz mumkin.
```

### Surrogat (o'rinbosar) jufliklar

Tez-tez ishlatiladigan barcha belgilar 2 baytlik kodlarga ega. Ko'pgina Yevropa tillaridagi harflar, raqamlar va hatto ko'pchilik ierogliflar 2 baytdan iborat.

Ammo 2 bayt faqat 65536 kombinatsiyaga ruxsat beradi va bu har bir mumkin bo'lgan belgi uchun yetarli emas. Shunday qilib, noyob belgilar "surrogat juftlik" deb nomlangan 2 baytli belgilar juftligi bilan kodlangan.

Bunday belgining uzunligi `2` ga teng:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
```

Yodda tuting, JavaScript yaratilgan vaqtda surrogat juftliklar mavjud emas edi va shuning uchun ularga til tomonidan to'g'ri ishlov berilmagan!

Yuqoridagi string-larning har birida bitta belgi bor, lekin `length` `2` bo'lgan uzunlikni ko'rsatadi.

`String.fromCodePoint` va `str.codePointAt` surrogat juftliklar bilan to'g'ri shug'ullanadigan kamdan-kam matodlardir. Ular tilda yaqinda paydo bo'lgan. Ulardan avval, faqat [String.fromCharCode](mdn:js/String/fromCharCode) va [str.charCodeAt](mdn:js/String/charCodeAt) bor edi. Bu metodlar aslida `fromCodePoint/codePointAt` bilan bir xil, ammo surrogat jufliklar bilan ishlamaydi.

Belgini olish qiyin bo'lishi mumkin, chunki surrogat juftliklar ikkita belgi sifatida ko'rib chiqiladi:

```js run
alert( '𝒳'[0] ); // strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
```

Yodda tuting, surrogat juftlik qismlari bir-birisiz hech qanday ma'noga ega emas. Shunday ekan, yuqoridagi misoldagi `alert`lar aslida keraksiz narsani ko'rsatadi.

Texnik jihatdan, surrogat juftlarni o'z kodlari orqali ham aniqlash mumkin: agar belgi `0xd800..0xdbff` oralig'ida kodga ega bo'lsa, u surrogat juftlikning birinchi qismidir. Keyingi belgi (ikkinchi qism) `0xdc00..0xdfff` oralig'ida kodga ega bo'lishi kerak. Ushbu intervallar standart bo'yicha faqat surrogat juftliklar uchun ajratilgan.

Yuqoridagi holatda:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, between 0xd800 and 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, between 0xdc00 and 0xdfff
```

Surrogat juftliklar bilan ishlashning boshqa usullarini keyinroq <info:iterable> bobida topasiz. Ehtimol, buning uchun maxsus kutubxonalar ham mavjud, ammo bu yerda taklif qilish uchun mashhur hech narsa yo'q.

### Diakritik belgilar va normalizatsiya

Ko'pgina tillarda ustida/ostida belgisi bor asosiy belgidan iborat bo'lgan belgilar mavjud.

Masalan, `a` harfi `àáâäãåā` uchun asosiy belgi bo'lishi mumkin. Eng keng tarqalgan "kompozit" belgilar UTF-16 jadvalida o'z kodiga ega. Lekin ularning hammasi emas, chunki mumkin bo'lgan kombinatsiyalar juda ko'p.

Ixtiyoriy kompozitsiyalarni qo'llab-quvvatlash uchun UTF-16 bizga bir nechta Unicode belgilaridan foydalanishga imkon beradi: asosiy belgidan keyin uni "bezaydigan" bir yoki bir nechta "belgi" harflar.

Masalan, agar bizda `S` va undan keyin "ustida nuqtali" maxsus belgi bo'lsa (kod `\u0307`), u Ṡ bo'lib ko'rsatiladi.

```js run
alert( 'S\u0307' ); // Ṡ
```

Agar bizga harf ustida (yoki ostida) qo'shimcha belgi kerak bo'lsa -- muammo emas, shuchaki kerakli belgi harfini qo'shing.

Masalan, agar harfga "ostki nuqta" (kod `\u0323`) ni birlashtirsak , u holda biz "osti va ustida nuqtali S" ga erishamiz: `Ṩ`.

Misol uchun:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Bu yuqore moslashuvchanlikni ta'minlaydi, lekin ayni paytda qiziqarli muammo: ikkita belgi vizual ravishda bir xil ko'rinishi, ammo unicode turli kompozitsiyalari bilan ifodalanishi mumkin.

Misol uchun:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
```

Buni hal qilish uchun har bir string-g yagona "normal" shaklga keltiradigan "Unicode normalizatsiya" algoritmi mavjud.

U [str.normalize()](mdn:js/String/normalize) orqali amalga oshiriladi.

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Qizig'i shundaki, bizning vaziyatimizda `normalize()` aslida 3 ta belgidan iborat ketma-ketlikni bittaga birlashtiradi: `\u1e68` (ikki nuqtaga ega S).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Aslida, har doim ham bunday emas. Sababi, `Ṩ` belgisi "etarlicha umumiy" bo'lgani uchun UTF-16 yaratuvchilari uni asosiy jadvalga kiritishgan va unga kod berishgan.

Agar normallashtirish qoidalari va variantlari haqida ko'proq ma'lumotga ega bo'lishni istasangiz -- ular Unicode standartining ilovasida tasvirlangan: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), lekin eng amaliy maqsadlar uchun ushbu bo'limdagi ma'lumotlar yetarli.

## Xulosa

- 3 turdagi qo'shtirnoqlar mavjud. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- JavaScipt-da string-lar UTF-16 yordamida kodlangan.
- Biz `\n` kabi maxsus belgilardan foydalanishimiz va `\u...` orqali harflarni o'zining Unicodida kiritishimiz mumkin.
- Belgini olish ushun `[]`dan foydalaning.
- Substring-ni olish uchun `slice` yoki `substring`dan foydalaning.
- String-ni katta/kichik qilish uchun `toLowerCase/toUpperCase` dan foydalaning.
- Substring-ni qidirish uchun `indexOf`dan yoki oddiy tekshiruvlar uchun `includes/startsWith/endsWith`dan foydalaning.
- String-larni tilga ko'ra taqqoslash uchun `localeCompare` dan foydalaning, ask holda ular belgi-ma belgi solishtiriladi.

String-larda boshqa bir nechta foydali metodlar mavjud:

- `str.trim()` --  string-ning boshi va oxiridan bo'shliqlarni olib ("kesib") tashlaydi.
- `str.repeat(n)` -- string-ni `n` marta qaytaradi.
- ...va boshqalarini [manual](mdn:js/String)da topasiz.

String-larning yana regular expression-lar bilan qidirish/o'rnini almashtirish ni amalga oshirish uchun ham metodlari mavjud. Bu katta mavzu, shuning uchun uni darslikling alohida <info:regular-expressions> bo'limida ko'rib chiqamiz.
