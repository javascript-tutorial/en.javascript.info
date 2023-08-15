muhimlik: 5

---

# Funktsiyalar armiyasi

Quyidagi kod `shooters` massivini yaratadi.

Har bir funktsiya o'z raqamini chiqarish uchun mo'ljallangan. Lekin nimadir noto'g'ri ...

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // otish funksiyasini yarating,
      alert( i ); // bu uning raqamini ko'rsatishi
    };
    shooters.push(shooter); // va uni massivga qo'shishi
    i++;
  }

  // ...va otishmalar qatorini qaytarishi kerak
  return shooters;
}

let army = makeArmy();

*!*
// barcha shooterlar 0, 1, 2, 3 raqamlari oʻrniga 10 ni koʻrsatadi...
army[0](); // 0-raqamli shooterdan 10
army[1](); // 1-raqamli shooterdan 10
army[2](); // 10 ...va hokazo.
*/!*
```

Nima uchun barcha shooterlar bir xil qiymatni ko'rsatadi?

Kodni ular mo'ljallangan tarzda ishlashi uchun tuzating.

