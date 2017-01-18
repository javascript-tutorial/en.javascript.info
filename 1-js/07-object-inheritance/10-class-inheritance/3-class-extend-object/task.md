importance: 5

---

# Class extends Object?

As we know, all objects normally inherit from `Object.prototype` and get access to "generic" object methods.

Like demonstrated here:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// hasOwnProperty method is from Object.prototype
// rabbit.__proto__ === Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
*/!*
```

So, is it correct to say that `"class Rabbit extends Object"` does exactly the same as `"class Rabbit"`, or not?

Will it work?

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

If it won't please fix the code. 
