# Array methods

Arrays provide a lot of methods. In this chapter we'll study them more in-depth.

[cut]

## split and join

Here's the situation from the real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?

The [str.split(delim)](mdn:js/String/split) method does exactly that. It splits the string into an array by the given delimiter `delim`.

In the example below, we split by a comma followed by space:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

The `split` method has an optional second numeric argument -- a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Split into letters"
The call to `split(s)` with an empty `s` would split the string into an array of letters:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

The call [arr.join(str)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items glued by `str` beween them.

For instance:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

## splice

How to delete an element from the array?

The arrays are objects, so we can try to use `delete`:

```js run
var arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

The element was removed, but the array still has 3 elements, we can see that `arr.length == 3`. 

That's natural, because `delete obj.key` removes a value by the `key`. It's all it does. Fine for objects. But for arrays we usually want the rest of elements to shift and occupy the freed place. We expect to have a shorter array now.

So, special methods should be used.

The [arr.splice(str)](mdn:js/Array/splice) method is a swiss army knife for arrays. It can do everything: add, remove and insert elements.

The syntax is:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

It starts from the position `index`: removes `deleteCount` elements and then inserts `elem1, ..., elemN` at their place. Returns the array of removed elements.

This method is easy to grasp by examples.

Let's start with the deletion:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // from index 1 remove 1 element
*/!*

alert( arr ); // ["I", "JavaScript"]
```

Easy, right? Starting from the index `1` it removed `1` element.

In the next example we remove 3 elements and replace them by the other two:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// remove 3 first elements and replace them by another
arr.splice(0, 3, "Let's", "dance")

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

Here we can see that `splice` returns the array of removed elements:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements
```

The `splice` method is also able to insert the elements without any removals. For that we need to set `deleteCount` to `0`:

```js run
let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="Negative indexes allowed"
Here and in other array methods, negative indexes are allowed. The specify the position from the end of the array, like here:

```js run
let arr = [1, 2, 5]

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

## sort(fn)

The method [arr.sort()](mdn:js/Array/sort) sorts the array *at place*. 

For instance:

```js run
let arr = [ 1, 2, 15 ];

// the method reorders the content of arr (and returns it)
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Did you notice anything strange in the outcome?

The order became `1, 15, 2`. Incorrect. But why?

**The items are sorted as strings by default.**

Literally, all elements are converted to strings and then compared. So, the lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function of two arguments as the argument of `arr.sort()`. 

The function should work like this:
```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

For instance:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Now it works as intended.

Let's step aside and thing what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or html elements or whatever. We have a set of *something*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.

The `arr.sort(fn)` method has a built-in implementation of sorting algorithm. We don't need to care which how it exactly works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) most of time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.

By the way, if we ever want to know which elements are compared -- nothing prevents from alerting them:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

The algorithm may compare an element multiple times in the process, but it tries to make as few comparisons as possible.


````smart header="A comparison function may return any number"
Actually, a comparison function is only required to return a positive number to say "greater" and a negative number to say "less". 

That allows to write shorter functions:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow functions for the best"
Remember [arrow functions](info:function-expression#arrow-functions)? We can use them here for neater sorting:

```js 
arr.sort( (a, b) => a - b );
```

This would work exactly the same as a longer function expression above.
````

## indexOf/lastIndexOf and includes

The methods [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) and [arr.includes](mdn:js/Array/includes) are the same as their string counterparts.

For instance:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Note that the methods use `===` comparison. So, if we look for `false`, it finds exactly `false` and not the zero.


## find 

Imagine we have an array of objects. How do we find an object with the specific condition?

Here the [arr.find(fn)](mdn:js/Array/find) method comes in handy.

The syntax is:
```js
let result = arr.find(function(item, index, array) {
  // should return true if the item is what we are looking for
});
```

The function is called repetitively for each element of the array:

- `item` is the element.
- `index` is its index.
- `array` is the array itself.

If it returns `true`, the search is stopped, the `item` is returned. If nothing found, `undefined` is returned.

For example, we have an array of users, each with the fields `id` and `name`. Let's find the one with `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

In real life arrays of objects is a common thing, so the `find` method is very useful.

Note that in the example we provide to `find` a single-argument function `item => item.id == 1`. It could be longer, like `(item, index, array) => ...`, but the additional parameters are optional. In fact, they are rarely used.


## filter

The `find` method looks for a single (first) element that makes the function return `true`.

If there may be multiple, we can use [arr.filter(fn)](mdn:js/Array/filter).

The syntax is roughly the same, but it returns an array of matching elements:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## forEach 

The [arr.forEach](mdn:js/Array/forEach) method allows to run a function for every element of the array.

The syntax:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

For instance, this shows each element of the array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

And this code is more elaborate about their positions in the target array:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

The result of the function (if it returns any) is thrown away and ignored.

## map

The [arr.map](mdn:js/Array/map) is used to transform the array.

It calls a function for each element of the array and returns the array of the results.

For instance:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length)
alert(lengths); // 5,7,6
```
  
## reduce/reduceRight

When we need to iterate over an array -- we can use `forEach`.

When we need to iterate and return the data for each element -- we can use `map`.

The methods [arr.reduce](mdn:js/Array/reduce) and [arr.reduceRight](mdn:js/Array/reduceRight) also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array. 

The syntax is:

```js
let value = arr.reduce(function(previousValue, item, index, arr) {
  // ...
}, initial);
```

The function is applied to the elements. You may notice the familiar arguments, starting from the 2nd:

- `item` -- is the current array item.
- `index` -- is its position.
- `arr` -- is the array.

So far, like `forEach/map`. But there's one more argument:

- `previousValue` -- is the result of the previous function call, `initial` for the first call.

The easiest way to grasp that is by example.

Here we get a sum of array in one line:

```js run
let arr = [1, 2, 3, 4, 5]

let result = arr.reduce((sum, current) => sum + current), 0);

alert( result ); // 15
```

Here we used the most common variant of `reduce` which uses only 2 arguments.

Let's see the details of what's going on.

1. On the first run, `sum` is the initial value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element ot it, and so on...

The calculation flow:

![](reduce.png)

Or in the form of a table, where each row represents is a function call on the next array element:

|   |`sum`|`current`|результат|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|


As we can see, the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current); 

alert( result ); // 15
```

The result is the same. That's because if there's no initial, then `reduce` takes the first element of the array as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row. 

But such use requires an extreme care. If the array is empty, then `reduce` call without initial value gives an error. So it's generally advised to specify the initial value.

The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same, but goes from right to left.

## Other methods

We covered the most useful methods. But there are other too, for instance:

- [arr.slice(begin, end)](mdn:js/Array/slice) copies the portion of the array.

    It creates a new array and copies elements of `arr` from  `begin` to `end` into it. Both arguments are optional: if `end` is omitted, the copying goes till the end, if `begin` is omitted, then from the very beginning. So `arr.slice()` makes a full copy.

- [arr.concat(arr2, arr3...)](mdn:js/Array/concat) joins the arrays.

  It creates a new array from elements of `arr`, then appends elements from `arr2` to it, then appends elements from `arr3` and so on. 

- [arr.reverse()](mdn:js/Array/reverse) reverses the array.

  It creates a new array with elements from `arr` in the reverse order.

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.

  The function `fn` is called on each element of the array similar to `map`. If any/all results are `true`, returns `true`, otherwise `false`.

These and other methods are also listed in the [manual](mdn:js/Array).

## Summary

Most often methods:

- `split/join` -- convert a string to array and back.
- `splice` -- delete and insert elements at the given position.
- `sort` -- sorts the array.
- `indexOf/lastIndexOf`, `includes` -- look for the value.
- `find/filter` -- return first/all values satisfying the given condition.
- `forEach` -- runs a function for each element.
- `map` -- transforms the array through the function.
- `reduce/reduceRight` -- calculates a single value based on array.
- `slice` -- copy the part of the array.

These methods are used in 95% of cases. For the full list, see the [manual](mdn:js/Array).

The methods are easy to remember when you use them. Please refer to the tasks for some practice.
