importance: 3

---

# Логирующий декоратор (много аргументов)

Создайте декоратор `makeLogging(func, log)`, для функции `func` возвращающий обёртку, которая при каждом вызове добавляет её аргументы в массив `log`.

Условие аналогично задаче <info:task/logging-decorator>, но допускается `func` с любым набором аргументов.

Работать должно так:

```js
function work(a, b) {
  alert( a + b ); // work - произвольная функция
}

function makeLogging(f, log) { /* ваш код */ }

var log = [];
work = makeLogging(work, log);

work(1, 2); // 3
work(4, 5); // 9

for (var i = 0; i < log.length; i++) {
  var args = log[i]; // массив из аргументов i-го вызова
  alert( 'Лог:' + args.join() ); // "Лог:1,2", "Лог:4,5"
}
```

