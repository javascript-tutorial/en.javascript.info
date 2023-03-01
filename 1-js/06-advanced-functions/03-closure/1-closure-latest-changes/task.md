muhimlik: 5

---

# Funktsiya oxirgi o'zgarishlarni qabul qiladimi?

SayHi funksiyasi tashqi oʻzgaruvchi nomidan foydalanadi. Funktsiya ishga tushganda, u qaysi qiymatdan foydalanadi?

```js
let name = "John";

function sayHi() {
  alert("Hi, " + name);
}

name = "Pete";

sayHi(); // nimani ko'rsatadi: "John" yoki "Pete"?
```

Bunday holatlar brauzerda ham, server tomonida ham keng tarqalgan. Funksiya yaratilganidan keyinroq, masalan, foydalanuvchi harakati yoki tarmoq soʻrovidan keyin bajarilishi rejalashtirilishi mumkin.

Demak, savol tug'iladi: u so'nggi o'zgarishlarni oladimi?
