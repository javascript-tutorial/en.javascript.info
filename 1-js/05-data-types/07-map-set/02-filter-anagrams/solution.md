Barcha anagrammalarni topish uchun keling, har bir so'zni harflarga ajratamiz va ularni tartiblaymiz. Harf bo'yicha tartiblanganda, barcha anagrammalar bir xil bo'ladi.

Masalan:

```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```

Har bir kalit uchun faqat bitta qiymatni saqlash uchun xarita kalitlari sifatida harflar bo'yicha saralangan variantlardan foydalanamiz:

```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // so'zni harflarga bo'ling, ularni tartiblang va qayta qo'shiling
*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```

Harflarni saralash `(*)` qatoridagi qo'ng'iroqlar zanjiri orqali amalga oshiriladi.

Qulaylik uchun uni bir nechta qatorlarga ajratamiz:

```js
let sorted = word // PAN
  .toLowerCase() // pan
  .split("") // ['p','a','n']
  .sort() // ['a','n','p']
  .join(""); // anp
```

Ikki xil `'PAN'` va `'nap'` so‘zlari bir xil harflar bo‘yicha tartiblangan `'anp'` shaklini oladi.

Keyingi qatorda so'z xaritaga kiritiladi:

```js
map.set(sorted, word);
```

Agar biz yana bir xil harflar bo'yicha tartiblangan so'zni uchratsak, u xaritadagi bir xil kalit bilan oldingi qiymatni qayta yozadi. Shunday qilib, bizda har doim har bir harf shaklida maksimal bitta so'z bo'ladi.

Oxirida `Array.from(map.values())` xarita qiymatlari bo'yicha takrorlanadigan qiymatni oladi (natijada bizga kalitlar kerak emas) va ularning qatorini qaytaradi.

Bu yerda biz "Xarita" o'rniga oddiy ob'ektdan ham foydalanishimiz mumkin, chunki kalitlar qatorlardir.

Yechim shunday ko'rinishi mumkin:

```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert(aclean(arr));
```
