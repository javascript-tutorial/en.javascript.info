Используя оператор `'?'`:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Родители разрешили?');
}
```

Используя оператор `||` (самый короткий вариант):

```js
function checkAge(age) {
  return (age > 18) || confirm('Родители разрешили?');
}
```

