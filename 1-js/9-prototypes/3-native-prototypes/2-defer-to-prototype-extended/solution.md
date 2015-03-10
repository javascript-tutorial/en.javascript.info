

```js
//+ run
Function.prototype.defer = function(ms) {
  var f = this;
  return function() {
    var args = arguments,
      context = this;
    setTimeout(function() {
      f.apply(context, args);
    }, ms);
  }
}

// проверка
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // выведет 3 через 1 секунду.
```

