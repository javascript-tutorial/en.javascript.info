muhimlik: 5

---

# Ikkinchi bog'lash

`This`ni qo'shimcha bog'lash orqali o'zgartira olamizmi?

Natija nima bo'ladi?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

