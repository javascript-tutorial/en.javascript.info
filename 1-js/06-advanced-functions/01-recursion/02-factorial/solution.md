By definition, a factorial `n!` can be written as `n * (n-1)!`.

In other words, the result of `factorial(n)` can be calculated as `n` multiplied by the result of `factorial(n-1)`. And the call for `n-1` can recursively descend lower, and lower, till `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

The basis of recursion is the value `1`. We can also make `0` the basis here, doesn't matter much, but gives one more recursive step:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
