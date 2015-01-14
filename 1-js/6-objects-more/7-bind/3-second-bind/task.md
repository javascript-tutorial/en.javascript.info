# Повторный bind

[importance 5]

Что выведет этот код?

```js
function f() {
  alert(this.name);
}

f = f.bind( {name: "Вася"} ).bind( {name: "Петя" } );

f();
```

