# Вызов в контексте массива

[importance 5]

Каким будет результат? Почему?

```js
var arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

