Решение аналогично задаче [](/task/logging-decorator), разница в том, что в лог вместо одного аргумента идет весь объект `arguments`.

Для передачи вызова с произвольным количеством аргументов используем `f.apply(this, arguments)`.

```js
//+ run
function work(a, b) { 
  alert(a + b); // work - произвольная функция
}

function makeLogging(f, log) {
 
*!*
  function wrapper() {
    log.push([].slice.call(arguments));
    return f.apply(this, arguments);   
  }
*/!*

  return wrapper;
}

var log = [];
work = makeLogging(work, log);

work(1, 2); // 3
work(4, 5); // 9

for(var i=0; i<log.length; i++) {
  var args = log[i]; // массив из аргументов i-го вызова
  alert( 'Лог:' + args.join() ); // "Лог:1,2", "Лог:4,5"
}
```

