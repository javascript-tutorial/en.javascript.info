The answer: `1`, and then `undefined`.

```js
//+ run
alert( alert(1) && alert(2) );
```
 
The call to `alert` does not return a value or, in other words, returns `undefined`.

Because of that, `&&` evaluates the left operand (outputs `1`), and immediately stops, because `undefined` is a falsy value. And `&&` looks for a falsy value and returns it, so it's done.

