# Преобразование

[importance 5]

Объявлен объект с `toString` и `valueOf`.

Какими будут результаты `alert`?

```js
var foo = {
    toString: function () {
        return 'foo';
    },
    valueOf: function () {
        return 2;
    }
};

alert(foo);
alert(foo + 1);
alert(foo + "3");
```

Подумайте, прежде чем ответить.