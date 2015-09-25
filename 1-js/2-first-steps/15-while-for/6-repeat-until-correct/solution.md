
```js
//+ run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

The loop `do..while` repeats while both checks are truthy:
<ol>
<li>The check for `num <= 100` -- that is, the entered value is still not greater than `100`.</li>
<li>The check for a truthiness of `num` checks that `num != null` and `num != ""` simultaneously.</li>
</ol>

P.S. By the way, if `num` is `null` then `num <= 100` would return `false`, not `true`!
