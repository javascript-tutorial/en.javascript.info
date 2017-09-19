Let's walk the array items:
- For each item we'll check if the resulting array already has that item.
- If it is so, then ignore, otherwise add to results.

```js run
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

The code works, but there's a potential performance problem in it.

The method `result.includes(str)` internally walks the array `result` and compares each element against `str` to find the match.

So if there are `100` elements in `result` and no one matches `str`, then it will walk the whole `result` and do exactly `100` comparisons. And if `result` is large, like `10000`, then there would be `10000` comparisons.

That's not a problem by itself, because JavaScript engines are very fast, so walk `10000` array is a matter of microseconds.

But we do such test for each element of `arr`, in the `for` loop.

So if `arr.length` is `10000` we'll have something like `10000*10000` = 100 millions of comparisons. That's a lot.

So the solution is only good for small arrays.

Further in the chapter <info:map-set-weakmap-weakset> we'll see how to optimize it.
