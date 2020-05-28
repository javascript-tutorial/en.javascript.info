importance: 3

---

# Explain the value of "this"

In the code below we intend to call `obj.go()` method 4 times in a row.

But calls `(1)` and `(2)` works differently from `(3)` and `(4)`. Why?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

