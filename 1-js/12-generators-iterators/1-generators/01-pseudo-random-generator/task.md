
# Pseudo-random generator

There are many areas where we need random data.

One of them is testing. We may need random data: text, numbers, etc. to test things out well.

In JavaScript, we could use `Math.random()`. But if something goes wrong, we'd like to be able to repeat the test, using exactly the same data.

For that, so called "seeded pseudo-random generators" are used. They take a "seed", the first value, and then generate the next ones using a formula so that the same seed yields the same sequence, and hence the whole flow is easily reproducible. We only need to remember the seed to repeat it.

An example of such formula, that generates somewhat uniformly distributed values:

```
next = previous * 16807 % 2147483647
```

If we use `1` as the seed, the values will be:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...and so on...

The task is to create a generator function `pseudoRandom(seed)` that takes `seed` and creates the generator with this formula.

Usage example:

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
