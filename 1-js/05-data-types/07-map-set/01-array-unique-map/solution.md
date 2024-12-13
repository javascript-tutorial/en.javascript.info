The `unique` function efficiently filters duplicate values from an array and returns a new array containing only the unique elements. This solution leverages the JavaScript `Set` object, which is designed to store only unique values, and the `Array.from` method to convert the `Set` back into an array.

```js run
function unique(arr) {
  // Step 1: Create a Set to store unique elements from the array
  const uniqueSet = new Set(arr);

  // Step 2: Convert the Set back into an array
  return Array.from(uniqueSet);
}
```
