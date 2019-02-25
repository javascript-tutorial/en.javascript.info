```js run
let s = Object.prototype.toString;

alert( s.call(String) );      // [object Function]
alert( s.call(new String) );  // [object String] 

alert( s.call(Object) );      // [object Function]
alert( s.call(new Object) );  // [object Object]

alert( s.call(Symbol) );      // [object Function]
alert( s.call(Symbol()) );    // [object Symbol] (*)
```
The results include the built-in object types and values respectively. Notice the `Symbol()` function does not use the `new` syntax as this is currently unsupported. - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
