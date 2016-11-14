# Object prototype

In programming, we often want to take something and extend it.

For instance, we have a `user` object with its properties and methods, and want to make `admin` and `guest` as slightly modified variants of it. We'd like to reuse what we have in `user`, not copy/reimplement its methods, just build a new object on top of it.

*Inheritance* is a language feature that helps in that.


[cut]

## [[Prototype]]

In Javascript, object have a special hidden property `[[Prototype]]`, that is either `null` or references another object. That object is called "a prototype":

![prototype](object-prototype-empty.png)

That `[[Prototype]]` has a "magical" meaning. When we look for a property in `object`, and it's missing, Javascript automatically takes it from the prototype. In programming, such thing is called a "prototypal inheritance". Many cool language features and approaches are based on it.

The property `[[Prototype]]` is hidden, but there are many ways to set it.

One of them is to use `__proto__`, like this:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*
```

Please note that `__proto__` is *not the same* as `[[Prototype]]`. That's a getter/setter for it. Later we'll talk more about other ways of setting it, but for the start it'll do just fine.

So now if we look for something in `rabbit` and it's missing, Javascript automatically takes it from `animal`.

For instance:

```js run
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};

*!*
rabbit.__proto__ = animal;
*/!*

// we can find both properties in rabbit now:
*!*
alert( rabbit.eats ); // true
*/!*
alert( rabbit.jumps ); // true
```

Here `__proto__` sets `animal` to be a prototype of `rabbit`.

When `alert` tries to read property `rabbit.eats`, it can find it `rabbit`, so it follows the `[[Prototype]]` reference and finds it in `animal` (look from the bottom up):

![](proto-animal-rabbit.png)

Here we can say that "`animal` is the prototype of `rabbit`" or "`rabbit` prototypally inherits from `animal`".

So if `animal` has a lot of useful properties and methods, then they become automatically available in `rabbit`. Such properties are called "inherited".

Loops `for..in` also include inherited properties:

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) alert(prop); // jumps, eats
```

If we have a method in `animal`, it can be called on `rabbit`:

```js run
let animal = {
  eats: true,
*!*
  walk() {
    alert("Animal walk");
  }
*/!*
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

// walk is taken from the prototype
*!*
rabbit.walk(); // Animal walk
*/!*
```

The method is automatically taken from the prototype, like this:

![](proto-animal-rabbit-walk.png)

The prototype chain can be longer:


```js run
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

let longEar = {
  earLength: 10,
  __proto__: rabbit
}

// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)
```

![](proto-animal-rabbit-chain.png)

There are actually only two limitations:

1. The references can't go in circles. Javascript will throw an error if we try to assign `__proto__` in circle.
2. The value of `__proto__` can be either an object or `null`. All other values (like primitives) are ignored.

Also it may be obvious, but still: there can be only one `[[Prototype]]`. An object may not inherit from two others.

## Read/write rules

The prototype is only used for reading properties, write/delete for data properties works directly with the object.

In the example below, we assign its own `walk` method to `rabbit`:

```js run
let animal = {
  eats: true,
  walk() { /* unused by rabbit, because (see below) it has its own */  }
};

let rabbit = {
  __proto__: animal
}

*!*
rabbit.walk = function() {
  alert("Rabbit! Bounce-bounce!");
};
*/!*

rabbit.walk(); // Rabbit! Bounce-bounce!
```

Since now, `rabbit.walk()` call finds the method immediately in the object and executes it, without using the prototype:

![](proto-animal-rabbit-walk-2.png)

The situation is a bit different for accessor properties: these properties behave more like  functions. For instance, check out `admin.fullName` property in the code below:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

let admin = {
  __proto__: user,
  isAdmin: true
};

// setter triggers!
*!*
admin.fullName = "Alice Cooper";
*/!*

alert(admin.name); // Alice
alert(admin.surname); // Cooper
```

Here the property `admin.fullName` has a setter in the prototype `user`. So it is not written into `admin`. Instead, the inherited setter is called.

So, the general rule would be:

1. If an assigned property has a setter in the prototype, then use it.
2. Otherwise assign directly to the object.

## The value of "this"

An interesting question may arise in the example above: what's the value of `this` inside `set fullName`? Where the properties `this.name` and `this.surname` are written: `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where a method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter actually uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods and inherit from it. Then we can run its methods on inherited objects and they will modify the state of these objects, not the big one.

For instance, here `animal` represents a "method storage", and `rabbit` makes use of it.

The call `rabbit.sleep()` sets `this.isSleeping` on the `rabbit` object:

```js run
// animal has methods
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

// modifies rabbit.isSleeping
rabbit.sleep();

alert(rabbit.isSleeping); // true
alert(animal.isSleeping); // undefined (no such property in the prototype)
```

The resulting picture:

![](proto-animal-rabbit-walk-3.png)

If we had other objects like `bird`, `snake` etc inheriting from `animal`, they would also gain access to its methods. But `this` in each method would be the corresponding object, not `animal`.

In other words, methods are shared, but the state will be not.

## Summary [todo]
