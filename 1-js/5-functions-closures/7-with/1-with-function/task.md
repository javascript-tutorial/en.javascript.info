# With + функция

[importance 5]

Какая из функций будет вызвана?

```js
function f() {
  alert(1)
}

var obj = {
  f: function() {
    alert(2)
  }
};

with(obj) {
  f();
}
```

