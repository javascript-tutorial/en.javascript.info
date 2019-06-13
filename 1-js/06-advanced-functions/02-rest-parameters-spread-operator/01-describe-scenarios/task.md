importance: 2

---

# Describe common cases

Describe and code three scenarios where the **rest operator** would allow us to create really neat functions. For instance:

- Any mathematical operation where you do not know the number of operands.
```js no-beautify
function sumAll(...operands) {
  let sum = 0;

  for (let operand of operans) sum += operand;

  return sum;
}
...
