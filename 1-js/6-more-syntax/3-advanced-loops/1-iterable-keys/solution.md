
That's because `arr.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:


```js run
let arr = [];
arr[5] = true;

*!*
let numbers = Array.from(arr.keys());
*/!*
numbers.push(6);
alert(numbers); // 0,1,2,3,4,5,6
```
