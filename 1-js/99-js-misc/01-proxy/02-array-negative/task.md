
# Accessing array[-1]

In some programming languages, we can access array elements using negative indexes, counted from the end.

Like this:

```js
let array = [1, 2, 3];

array[-1]; // 3, the last element
array[-2]; // 2, one step from the end
array[-3]; // 1, two steps from the end
```

In other words, `array[-N]` is the same as `array[array.length - N]`.

Create a proxy to implement that behavior.

That's how it should work:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* your code */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// Other array functionality should be kept "as is"
```
