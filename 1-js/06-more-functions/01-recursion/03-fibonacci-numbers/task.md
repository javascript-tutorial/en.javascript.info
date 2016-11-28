importance: 5

---

# Fibonacci numbers

The sequence of [Fibonacci numbers](https://en.wikipedia.org/wiki/Fibonacci_number) has the formula <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. In other words, the next number is a sum of the two preceding ones.

First two numbers are `1`, then `2(1+1)`, then `3(1+2)`, `5(2+3)` and so on: `1, 1, 2, 3, 5, 8, 13, 21...`.

Fibonacci numbers are related to the [Golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) and many natural phenomena around us.

Write a function `fib(n)` that returns the `n-th` Fibonacci number.

An example of work:

```js
function fib(n) { /* your code */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. The function should be fast. The call to `fib(77)` should take no more than a fraction of a second.
