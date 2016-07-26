importance: 5

---

# Bound function as a method

What will be the output?

```js
function f() {
  alert( this ); // ?
}

var user = {
  g: f.bind(null)
};

user.g();
```

