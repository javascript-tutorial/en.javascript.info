First, let's see why the latter code doesn't work.

The reason becomes obvious if we try to run it. An inheriting class constructor must call `super()`. Otherwise `"this"` won't be "defined".

So here's the fix:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // need to call the parent constructor when inheriting
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

But that's not all yet.

Even after the fix, there's still an important difference between `"class Rabbit extends Object"` and `class Rabbit`.

As we know, the "extends" syntax sets up two prototypes:

1. Between `"prototype"` of the constructor functions (for methods).
2. Between the constructor functions themselves (for static methods).

In the case of `class Rabbit extends Object` it means:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

So `Rabbit` now provides access to the static methods of `Object` via `Rabbit`, like this:

```js run
class Rabbit extends Object {}

*!*
// normally we call Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

But if we don't have `extends Object`, then `Rabbit.__proto__` is not set to `Object`.

Here's the demo:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

*!*
// error, no such function in Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

So `Rabbit` doesn't provide access to static methods of `Object` in that case.

By the way, `Function.prototype` also has "generic" function methods, like `call`, `bind` etc. They are ultimately available in both cases, because for the built-in `Object` constructor, `Object.__proto__ === Function.prototype`.

Here's the picture:

![](rabbit-extends-object.svg)

So, to put it short, there are two differences:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | needs to call `super()` in constructor |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
