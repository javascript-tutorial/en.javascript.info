The answer: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

The exotic [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) object returned by `f.bind(...)` remembers the context (and arguments if provided) only at creation time. 

A function cannot be re-bound.
