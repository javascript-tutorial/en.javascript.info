# Строковый буфер с очисткой

[importance 5]

Добавьте буферу из решения задачи [](/task/stringbuffer) метод `buffer.clear()`, который будет очищать текущее содержимое буфера:

```js
function makeBuffer() {
  ...ваш код...
}

var buffer = makeBuffer();

buffer("Тест");
buffer(" тебя не съест ");
alert( buffer() ); // Тест тебя не съест

*!*
buffer.clear();
*/!*

alert( buffer() ); // ""
```

