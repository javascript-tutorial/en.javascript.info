muhimlik: 4

---

# Massivdan kalitli obyekt yaratish

Aytaylik, biz `{id:..., name:..., age:... }` ko'rinishidagi foydalanuvchilar qatorini oldik.

Undan ob'ekt yaratuvchi `groupById(arr)` funksiyasini yarating, bunda kalit sifatida `id` va qiymat sifatida massiv elementlari mavjud.

Misol uchun:

```js
let users = [
  { id: "john", name: "John Smith", age: 20 },
  { id: "ann", name: "Ann Smith", age: 24 },
  { id: "pete", name: "Pete Peterson", age: 31 },
];

let usersById = groupById(users);

/*
// chaqiruvdan keyin bizda bo'lishi kerak:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Bunday funksiya server ma'lumotlari bilan ishlashda juda qulaydir.

Bu vazifada biz `id` noyob deb hisoblaymiz. Bir xil `id`ga ega ikkita massiv elementi boʻlmasligi mumkin.

Yechimda `.reduce` massiv usulidan foydalaning.
