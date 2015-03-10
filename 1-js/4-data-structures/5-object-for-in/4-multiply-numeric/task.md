# Умножьте численные свойства на 2

[importance 3]

Создайте функцию `multiplyNumeric`, которая получает объект и умножает все численные свойства на 2. Например:

```js
// до вызова
var menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// после вызова
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

P.S. Для проверки на число используйте функцию:

```js
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
```

