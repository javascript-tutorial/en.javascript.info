# Кросс-браузерная эмуляция bind

[importance 3]

Если вы вдруг захотите копнуть поглубже -- аналог `bind` для IE8- и старых версий других браузеров будет выглядеть следующим образом:

```js
//+ no-beautify
function bind(func, context /*, args*/) {
  var bindArgs = [].slice.call(arguments, 2); // (1)
  function wrapper() {                        // (2)
    var args = [].slice.call(arguments); 
    var unshiftArgs = bindArgs.concat(args);  // (3)
    return func.apply(context, unshiftArgs);  // (4)
  }
  return wrapper;
}
```

Использование -- вместо `mul.bind(null, 2)` вызывать `bind(mul, null, 2)`.

Не факт, что он вам понадобится, но в качестве упражнение попробуйте разобраться, как это работает.

