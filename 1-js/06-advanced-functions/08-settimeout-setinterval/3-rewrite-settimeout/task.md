importance: 4

---

# Rewrite setTimeout with setInterval

Here's the function that uses nested `setTimeout` to split a job into pieces.

Rewrite it to `setInterval`:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count);
  }

  // a piece of heavy job
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```
