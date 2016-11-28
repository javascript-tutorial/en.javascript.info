
Any `setTimeout` will run only after the current code has finished.

The `i` will be the last one: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
