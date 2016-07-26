importance: 5

---

# Second bind

Can we change `this` by additional binding?

What will be the output?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

