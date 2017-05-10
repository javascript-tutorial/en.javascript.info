importance: 5

---

# The maximal salary 

There is a `salaries` object:

```js
let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};
```

Create the function `topSalary(salaries)` that returns the name of the top-paid person.

- If `salaries` is empty, it should return `null`.
- If there are multiple top-paid persons, return any of them.

P.S. Use `Object.entries` and destructuring to iterate over key/value pairs.
