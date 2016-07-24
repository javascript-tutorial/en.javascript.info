

```js run
let i = 0;

let start = performance.now();

let timer = setInterval(count, 0);

function count() {

  for(let j = 0; j < 1000000; j++) {
    i++;
  }

  if (i == 1000000000) {
    alert("Done in " + (performance.now() - start) + 'ms');
    cancelInterval(timer);
  }

}
```

