
# Filter inBetween

```js run
function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
```
1. The `inBetween(3, 6)` call creates a function that checks if an element is within the range of 3 and 6 (inclusive).
2. The `arr.filter()` method iterates through each element in the `arr` array and passes each element to the function returned by `inBetween(3, 6)`.
3. The inner function checks if the element is greater than or equal to the value of `a` (3) and less than or equal to the value of `b` (6).
4. If the element falls within the specified range, it's included in the resulting array, which gets displayed eventually.

# Filter inArray

```js run demo
function inArray(arrToCheck) {
  return function(x) {
    return arrToCheck.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
1. The `inArray` function is defined, which takes an array `arrToCheck` as its argument. It returns a function that checks if a given value `x` is present in the `arrToCheck`.
2. `arr` is an array [1, 2, 3, 4, 5, 6, 7].
3. The `arr.filter()` method is used to filter the elements of `arr`. It takes the `inArray([1, 2, 10])` function as the callback. This means that for each element `x` in `arr`, the `inArray([1, 2, 10])` function will be called.
4. Inside the `inArray([1, 2, 10])` function, the `arrToCheck.includes(x)` call checks if the value of `x` is present in the array `[1, 2, 10]`. If it's present, `includes()` returns `true`, and the element is included in the filtered array.
5. As a result, the `alert` statement displays the filtered array `[1, 2]`, which are the elements that are present in both the original `arr` and the specified `[1, 2, 10]` array.
