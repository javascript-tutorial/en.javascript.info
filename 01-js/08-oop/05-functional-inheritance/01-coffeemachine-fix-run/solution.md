Изменения в методе `run`:

```js
this.run = function() {
*!*
  if (!this._enabled) {
    throw new Error("Кофеварка выключена");
  }
*/!*

  setTimeout(onReady, 1000);
};
```

[edit src="solution" /]
