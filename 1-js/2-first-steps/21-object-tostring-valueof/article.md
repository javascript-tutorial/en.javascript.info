
# Object to primitive conversion

In the chapter <info:type-conversions> we've seen the rules for numeric, string and boolean conversions.

But we left the gap for objects. Now let's close it.

[cut]

The operation that converts an object to a primitive is called [ToPrimitive](https://tc39.github.io/ecma262/#sec-toprimitive).

Some build-in language objects have their own implementation of it, but for most objects, including our own, it comes in two flavours:

- string
- number

TODO



The method `toString` is automatically called by Javascript when the object is converted to a string:

```js run
let user = {

  name: 'John',

*!*
  toString() {
    return `User ${this.firstName}`;
  }
*/!*

};

*!*
alert( user );  // User John
*/!*
```

Looks much better than the default `[object Object]`, right?


The similar thing with the method `valueOf`. It is called when the object is converted to a number.

```js run
let room = {
  number: 777,

  valueOf() {
    return this.number; 
  },
};

alert( +room );  // 777, valueOf is called
```

What really sounds strange -- is the name of the method. Why is it called "valueOf", why not "toNumber"?

The reason is that `valueOf` is used by default to convert an object to a primitive for operations where a primitive value is required.



