
# Property getters and setters [todo move to objects?]

There are two kinds of properties.

The first kind is *data properties*. We already know how to work with them, actually, all properties that we've been using yet are data properties.

The second type of properties is something new. It's *accessor properties*. They are essentially functions that work on getting and setting a value, but look like regular properties.

[cut]

## Getters and setters

Accessor properties are represented by "getter" and "setter" methods. In an object literal they are preprended with words `get` and `set`:

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

From outside, an accessor property looks like a regular one. That's the idea of accessor properties. We don't call `user.fullName` as a function, we read it normally, and it runs behind the scenes.

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

Now we have a "virtual" property. It is readable and writable, but in fact does not exist. 

```smart
We can either work with a property as a "data property" or as an "accessor property", these two never mix.

Once a property as defined with `get prop()`, it can't be assigned with `obj.prop=`, unless there's a setter too.

And if a property is defined with `set prop()`, then it can't be read unless there's also a getter.
```


## Accessor descriptors

Differences between data properties and accessors are also reflected in their descriptors.

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

for(let key in user) alert(key); 
```

## Smarter getters/setters

A combination of getter/setter can be used to validate property values at the moment of assignment.

For instance, if we want to forbid too short names for `user`, we can store `name` in a special property `_name`, at the same time providing smart getter/setter for it:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      throw new Error("Name is too short, need at least 4 characters");
    }
    this._name = value;
  }
};

user.name = "Pete"; 
alert(user.name); // Pete

user.name = ""; // Error
```

Technically, the "real" name is stored in `user._name`, so the outer code may access it. In Javascript there's no way to prevent reading an object property. But there is a widely known agreement that properties starting with an underscore `"_"` are internal and should not be touched from outside.


## For compatibility

One of great ideas behind getters and setters -- they allow to take control over a property at any moment.

For instance, we start implementing user objects using data properties `name` and `age`:

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

Now what to do with the old code that still uses `age`?

We can try to find all such places and fix them, but that takes time and not always possible with 3rd party libraries. And besides, `age` is a nice thing to have in `user`, right? In some places it's just what we want.

Adding a getter for `age` mitigates the problem:

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


