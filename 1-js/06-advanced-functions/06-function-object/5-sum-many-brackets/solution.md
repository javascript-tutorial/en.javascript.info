
1. For the whole thing to work *anyhow*, the result of `sum` must be function.
2. That function must keep in memory the current value between calls.
3. According to the task, the function must become the number when used in `==`. Functions are objects, so the conversion happens as described in the chapter <info:object-toprimitive>, and we can provide our own method that returns the number.

Now the code:

```js demo run
function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
```

Please note that the `sum` function actually works only once. It returns function `f`.

Then, on each subsequent call, `f` adds its parameter to the sum `currentSum`, and returns itself.

**There is no recursion in the last line of `f`.**

Here is what recursion looks like:

```js
function f(b) {
  currentSum += b;
  return f(); // <-- recursive call
}
```

And in our case, we just return the function, without calling it:

```js
function f(b) {
  currentSum += b;
  return f; // <-- does not call itself, returns itself
}
```

This `f` will be used in the next call, again return itself, as many times as needed. Then, when used as a number or a string -- the `toString` returns the `currentSum`. We could also use `Symbol.toPrimitive` or `valueOf` here for the conversion.
