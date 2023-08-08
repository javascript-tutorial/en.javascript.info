# Primitive metodlar

JavaScript bizga primitive-lar (string-lar, number-lar va hokazo) bilan object-lar kabi ishlash imkonini beradi. Ular, shuningdek, chaqirish metodlarini ham taqdim etadi. Ularni tez orada o'rganamiz, lekin avval biz unlarning qanday ishlashini ko'rib chiqamiz, chunki primitive-lar object-lar emas (va endi buni yanada aniqroq qilamiz).

Keling, primitive va object-lar o'rtasidagi asosiy farqlarni ko'rib chiqaylik.

Primitive

- Primitiv turdagi qiymat.
- 7 ta primitive tur mavjud: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` va `undefined`.

Object

- Bir nechta qiymatlarni property sifatida saqlay oladi.
- `{}` bilan yaratiladi, masalan: `{name: "John", age: 30}`. JavaScriptda boshqa object turlari mavjud: funktsiyalar, masalar, object-lar.

Object-larning eng yaxshi jihatlaridan biri shundaki, biz funktsiyani uning property-laridan biri sifatida saqlashimiz mumkin.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

Shunday qilib, biz bu erda `sayHi` metodiga ega `John` object-ini yaratdik.

Ko'plab ichki-o'rnatilgan object-lar allaqachon mavjud bolib ularga sanalar, xatolar, HTML elementlari va boshqalar bilan ishlaydiganlar kiradi. Ular turli xususiyat va metodlarga ega.

But, these features come with a cost!
Ammo bu xususiyatlar o'ziga yarasha 

Object-lar primitive-lardan ko'ra "yengilroq". Ular ichki mexanizmlarni qo'llab-quvvatlashi uchun qo'shimcha resurslarni talab qiladi.

## Primitive object sifatida

Quyida JavaScript yaratuvchisi duch kelgan paradoks:

- String yoki Number kabi primitive bilan ko'p amallarni bajarishni xohlashingiz mumkin. Metodlar ularga kirish juda yaxshi yo'lidir.
- Primitive-lar imkon qadar tez va engil bo'lishi kerak.
- There are many things one would want to do with a primitive, like a string or a number. It would be great to access them using methods.
- Primitives must be as fast and lightweight as possible.

Yechim biroz noqulay ko'rinadi, lekin u quyidagicha:

1. Primitive-lar hali ham primitive. Yagona qiymat, xohlaganingizcha.
2. Til string-lar, number-lar, boolean va symbol-larning metodlari va xususiyatlariga kirish imkonini beradi.
3. Buning ishlashi uchun qo'shimcha funktsiyalarni ta'minlaydigan maxsus "o'rovchi object" yaratiladi va keyin yo'q qilinadi.

"object o'rovchilar" har bir primitive tur uchun turlichadir va ular `String`, `Number`, `Boolean`, `Symbol` va `BigInt` deb ataladi. Shuning uchun, ular turli xil metodlar to'plamini taqdim etadilar.

Masalan, bosh harf bilan yozilgan `str` ni qaytaruvchi [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) string metodi mavjud.

Mana u qanday ishlaydi:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Oddiy, to'g'rimi? Mana aslida `str.toUpperCase()` da nima sodir bo'ladi:

1. `str` string primitive-dir. Shunday qilib uning qiymatiga kirish vaqtida, string-nig qiymatini biladigan va `toUpperCase()` kabi foydali metodlarga ega maxsus object yaratiladi.
2. Ushbu metod bajariladi va yangi string (`alert` da ko'rsatilgan) qaytariladi.
3. Maxsus object yo'q qilinadi va primitive `str` faqat o'zi qoladi.

Shunday qilib, primitive-lar metodlar taqdim etishi mumkin, ammo ular yengil bo'lib qolaveradi.

JavaScript engini bu jarayonni yuqori darajada optimallashtiradi. U hatto qo'shimcha object yaratilishini ham o'tkazib yuborishi mumkin. Lekin u baribir spetsifikatsiyaga rioya qilishi va xuddi uni yaratgandek harakat qilishi kerak.

Number o'z metodlariga ega, masalan, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) metodi raqamni berilgan aniqlikka yaxlitlaydi:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

<info:number> va <info:string> bo'limlarida ko'proq metodlarni ko'rib chiqamiz.


````warn header="Constructors `String/Number/Boolean` faqat ichki foydalanish uchun"
Some languages like Java allow us to explicitly create "wrapper objects" for primitives using a syntax like  or .
Java kabi ba'zi tillar bizga `new Number(1)` yoki `new Boolean(false)` kabi sintaksisdan foydalangan holda primitive-lar uchun "o'rovchi object-lari" ni qo'lda yaratishga imkon beradi.

JavaScript-da bu tarixiy sabablarga ko'ra mumkin bo'lishi mumkin, lekin umuman **tavsiya etilmaydi**. Bir necha joylarda narsalar g'alati ishlashi mumkin.

Masalan:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Ob'ektlar har doim `if` da rostdir, shuning uchun bu yerda alert paydo bo'ladi:

```js run
let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}
```

Boshqa tomondan, `new`siz bir xil `String/Number/Boolean` funksiyalaridan foydalanish mutlaqo aqlli va foydali yo'ldir. Ular qiymatni mos keladigan turga o'zgartiradilar: string, number yoki boolean (primitive) ga.

Masalan, mana bu to'liq yaroqli:
On the other hand, using the same functions `String/Number/Boolean` without `new` is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

For example, this is entirely valid:

```js
let num = Number("123"); // convert a string to number
```
````


````warn header="null/undefined metodlarga ega emas"
`null` va `undefined` maxsus primitivlari bundan mustasno. Ularda mos keladigan "o'rovchi object-lar" yo'q va hech qanday usullarni taqdim etmaydi. Qaysidir ma'noda ular "eng primitive"dir.

Bunday qiymatdagi property-ga kirishga urinish xatoga olib keladi:

```js run
alert(null.test); // error
````

## Xulosa

- `null` va `undefined`dan tashqari primitivlar ko'plab foydali metodlar taqdim etadilar. Ularni kelayotgan bo'limlarda o'rganamiz.
- Rasman, bu metodlar vaqtinchalik object-lar orqali ishlaydi, ammo JavaScript engine-lari buni ichki optimallashtirish uchun yaxshi sozlangan, shuning uchun ularni chaqirish qiyinchilik tug'dirmaydi.
