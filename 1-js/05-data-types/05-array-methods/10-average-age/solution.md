```js run
function getAverageAge(users) {
  return arr.reduce((prev, user) => prev + user.age, 0) / arr.length;
}

let john = { name: "John", age: 25 }
let pete = { name: "Pete", age: 30 }
let mary = { name: "Mary", age: 29 }

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // 28
```

