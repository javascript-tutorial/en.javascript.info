```js run demo
function filterRangeInPlace(arr, a, b) {

  arr
    .filter(value => value < a || value > b)
    .forEach(value => arr.splice(arr.indexOf(value), 1));

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]
```
