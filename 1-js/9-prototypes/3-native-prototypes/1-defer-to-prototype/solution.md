

```js
//+ run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
}

function f() {
  alert("привет");
}

f.defer(1000); // выведет "привет" через 1 секунду
```

