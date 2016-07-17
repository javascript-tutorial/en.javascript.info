We need to generate a random integer value from `0` to `arr.length-1`, and then take the element with that index.

Here we go:

```js run
let arr = ["Apple", "Orange", "Pear", "Lemon"];

let rand = Math.floor(Math.random() * arr.length);

alert( arr[rand] );
```

