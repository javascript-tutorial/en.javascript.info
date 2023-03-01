muhimlik: 5

---

# Bog'lanishdan keyin funksiya xossasi

Funktsiyaning xususiyatida qiymat mavjud. U `bind` dan keyin o'zgaradimi? Nima uchun, yoki nima uchun yo'q?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // natijasi nima bo'ladi? nima uchun?
*/!*
```

