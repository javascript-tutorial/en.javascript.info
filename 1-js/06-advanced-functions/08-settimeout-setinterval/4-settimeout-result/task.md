muhimlik: 5

---

# setTimeout nimani ko'rsatadi?

Quyidagi kodda `setTimeout` chaqiruvi rejalashtirilgan, so'ngra yakunlash uchun 100 ms dan ko'proq vaqt ketadigan og'ir hisob bajariladi.

Rejalashtirilgan funksiya qachon ishlaydi?

1. Sikldan keyin.
2. Sikldan oldin.
3. Sikl boshida


`alert` nimani ko'rsatadi?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// bu funksiyani bajarish vaqti >100ms deb faraz qilaylik
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
