
# Property getters and setters

There are two kinds of properties.

The first kind is *data properties*. We already know how to work with them. All properties that we've been using till now were data properties.

The second type of properties is something new. It's *accessor properties*. They are essentially functions that work on getting and setting a value, but look like regular properties to an external code.

## Getters and setters

Accessor properties are represented by "getter" and "setter" methods. In an object literal they are denoted by `get` and `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // getter, the code executed on getting obj.propName
  },

  *!*set propName(value)*/!* {
    // setter, the code executed on setting obj.propName = value
  }
};
```

The getter works when `obj.propName` is read, the setter -- when it is assigned.

For instance, we have a `user` object with `name` and `surname`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

Now we want to add a "fullName" property, that should be "John Smith". Of course, we don't want to copy-paste existing information, so we can implement it as an accessor:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

From outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't *call* `user.fullName` as a function, we *read* it normally: the getter runs behind the scenes.

As of now, `fullName` has only a getter. If we attempt to assign `user.fullName=`, there will be an error.

Let's fix it by adding a setter for `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName is executed with the given value.
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

As the result, we have a "virtual" property `fullName`. It is readable and writable, but in fact does not exist.

```smart header="Accessor properties are only accessible with get/set"
Once a property is defined with `get prop()` or `set prop()`, it's an accessor property, not a data property any more.

- If there's a getter -- we can read `object.prop`, otherwise we can't.
- If there's a setter -- we can set `object.prop=...`, otherwise we can't.

And in either case we can't `delete` an accessor property.
```


## Accessor descriptors

Descriptors for accessor properties are different -- as compared with data properties.

For accessor properties, there is no `value` and `writable`, but instead there are `get` and `set` functions.

So an accessor descriptor may have:

- **`get`** -- a function without arguments, that works when a property is read,
- **`set`** -- a function with one argument, that is called when the property is set,
- **`enumerable`** -- same as for data properties,
- **`configurable`** -- same as for data properties.

For instance, to create an accessor `fullName` with `defineProperty`, we can pass a descriptor with `get` and `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Please note once again that a property can be either an accessor or a data property, not both.

If we try to supply both `get` and `value` in the same descriptor, there will be an error:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Smarter getters/setters

Getters/setters can be used as wrappers over "real" property values to gain more control over them.

For instance, if we want to forbid too short names for `user`, we can store `name` in a special property `_name`. And filter assignments in the setter:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Name is too short...
```

Technically, the external code may still access the name directly by using `user._name`. But there is a widely known agreement that properties starting with an underscore `"_"` are internal and should not be touched from outside the object.


## Using for compatibility

One of the great ideas behind getters and setters -- they allow to take control over a "regular" data property at any moment by replacing it with getter and setter and tweak its behavior.

Let's say we started implementing user objects using data properties `name` and `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...But sooner or later, things may change. Instead of `age` we may decide to store `birthday`, because it's more precise and convenient:

```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Now what to do with the old code that still uses `age` property?

We can try to find all such places and fix them, but that takes time and can be hard to do if that code is written/used by many other people. And besides, `age` is a nice thing to have in `user`, right? In some places it's just what we want.

Adding a getter for `age` solves the problem:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

Now the old code works too and we've got a nice additional property.
