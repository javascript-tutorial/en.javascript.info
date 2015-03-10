# With + переменные

[importance 5]

Что выведет этот код?

```js
var a = 1;

var obj = {
  b: 2
};

with(obj) {
  var b;
  alert( a + b );
}
```

