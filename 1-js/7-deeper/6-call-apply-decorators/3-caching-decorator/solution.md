Запоминать результаты вызова функции будем в замыкании, в объекте `cache: { ключ:значение }`.

```js run no-beautify
function f(x) {
  return Math.random()*x;
}

*!*
function makeCaching(f) {
  var cache = {};

  return function(x) {
    if (!(x in cache)) {
      cache[x] = f.call(this, x);
    }
    return cache[x];
  };

}
*/!*

f = makeCaching(f);

var a = f(1);
var b = f(1);
alert( a == b ); // true (значение закешировано)

b = f(2);
alert( a == b ); // false, другой аргумент => другое значение
```

Обратите внимание: проверка на наличие уже подсчитанного значения выглядит так: `if (x in cache)`. Менее универсально можно проверить так: `if (cache[x])`, это если мы точно знаем, что `cache[x]` никогда не будет `false`, `0` и т.п.

