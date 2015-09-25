There are many algorithms for this task. 

Let's use a nested loop:

```js
For each i in the interval {
  check if i has a divisor from 1..i
  if yes => the value is not a prime
  if no => the value is a prime, show it
}
```

The code using a label:

```js
//+ run
nextPrime:
for (let i = 2; i < 10; i++) { // for each i...

  for (let j = 2; j < i; j++) { // look for a divisor..
    if (i % j == 0) continue nextPrime; // not a prime, go next i
  }

  alert( i ); // a prime
}
```

Surely, there's a lot of space to opimize it. Like, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need change the approach and rely heavily on advanced maths and algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.

