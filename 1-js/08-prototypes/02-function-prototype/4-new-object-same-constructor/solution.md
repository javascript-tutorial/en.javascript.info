We can use such approach if we are sure that `"constructor"` property has the correct value.

For instance, if we don't touch the default `"prototype"`, then this code works for sure:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (worked!)
```

It worked, because `User.prototype.constructor == User`.

..But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `"constructor"`, then it would fail.

For instance:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

Why `user2.name` is `undefined`?

Here's how `new user.constructor('Pete')` works:

1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has nothing.
3. The value of `User.prototype` is a plain object `{}`, its prototype is `Object.prototype`. And there is `Object.prototype.constructor == Object`. So it is used.

At the end, we have `let user2 = new Object('Pete')`. The built-in `Object` constructor treats passed arguments in regard with their type which may result in the following outcomes.

1. Primitive wrapper object will be created if primitive value was passed:

```js
// String
let strObj = new Object('str');
typeof strObj; // "object"
typeof strObj.valueOf(); // "string"

// Number
let numObj = new Object(3);
typeof numObj; // "object"
typeof numObj.valueOf(); // "number"

// Boolean
let boolObj = new Object(true);
typeof boolObj; // "object"
typeof boolObj.valueOf(); // "boolean"

// Symbol
let symObj = new Object(Symbol('s'));
typeof symObj; // "object"
typeof symObj.valueOf(); // "symbol"

// BigInt
let bigIntObj = new Object(BigInt(2));
typeof bigIntObj; // "object"
typeof bigIntObj.valueOf(); // "bigint"
```

2. For user created objects(with custom constructor) passed in, call the built-in `Object` constructor will simply return those objects identity(not recreate):

```js
function Foo() {}
let f = new Foo();

let k = new Object(f);
k instanceof Foo; // true
f === k; // true
// both of f and k points on the same object
```

3. New plain object will be created in case if `null`, `undefined` or nothing was passed:

```js
new Object(null).toString(); // [object Object]
new Object(undefined).toString(); // [object Object]
new Object().toString(); // [object Object]
```

So, `user2` will be initialized with the primitive wrapper object around `String` type, therefore `user2.name === undefined` since there is no `name` property exists on `String.prototype`
