Keling, massiv elementlarini ko'rib chiqaylik:

- Har bir element uchun biz natijada olingan massivda ushbu element mavjudligini tekshiramiz.
- Agar shunday bo'lsa, e'tibor bermang, aks holda natijalarga qo'shing.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = [
  "Hare",
  "Krishna",
  "Hare",
  "Krishna",
  "Krishna",
  "Krishna",
  "Hare",
  "Hare",
  ":-O",
];

alert(unique(strings)); // Hare, Krishna, :-O
```

Kod ishlaydi, lekin unda mumkin bo'lgan ishlash muammosi mavjud.

`result.includes(str)` usuli `natija` massivida ichki harakat qiladi va moslikni topish uchun har bir elementni `str` bilan solishtiradi.

Demak, agar `natija`da `100`ta element bo'lsa va hech qaysisi `str`ga mos kelmasa, u butun `natija` bo'ylab yuradi va aynan `100`ta taqqoslashni amalga oshiradi. Va agar `natija` katta bo'lsa, masalan, `10000` bo'lsa, `10000`ta taqqoslash bo'ladi.

Bu o'z-o'zidan muammo emas, chunki JavaScript mexanizmlari juda tez, shuning uchun "10000" qatorini bosib o'tish mikrosoniyalar masalasidir.

Lekin biz `for` tsiklidagi `arr` ning har bir elementi uchun bunday sinovni o'tkazamiz.

Demak, agar `arr.length` `10000` bo'lsa, bizda `10000*10000` = 100 million taqqoslashlar bo'ladi. Bu juda ko'p.

Shunday qilib, yechim faqat kichik massivlar uchun yaxshi.

Keyinchalik <info:map-set> bo'limida biz uni qanday optimallashtirishni ko'rib chiqamiz.
