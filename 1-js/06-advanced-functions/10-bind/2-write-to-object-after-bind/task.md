Muhimlik: 5

---

# Metod sifatida bog'langan funktsiya

Natija nima bo'ladi?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

