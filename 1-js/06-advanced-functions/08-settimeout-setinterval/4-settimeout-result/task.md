importance: 5

---

# What will setTimeout show?

In the code below there's a `setTimeout` call scheduled, then a heavy calculation is run, that takes more than 100ms to finish.

When will the scheduled function run?

1. After the loop.
2. Before the loop.
3. In the beginning of the loop.


What is `alert` going to show?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
