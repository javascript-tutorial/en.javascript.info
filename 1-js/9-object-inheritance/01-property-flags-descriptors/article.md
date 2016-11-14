
# Property flags and descriptors [todo move to objects?]

Now as we know how to work with primitives and several concrete object-based types, let's return to objects in general.

As we know, objects can store properties.

But an object property is actually more complex thing than just a "key-value" mapping.

[cut]

## Property flags

Object properties, besides a **`value`**, have three special attributes (so-called "flags"):

- **`writable`** -- if `true`, can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.

We didn't see them yet, because by default they are concealed. When we create a property "the usual way", all of them are `true`. But we also can change them any time.

First, let's see how to read the flags. 

The method [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) allows to query the information about a property.

The syntax is:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: The object to get information about.

`propertyName`
: The name of the property of interest.

The returned value is a so-called "property descriptor" object: it contains the value and all the flags.

For instance:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
 */
```

Now, we'll use [Object.defineProperty](mdn:js/Object/defineProperty) to change flags.

The syntax is:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: The object and property to work on.

`descriptor`
: Property descriptor to apply.

If the property exist, it update its flags.

Otherwise, it creates the property with the provided value and flags. Please note, that if a flag is not supplied, it is assumed `false`.

For instance, here a property `name` is created with all falsy flags:

```js run
let user = {};

Object.defineProperty(user, "name", {
  value: "John"
});

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* compare it with "normally created" user.name above:
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
``` 

Now let's see effects of the flags by example.

## Read-only

Let's make `user.name` read-only by changing `writable` flag:

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
user.name = "Pete"; // Error: Cannot assign to read only property 'name'...
*/!*
```

Now no one can change the name of our user, unless he applies his own `defineProperty` to override ours.

Here's the same operation, but for the case when a property doesn't exist:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // for new properties need to explicitly list what's true
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Pete
user.name = "Alice"; // Error
```


## Non-enumerable

Now let's a custom `toString` to `user`. 

Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. So we'll make ours behave the same.

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// By default, both our properties are listed:
for(let key in user) alert(key); // name, toString

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Now toString disappears:
*/!*
for(let key in user) alert(key); // name
```

Non-enumerable properties are also excluded from `Object.keys`. 

## Non-configurable

Non-configurable flag is often preset for built-in objects and properties.

A non-configurable property can not be deleted or altered with `defineProperty`.

For instance, `Math.PI` is both read-only, non-enumerable and non-configurable:

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
So, a programmer is unable to change the value of that built-in constant or overwrite it.

```js run
Math.PI = 3; // Error

// delete Math.PI won't work either
```

Making non-configurable is one-way road. We cannot change it back, because `defineProperty` doesn't work on non-configurable properties.

Here `user.name` is a forever sealed constant:

```js run
let user = { };

Object.defineProperty(user, "name", {
  value: "John",
  writable: false,
  configurable: false
});

*!*
// can't change it or its flags
// user.name = "Pete" won't work
// delete user.name won't work
// defineProperty won't work either:
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

```smart header="Errors appear only in use strict"
In non-strict mode, there are no errors for writing to read-only properties and such, flag-violating actions are silently ignored.
```

## Many properties at once

There's a method [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) that allows to define many properties at once:

```js
Object.defineProperties(user, {
  name: { writable: false },
  surname: { ... },
  // ...
});
```

And, to get all descriptors, use [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Together they can be used as an "property flags-aware" way of cloning an object:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

(For the clone to be fully identical, we need to care about one more thing: "prototype", we'll see into it soon in the chapter [todo])

## Sealing an object globally

Property descriptors allow to forbid modifications of individual properties.

There are also methods that limit access to the whole object:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
: Forbids to add properties to the object.

[Object.seal(obj)](mdn:js/Object/seal)
: Forbids to add/remove properties, sets for all existing properties `configurable: false`.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Forbids to add/remove/change properties, sets for all existing properties `configurable: false, writable: false`.

And the tests for them:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.

These methods are rarely used in practice.




## Tasks

Check: new property has all non-enum, test