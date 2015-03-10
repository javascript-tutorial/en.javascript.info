Да, возможны.

Они должны возвращать одинаковый объект. При этом если функция возвращает объект, то `this` не используется.

Например, они могут вернуть один и тот же объект `obj`, определённый снаружи:

```js
//+ run no-beautify
var obj = {};

function A() { return obj; }
function B() { return obj; }

var a = new A;
var b = new B;

alert( a == b ); // true
```

