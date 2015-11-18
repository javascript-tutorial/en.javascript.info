# Is "else" required?

[importance 4]

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

Will the function work differently if `else` is removed?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

Is there any difference in the bahavior of these two variants?
