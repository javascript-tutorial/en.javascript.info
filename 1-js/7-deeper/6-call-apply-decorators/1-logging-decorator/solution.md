Возвратим декоратор `wrapper` который будет записывать аргумент в `log` и передавать вызов в `f`:

```js run
function work(a) {
  /*...*/ // work - произвольная функция, один аргумент
}

function makeLogging(f, log) {

*!*
  function wrapper(a) {
      log.push(a);
      return f.call(this, a);
    }
*/!*

  return wrapper;
}

var log = [];
work = makeLogging(work, log);

work(1); // 1
work(5); // 5

for (var i = 0; i < log.length; i++) {
  alert( 'Лог:' + log[i] ); // "Лог:1", затем "Лог:5"
}
```

**Обратите внимание, вызов функции осуществляется как `f.call(this, a)`, а не просто `f(a)`.**

Передача контекста необходима, чтобы декоратор корректно работал с методами объекта. Например:

```js
user.method = makeLogging(user.method, log);
```

Теперь при вызове `user.method(...)` в декоратор будет передаваться контекст `this`, который надо передать исходной функции через `call/apply`.

