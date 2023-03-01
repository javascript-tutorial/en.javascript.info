
# "new Function" sintaksisi

Funksiyani yaratishning yana bir usuli bor. U kamdan-kam qo'llaniladi, lekin ba'zida muqobil yo'q.

## Syntaksisi

Funktsiyani yaratish sintaksisi:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Funksiya `arg1...argN` argumentlari va berilgan `functionBody` bilan yaratilgan.

Misolni ko'rib chiqish orqali tushunish osonroq. Quyida ikkita argumentli funksiya:

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

Va bu yerda argumentlarsiz, faqat funksiya tanasi bilan funksiya mavjud:

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

Biz ko'rgan boshqa usullardan asosiy farqi shundaki, funktsiya ish vaqtida uzatiladigan stringdan tom ma'noda yaratilgan.

Oldingi barcha deklaratsiyalar bizdan, dasturchilardan skriptga funktsiya kodini yozishni talab qilgan.

Lekin `new Function` har qanday stringni funksiyaga aylantirish imkonini beradi. Masalan, biz serverdan yangi funksiyani qabul qilib, keyin uni bajarishimiz mumkin:

```js
let str = ... kodni serverdan dinamik ravishda qabul qilish ...

let func = new Function(str);
func();
```

U juda aniq holatlarda, masalan, serverdan kod olganimizda yoki shablondan funksiyani dinamik ravishda kompilyatsiya qilishda, murakkab veb-ilovalarda qo'llaniladi.

## Closure

Odatda, funksiya `[[Environment]]` maxsus mulkida qayerda tug'ilganini eslab qoladi. U yaratilgan joydan leksik muhitga havola qiladi (biz buni <info:closure> bobida yoritganmiz).

Lekin funksiya `new Function` yordamida yaratilganda, uning `[[Environment]]` joriy Leksik muhitga emas, balki global muhitga havola qilish uchun o'rnatiladi.

Shunday qilib, bunday funktsiya tashqi o'zgaruvchilarga emas, faqat global o'zgaruvchilarga kirish huquqiga ega.

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value is not defined
```

Oddiy xatti-harakatlar bilan solishtiring:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, from the Lexical Environment of getFunc
```

`new Function`ning bu oʻziga xos xususiyati gʻalati koʻrinadi, lekin amalda juda foydali koʻrinadi.

Tasavvur qiling, biz stringdan funktsiya yaratishimiz kerak. Ushbu funktsiyaning kodi skriptni yozish vaqtida ma'lum emas (shuning uchun biz oddiy funktsiyalardan foydalanmaymiz), lekin uni bajarish jarayonida ma'lum bo'ladi. Biz uni serverdan yoki boshqa manbadan olishimiz mumkin.

Bizning yangi funksiyamiz asosiy skript bilan o'zaro aloqada bo'lishi kerak.

Agar u tashqi o'zgaruvchilarga kira olsa nima bo'ladi?

Muammo shundaki, JavaScript ishlab chiqarishga nashr etilishidan oldin, u *minifikator* yordamida siqiladi -- qo'shimcha izohlar, bo'shliqlarni olib tashlash orqali kodni qisqartiruvchi maxsus dastur va eng muhimi, mahalliy o'zgaruvchilar nomini qisqaroq qilib o'zgartiradi.

Masalan, agar funksiyada `let userName` bo‘lsa, minifikator uni `let a` (yoki agar u band bo‘lsa, boshqa harf) bilan almashtiradi va buni hamma joyda bajaradi. Bu odatda xavfsiz ish, chunki o'zgaruvchi mahalliy bo'lib, funksiyadan tashqari hech narsa unga kira olmaydi. Funktsiya ichida esa minifikator uning har bir eslatmasini almashtiradi. Minifikatorlar aqlli, ular kod tuzilishini tahlil qiladilar, shuning uchun ular hech narsani buzmaydi. Ular shunchaki topish va almashtirish emas.

Shunday qilib, agar `new Function` tashqi o'zgaruvchilarga kirish huquqiga ega bo'lsa, u o'zgartirilgan `userName` ni topa olmaydi.

**Agar `new Function` tashqi o'zgaruvchilarga kirish imkoniga ega bo'lsa, u minifikatorlar bilan bog'liq muammolarga duch keladi.**

Bundan tashqari, bunday kod me'moriy jihatdan yomon va xatolarga moyil bo'ladi.

`new Function` sifatida yaratilgan funksiyaga biror narsani o‘tkazish uchun uning argumentlaridan foydalanishimiz kerak.

## Xulosa

Sintaksis:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Tarixiy sabablarga ko'ra argumentlar vergul bilan ajratilgan ro'yxat sifatida ham berilishi mumkin.

Ushbu uchta deklaratsiya bir xil ma'noni anglatadi:

```js
new Function('a', 'b', 'return a + b'); // asosiy sintaksis
new Function('a,b', 'return a + b'); // vergul bilan ajratilgan
new Function('a , b', 'return a + b'); // bo'shliqlar va vergul bilan ajratilgan
```

`new Function` bilan yaratilgan funksiyalar tashqi muhitga emas, balki global leksik muhitga ishora qiluvchi `[[Environment]]`ga ega. Shuning uchun ular tashqi o'zgaruvchilardan foydalana olmaydi. Lekin bu juda yaxshi, chunki u bizni xatolardan sug'urta qiladi. Parametrlarni aniq o'tkazish arxitektura jihatidan ancha yaxshi usul bo'lib, minifikatorlar bilan hech qanday muammo tug'dirmaydi.
