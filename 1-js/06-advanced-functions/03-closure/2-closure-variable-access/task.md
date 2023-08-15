muhimlik: 5

---

# Qaysi o'zgaruvchilar mavjud?

Quyidagi `makeWorker` funksiyasi boshqa funksiyani yaratadi va uni qaytaradi. Bu yangi funksiya boshqa joydan chaqirilishi mumkin.

U yaratilish joyidan yoki chaqiruv joyidan yoki ikkalasidan tashqi o'zgaruvchilarga kirish huquqiga ega bo'ladimi?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// funksiya yarating
let work = makeWorker();

// uni chaqiring
work(); // nima ko'rsatadi?
```

U qaysi qiymatni ko'rsatadi? "Pete" yoki "John"mi?
