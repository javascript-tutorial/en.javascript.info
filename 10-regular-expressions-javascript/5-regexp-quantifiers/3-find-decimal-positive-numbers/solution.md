

Целое число -- это <code class="pattern">\d+</code>.

Десятичная точка с дробной частью -- <code class="pattern">\.\d+</code>.

Она не обязательна, так что обернём её в скобки с квантификатором <code class="pattern">'?'</code>.

Итого, получилось регулярное выражение <code class="pattern">\d+(\.\d+)?</code>:

```js
//+ run
var re = /\d+(\.\d+)?/g

var str = "1.5 0 12. 123.4.";

alert( str.match(re) );   // 1.5, 0, 12, 123.4
```
