# Error in setTimeout

What do you think? Will the `.catch` trigger? Explain your answer.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
