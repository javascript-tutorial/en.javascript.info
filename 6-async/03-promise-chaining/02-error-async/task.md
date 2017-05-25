# Error in setTimeout

How do you think, does the `.catch` trigger? Explain your answer?

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
