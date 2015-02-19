# Запись в объект после bind

[importance 5]

Что выведет функция?

```js
function f() {
  alert( this );
}

var user = {
  g: f.bind("Hello")
}
      
user.g();
```

