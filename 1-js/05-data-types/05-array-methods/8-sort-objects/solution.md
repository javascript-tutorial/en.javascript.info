```js run no-beautify
function sortByAge(arr) {
  return arr.sort((a, b) => a.age - b.age);  // return is not needed for this task, but it's ok to expect sortBy() behaves the same as sort()
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now sorted is: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
