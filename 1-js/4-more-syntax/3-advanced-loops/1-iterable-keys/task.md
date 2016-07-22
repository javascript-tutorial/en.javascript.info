importance: 5

---

# Iterable keys

We want to get an array of numbers `0,1,2,3,4,5`. 

The call to `arr.keys()` can be used, but there's a problem:

```js run
let arr = [];
arr[5] = true;

// loop works
for(let number of arr.keys()) {
  alert(number); // 0,1,2,3,4,5
}


let numbers = arr.keys();
*!*
// Error: numbers.push is not a function
numbers.push(6);
*/!*
```

Why? How can we fix the code to let `numbers.push` work on the last one?