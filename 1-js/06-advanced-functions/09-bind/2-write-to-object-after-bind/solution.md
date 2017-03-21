The answer: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

The context of a bound function is hard-fixed. There's just no way to further change it.

So even while we run `user.g()`, the original function is called with `this=null`.
