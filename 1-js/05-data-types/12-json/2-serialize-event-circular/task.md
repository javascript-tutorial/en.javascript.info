muhimlik: 5

---

# Qayta havolalarni istisno qiling

Aylanma havolalarning oddiy holatlarida biz qoidabuzar xususiyatni uning nomi bo'yicha ketma-ketlashtirishdan chiqarib tashlashimiz mumkin.

Ammo ba'zida biz shunchaki nomdan foydalana olmaymiz, chunki u aylanali havolalarda ham, oddiy xususiyatlarda ham ishlatilishi mumkin. Shunday qilib, biz mulkni uning qiymati bo'yicha tekshirishimiz mumkin.

Hamma narsani qatorlashtirish uchun `replacer` funksiyasini yozing, lekin `meetup`ga havola qilingan xususiyatlarni olib tashlang:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// aylanma havolalar
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(key, value) {
  /* sizning kod */
}));

/* natija:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
