# Loop-lar: while va for

Ba'zida harakatlarni takrorlashimizga to'g'ri keladi.

Masalan, ro'yxatdagi tovarlarni ketma-ket chiqarish yoki 1 dan 10 gacha bo'lgan har bir raqam uchun bir xil kodni ishlatish.

*Loop-lar* bir xil kodni ko'p marotaba qaytarishning usullaridir.

## "while" loop

`while` loop quyidagicha sintaksisga ega:

```js
while (condition) {
  // code
  // so-called "loop body"
}
```

`Shart` rost bo'lganda, loop-dagi `kod` bajariladi.

Masalan, quyidagi kod `i < 3` bo'lganda `i` ni chiqaradi:

```js run
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}
```

Loop tanasining bitta bajarilishi *iteratsiya* deb ataladi. Yuqoridagi misoldagi loop uchta iteratsiyani amalga oshiradi.

Agar yuqoridagi misolda `i++` bo'lmasa, loop (nazariy jihatdan) abadiy takrorlanadi. Amalda, brauzer bunday loop-larni to'xtatish imkonini beradi va biz server tomonidagi JavaScript-da  jarayonni to'xtatishimiz mumkin.

Har qanday ifoda yoki o'zgaruvchi shunchaki taqqoslash emas, balki loop sharti bo'lishi mumkin: shart hisoblanadi va `while` orqali boolean qiymatga aylantiriladi.

For instance, a shorter way to write `while (i != 0)` is `while (i)`:
Misalan, `while (i != 0)` ni yozishning qisqa yo'li `while (i)` dir:

```js run
let i = 3;
*!*
while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
*/!*
  alert( i );
  i--;
}
```

````smart header="Curly braces are not required for a single-line body"
Agar loop tanasi yagona ifodaga ega bo'lsa, u holda `{...}` jingalak qavslarni tushirib qoldirishimiz mukin:
```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## "do..while" loop

Shartni tekshirish `do..while` sintaksisi yordamida loop-ning asosiy qismidan *pastga* ko'chirilishi mumkin:

```js
do {
  // loop body
} while (condition);
```

Loop avval tanani bajaradi, keyin shartni tekshiradi va haqiqat bo'lganda, uni qayta-qayta bajaraveradi.

Masalan:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Sintaksisning bu shakli faqat shartning to'g'ri bo'lishidan qat'i nazar, loop-ning tanasi **kamida bir marta** bajarilishini xohlaganimizdagina qo'llanilishi kerak. Odatda, boshqa shakl afzal ko'riladi: `while(…) {…}`.

## "for" loop

`for` loop ancha murakkab, lekin u ham eng keng foydalaniladigan looplardan.

Shu shunday ko'rinishga ega:

```js
for (begin; condition; step) {
  // ... loop body ...
}
```

Keling, ushbu qismlarning ma'nosini misol orqali bilib olamiz. Quyidagi loop `i` uchun `alert(i)`ni `0` dan `3`(o'z ichiga olmagan holda)gacha bajaradi:

```js run
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```

Keling, `for` iborasini qismma-qism ko'rib chiqamiz:

| qism  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| boshlash | `let i = 0`    | Loop-ga kirayotganda bir marta bajariladi.                                      |
| shart | `i < 3`| Har loop iteratsiyasi oldidan tekshiriladi. Agar yolg'on bo'lsa, bajarilish to'xtaydi.              |
| tana | `alert(i)`| Shart sort bo'lganida qayta va qayta ishga tushaveradi.                         |
| bosqich | `i++`      | Har bir iteratsiyada tanadan keyin bajariladi. |

Umumiy loop algoritmi quyidagicha ishlaydi:

```
Run begin
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ (if condition → run body and run step)
→ ...
```

Ya'ni, `begin` bir marta bajariladi va keyin takrorlanadi: har bir `shart` tekshiruvidan keyin, `body` va `bosqich` lar bajariladi.

Agar siz loop-larda yangi bo'lsangiz, misolga qaytish va u qanday ishlashini qog'ozga bosqichma-bosqich qaytadan yozishlik yordam berishi mumkin.

Mana bizning holatimizda aynan nima sodir bo'ladi:

```js
// for (let i = 0; i < 3; i++) alert(i)

// run begin
let i = 0
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// if condition → run body and run step
if (i < 3) { alert(i); i++ }
// ...finish, because now i == 3
```

````smart header="Inline variable declaration"
Bu erda "counter" o'zgaruvchisi `i` loop-da to'g'ridan-to'g'ri e'lon qilinadi. Bu "inline" o'zgaruvchilar deklaratsiyasi deb ataladi. Bunday o'zgaruvchilar faqat loop ichida ko'rinadi.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no such variable
```

O'zgaruvchi aniqlash o'rniga biz mavjuddan foydalanishimiz mumkin:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // use an existing variable
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, because declared outside of the loop
```

````


### Qismlarni o'tkazib yuborish

`for` ning istalgan qismini o'tkazib yuborish mumkin.

Masalan, agar loop-ni boshlanishida hech narsa bajarilishini istamasak, `begin` ni tushirib qoldirishimiz mumkin.

Xuddi quyidagidek:

```js run
let i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
  alert( i ); // 0, 1, 2
}
```

Yana `step` qismini ham olib tashlashimiz mumkin:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Bu loop-ni `while (i < 3)` bilan bir xil qiladi.

Biz barcha narsani olib tashlashimiz va cheksiz loop yaratishimiz mumkin:

```js
for (;;) {
  // repeats without limits
}
```

Ikkita `for` nuqtali vergul mavjud bo'lishi kerakligini yodda tuting. Aks holda, sintaksis xatolik kelib chiqishi mumkin.

## Loop-ni buzish

Odatda, loop uning sharti yolg'on bo'lganga bajarilishdan to'xtaydi.

Lekin, maxsus `break` direktivi yordamida istalgan vaqt uni to'xtashga majbur qilishimiz mumkin.

Masalan, quyidagi loop foydalanuvchidan bir nechta sonlar kiritishni so'raydi, son kiritilmagan holda esa "to'xtaydi":

```js run
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Sum: ' + sum );
```

Agar foydalanuvchi bo'sh qator kiritsa yoki kiritishni bekor qilsa, `break` direktivi `(*)` qatorda faollashtiriladi. U loop-ni zudlik bilan to'xtatadi va boshqaruvni tsikldan keyingi birinchi qatorga , ya'ni, `alert` ga o'tkazadi.

"Cheksiz loop + kerak bo'lganda `break`" kombinatsiyasi loop-ning shartini uning boshida yoki oxirida emas, balki uning o'rtasida yoki hatto tanasining bir nechta joylarida tekshirish kerak bo'lgan holatlar uchun juda mos keladi.

## Keyingi iteratsiyaga o'tish [#continue]

The `continue` directive is a "lighter version" of `break`. It doesn't stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).
`continue` direktivi `break` ning "yengilroq versiyasi" dir. U butun loop-ni to'xtatmaydi. Buning o'rniga, u joriy iteratsiyani to'xtatadi va loop-ni (agar shart imkon bersa) yangisini boshlashga majbur qiladi.

Undan joriy iteratsiyani tugatib, keyingisiga o'tmoqchi bo'lganimizda foydalanishimiz mumkin.

Quyidagi loop faqat toq qiymatlarni chiqarish uchun `continue` dan foydalanadi:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, then 3, 5, 7, 9
}
```

`i` ning juft qiymatlari uchun, `continue` direktivi tanani bajarilishdan to'xtatadi va nazoratni `for` ning keyingi (sonli)iteratsiyasiga o'tkazadi. Shunday qilib, `alert` faqat toq sonlar uchungina chaqiriladi.

````smart header="The `continue` directive helps decrease nesting"
Toq sonlarni ko'rsatuvchi loop quyidagicha ko'rinishga ega:

```js run
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Texnik nuqtai nazardan, bu yuqoridagi misol bilan bir xil. Albatta, biz `continue` dan foydalanish o'rniga kodni `if` blokiga o'rashimiz mumkin.

Ammo nojo'ya ta'sir sifatida, bu yana bir darajali joylashishni yaratdi (jingalak qavslar ichidagi `alert` chaqiruvi). Agar `if` ichidagi kod bir necha qatordan uzun bo'lsa, bu umumiy o'qish qobiliyatini kamaytirishi mumkin.
````

````warn header="No `break/continue` to the right side of '?'"
Esda tutingki, ifoda bo'lmagan sintaksis konstruksiyalarini `?` ternary operatori bilan  ishlatib bo'lmaydi. Xususan, u erda `break/continue` kabi direktivlarga ruxsat berilmaydi.

Masalan, ushbu kodni oladigan bo'lsak:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...va uni so'roq belgisi yordamida qayta yozsak:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue isn't allowed here
```

...u ishlashdan to'xtaydi: sintaksis xatolik mavjud bo'lmaydi.

Bu `if` o`rniga `?` so'roq belgisi operatoridan foydalanmaslikning yana bir sababi. 
````

// Not understood 

## Labels for break/continue

Ba'zan biz bir vaqtning o'zida bir nechta ichki loop-larni aylanib chiqishimiz kerak.

Masalan, quyidagi kodda, `(i, j)` kordinatalarini `(0, 0)` dan `(2, 2)` ga muvofiqlashtirgan holda `i` va `j` ni aylanib chiqamiz:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
  }
}

alert('Done!');
```

Agar foydalanuvchi kiritishni bekor qilsa, bizga jarayonni to'xtatish usuli kerak bo'ladi.

`input` dan keyingi ddiy `break` faqatgina ichki loop-ni to'xtatadi. 
Bu yetarli emas -- label-lar, shunda ular yordamga keladi!

*Label* bu loop-dan avval keladigan ikki nuqtali identifikator:
```js
labelName: for (...) {
  ...
}
```

Quyidagi loop-dagi `break <labelName>` ifoda label-ga o'tadi:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) *!*break outer*/!*; // (*)

    // do something with the value...
  }
}
alert('Done!');
```

Yuqoridagi kodda, `break outer` `outer` deb atalgan label-dan yuqoriroqga qaraydi va u loop-dan chiqib ketadi.

Shunday qilib nazorat `(*)` dan to'g'ri `alert('Done!')` ga keladi.

Biz label-ni alohida qatorga o'tkazishimiz ham mumkin:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

`continue` direktividan ham label bilan birga foydalansa bo'ladi. Bu holatda, kod bajarilishi label-langan loop-ning keyingi iteratsiyasiga sakraydi.

````warn header="Labels do not allow to \"jump\" anywhere"
Label-lar koddagi katta o'lchamli joyga sakrashga imkon bermaydi.

Masalan, buni bajarishning iloji yo'q:
```js
break label; // jump to the label below (doesn't work)

label: for (...)
```

`break` direktivi kod blokini ichida bo'lishi kerak. Texnik jihatdan, har qanday label-langan kod bloki shunday qiladi, e.g.:
```js
label: {
  // ...
  break label; // works
  // ...
}
```

...Although, 99.9% of the time `break` is used inside loops, as we've seen in the examples above.
Shunga qaramay, yuqoridagi misollarda ko'rganimizdek, 99,9% break-lardan loop-larning ichida foydalaniladi. 

`continue` bu loop ichidagi yagona ehtimollik.
````

## Xulosa

Biz loop-larning 3 ta turini ko'rib chiqdik:

- `while` -- Shart iteratsiyadan avval tekshiriladi.
- `do..while` -- Shart iteratsiyadan keyin tekshiriladi.
- `for (;;)` -- Shart har bir iteratsiyadan avval tekshiriladi, qo'shimcha sozlamalar mavjud.

To make an "infinite" loop, usually the `while(true)` construct is used. Such a loop, just like any other, can be stopped with the `break` directive.
"Cheksiz" loop-lar yaratish uchun odatda `while(true)` kontruktsiyasidan foydalaniladi. Bunday loop, xuddi qolganlari singari `break` direktivi yordamida to'xtatilishi mumkin.

Agar biz joriy iteratsiyada hech qilishni xohlamasak va keyingisiga o'tishni istasak, `continue` direktividan foydalanishimiz mumkin.

`break/continue` loop-dan avval label-larni qo'llab quvvatlaydi. Label bu `break/continue` ichki loopdan tashqisiga o'tishining yagona yo'lidir.
