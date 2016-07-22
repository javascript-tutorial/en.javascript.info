# Function arguments: rest and spread

In Javascript, there is an internal type named [List](https://tc39.github.io/ecma262/#sec-list-and-record-specification-type).

When a function is called, it is said to have "a list of parameters". That's not a figure of speech. The specification officially says that in the call `f(a, b, c)` we have the function `f` the list of `(a, b, c)`.

[cut]

Both List and Array represent ordered collections of values. 

The difference is:

- `Array` is the open data type that we can use, it provides special methods like `push/pop`.
- `List` is the internal type, to represend lists of arguments and such, it has no special methods.

There are two use cases when we want to convert between them:

1. To work with an arbitrary number of function arguments, it's useful to have them in the form of array.
2. We have an array of values and would like to call a function that requires them to be listed.

Both variants are possible.

## Rest parameters `...`

The rest parameters are denoted with three dots `...`. They literally mean: "gather the list into an array".

For instance, here we gather all arguments into array `args`:

```js run
function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for(let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

That also works partially.

For instance, here we put few first arguments into variables and gather only the rest of them:

```js run
function showName(firstName, lastName, ...rest) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest = ["Consul", "of the Roman Republic"]
  alert( rest[0] ); // Consul
  alert( rest[1] ); // of the Roman Republic
  alert( rest.length ); // 2
}

showName("Julius", "Caesar", "Consul", "of the Roman Republic");
```

````warn header="The rest parameters must be at the end"
The rest parameters gather all remaining arguments, so the following has no sense:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

The `...rest` must always be the last.
````

## The "arguments" variable

But there is also a special array-like object named `arguments` that contains all arguments by their index. 

For instance:

```js run
function showName() {
  alert( arguments[0] ); 
  alert( arguments[1] ); 
  alert( arguments.length ); 

  // iterable too
  // for(let arg of arguments) alert(arg); 
}

// shows: Julius, Caesar, 2
showName("Julius", "Caesar");

// shows: Ilya, undefined, 1
showName("Ilya"); 
```

In old times, rest parameters did not exist in the language, and `arguments` was the only way to get *all arguments* of the function no matter of their total number.

And it still works. 

But the downside is that though `arguments` is both array-like and iterable, it's not an array. It does not support array methods. Also, it always has everything in it, we can't get first parameters in the variable and keep only the rest in arguments.

So when we need these features, then rest parameters are preferred. 

## Spread operator [#spread-operator]

We've just seen how to get an array from the list of parameters.

Now let's do the reverse.

For instance, there's a built-in function [Math.max](mdn:js/Math/max) that returns the greatest number from the list:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Now let's say we have an array `[3, 5, 1]`. How to call `Math.max` with it?

Passing it "as it" won't work, because `Math.max` expects a list of numeric arguments, not a single array:

```js run
let arr = [3, 5, 1]; 

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Most of the time we also can't manually list items in the code `Math.max(arg[0], arg[1], arg[2])`, because their exact number is not known. As our script executes, there might be many, or there might be none.

*Spread operator* to the rescue. It looks similar to rest parameters, also using `...`, but does quite the opposite.

When `...iter` is used in the function call, it "expands" an iterable object `iter` into the list.

For `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5
```

Unlike rest parameters, there is no restrictions of now many iterables we use.

Here's example of a combination:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
alert( Math.max(0, ...arr, 2, ...arr2) ); // 15
*/!*
```

```smart header="Spread or rest?"
When you see `"..."`, there's an easy way to differ spread operator from rest parameters:

- Rest parameters, if it's in the function definition (gathers into array).
- Spread operator, if anywhere else (expands an array).
```

Also we can use spread operator to merge arrays:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2]; 
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
```


In the examples above we used an array, but any iterable will do including strings:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

The spread operator `...str` actually does the same as `for..of` to gather elements. For a string, `for..of` returns characters one by one. And then it passes them as a list to array initializer `["h","e","l","l","o"]`.

If our purpose is only to convert an iterable to array, then we can also use `Array.from`:

```js run
let str = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str) ); // H,e,l,l,o
```



## Summary

- When `...` occurs in function parameters, it's "rest parameters" and gathers the rest of the list into the array.
- When `...` occurs anywhere else, it's called a "spread operator" and expands an array into the list.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in the `arguments` array-like iterable object.
