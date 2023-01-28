```js run demo
function sumSalaries(salaries) {
  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

alert(sumSalaries(salaries)); // 650
```

Yoki ixtiyoriy ravishda `Object.values` va `reduce` yordamida yig‘indini ham olishimiz mumkin:

```js
// ish haqi to'lovlari bo'yicha tsikllarni qisqartirish,
// ularni qo'shish
// va natijani qaytaradi
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0); // 650
}
```
