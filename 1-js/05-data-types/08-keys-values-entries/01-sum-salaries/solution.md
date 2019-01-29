```js run
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}
```
Or, optionally, we could also get the sum using `Object.values` and `reduce`:

`Object.values(salaries).reduce((a, b) => a + b) // 650`
