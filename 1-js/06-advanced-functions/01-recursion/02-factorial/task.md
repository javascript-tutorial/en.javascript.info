importance: 4

---

# Calculate factorial

The [factorial](https://en.wikipedia.org/wiki/Factorial) of a natural number is a number multiplied by `"number minus one"`, then by `"number minus two"`, and so on till `1`. The factorial of `n` is denoted as `n!`

We can write a definition of factorial like this:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Values of factorials for different `n`:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

The task is to write a function `factorial(n)` that calculates `n!` using recursive calls.

```js
alert( factorial(5) ); // 120
```

P.S. Hint: `n!` can be written as `n * (n-1)!` For instance: `3! = 3*2! = 3*2*1! = 6`
