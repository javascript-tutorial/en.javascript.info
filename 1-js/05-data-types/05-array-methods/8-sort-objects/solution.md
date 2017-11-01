```js run no-beautify
function sortByName(arr) {
  arr.sort((a, b) => a.name > b.name);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now sorted is: [john, mary, pete]
alert(arr[1].name); // Mary
```

