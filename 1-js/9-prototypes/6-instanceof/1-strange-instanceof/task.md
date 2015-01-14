# Странное поведение instanceof

[importance 5]

Почему `instanceof` в коде ниже возвращает `true`, ведь объект `a` явно создан не `B()`?

```js
//+ run
function A() {}
function B() {}

A.prototype = B.prototype = {};

var a = new A();

*!*
alert(a instanceof B); // true
*/!*
```

