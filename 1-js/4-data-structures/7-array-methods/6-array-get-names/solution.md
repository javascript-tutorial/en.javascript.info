```js run no-beautify
function getNames(arr) {
  return arr.map(item => item.name);
}


let john = { name: "John", age: 25 }
let pete = { name: "Pete", age: 30 }
let mary = { name: "Mary", age: 28 }

let arr = [ john, pete, mary ];

let names = getNames(arr);

alert( names ) // John, Pete, Mary
```

