# Унаследуйте от SyntaxError

[importance 5]

Создайте ошибку `FormatError`, которая будет наследовать от встроенного класса `SyntaxError`.

Синтаксис для её создания -- такой же, как обычно:

```js
var err = new FormatError("ошибка форматирования");

alert( err.message ); // ошибка форматирования
alert( err.name ); // FormatError
alert( err.stack ); // стек на момент генерации ошибки

alert( err instanceof SyntaxError ); // true
```
