importance: 5

---

# Filter through function

We have a built-in method `arr.filter(f)` for arrays. It filters all elements through the function `f`. If it returns `true`, then that element is returned in the resulting array.

Make a set of "ready to use" filters:

- `inBetween(a, b)` -- between `a` and `b` or equal to them (inclusively).
- `inArray([...])` -- in the given array.

The usage must be like this:

- `arr.filter(inBetween(3,6))` -- selects only values between 3 and 6.
- `arr.filter(inArray([1,2,3]))` -- selects only elements matching with one of the members of `[1,2,3]`.

For instance:

```js
/* .. your code for inBetween and inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```

