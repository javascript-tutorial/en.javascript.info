Ответ: `1`.

```js
//+ run  untrusted refresh
if ("a" in window) {
    var a = 1;
}
alert(a);
```

Посмотрим, почему.

На стадии подготовки к выполнению, из `var a` создается `window.a`:

```js
// window = {a:undefined}

if ("a" in window) { // в if видно что window.a уже есть
    var a = 1; // поэтому эта строка сработает
}
alert(a);
```

В результате `a` становится `1`.