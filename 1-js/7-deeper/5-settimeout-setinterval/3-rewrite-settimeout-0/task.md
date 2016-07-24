importance: 4

---

# Rewrite setTimeout with setInterval

Rewrite the split counting function from setTimeout to setInterval:

```js run
let i = 0;

let start = performance.now();

function count() {

  if (i == 1000000000) {
    alert("Done in " + (performance.now() - start) + 'ms');
  } else {
    setTimeout(count, 0);
  }

  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```

