muhimlik: 5

---

# Dekoratorlarni kechiktirish

Har bir `f` chaqiruvini `ms` millisekundlarga kechiktiradigan `delay(f, ms)` dekoratorini yarating.

Masalan:

```js
function f(x) {
  alert(x);
}

// o'rovlarni yarating
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // 1000ms dan keyin "test" ni ko'rsatadi
f1500("test"); // 1500ms dan keyin "test" ni ko'rsatadi
```

Boshqacha qilib aytganda, `delay(f, ms)` `f` ning `ms` bilan kechiktirilgan variantini qaytaradi.

Yuqoridagi kodda `f` bitta argumentning funktsiyasidir, ammo sizning yechimingiz barcha argumentlar va kontekst `this`dan o'tishi kerak.