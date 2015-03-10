# Почему this присваивается именно так?

[importance 3]

Вызовы `(1)` и `(2)` в примере ниже работают не так, как `(3)` и `(4)`:

```js
//+ run no-beautify
"use strict"

var obj, f;

obj = {
  go: function() { alert(this); }
};

obj.go();            // (1) object

(obj.go)();          // (2) object

(method = obj.go)();      // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

В чём дело? Объясните логику работы `this`.
