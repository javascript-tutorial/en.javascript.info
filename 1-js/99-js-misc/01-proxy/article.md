
# Proxy and Reflect

A *proxy* wraps another object and intercepts operations, like reading/writing properties and others, optionally handling them on its own, or transparently allowing the object to handle them.

Proxies are used in many libraries and some browser frameworks. We'll see many practical applications in this chapter.

The syntax:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- is an object to wrap, can be anything, including functions.
- `handler` -- an object with "traps": methods that intercept operations., e.g. `get` for reading a property, `set` for writing a property, etc.

For operations on `proxy`, if there's a corresponding trap in `handler`, then it runs, and the proxy has a chance to handle it, otherwise the operation is performed on `target`.

As a starting example, let's create a proxy without any traps:

```js run
let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5; // writing to proxy (1)
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too (2)

for(let key in proxy) alert(key); // test, iteration works (3)
```

As there are no traps, all operations on `proxy` are forwarded to `target`.

1. A writing operation `proxy.test=` sets the value on `target`.
2. A reading operation `proxy.test` returns the value from `target`.
3. Iteration over `proxy` returns values from `target`.

As we can see, without any traps, `proxy` is a transparent wrapper around `target`.

![](proxy.png)  

The proxy is a special "exotic object". It doesn't have "own" properties. With an empty handler it transparently forwards operations to `target`.

If we want any magic, we should add traps.

There's a list of internal object operations in the [Proxy specification](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). A proxy can intercept any of these, we just need to add a handler method.

In the table below:
- **Internal Method** is the specification-specific name for the operation. For example, `[[Get]]` is the name of the internal, specification-only method of reading a property. The specification describes how this is done at the very lowest level.
- **Handler Method** is a method name that we should add to proxy `handler` to trap the operation and perform custom actions.


| Internal Method | Handler Method | Traps... |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | reading a property |
| `[[Set]]` | `set` | writing to a property |
| `[[HasProperty]]` | `has` | `in` operator |
| `[[Delete]]` | `deleteProperty` | `delete` operator |
| `[[Call]]` | `apply` | function call |
| `[[Construct]]` | `construct` | `new` operator |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys), [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), iteration keys |

```warn header="Invariants"
JavaScript enforces some invariants -- conditions that must be fulfilled by internal methods and traps.

Most of them are for return values:
- `[[Set]]` must return `true` if the value was written successfully, otherwise `false`.
- `[[Delete]]` must return `true` if the value was deleted successfully, otherwise `false`.
- ...and so on, we'll see more in examples below.

There are some other invariants, like:
- `[[GetPrototypeOf]]`, applied to the proxy object must return the same value as `[[GetPrototypeOf]]` applied to the proxy object's target object.

In other words, reading prototype of a `proxy` must always return the prototype of the target object. The `getPrototypeOf` trap may intercept this operation, but it must follow this rule, not do something crazy.

Invariants ensure correct and consistent behavior of language features. The full invariants list is in [the specification](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), you probably won't violate them, if not doing something weird.
```

Let's see how that works on practical examples.

## Default value with "get" trap

The most common traps are for reading/writing properties.

To intercept the reading, the `handler` should have a method `get(target, property, receiver)`.

It triggers when a property is read:

- `target` -- is the target object, the one passed as the first argument to `new Proxy`,
- `property` -- property name,
- `receiver` -- if the property is a getter, then `receiver` is the object that's going to be used as `this` in that code. Usually that's the `proxy` object itself (or an object that inherits from it, if we inherit from proxy).

Let's use `get` to implement default values for an object.

For instance, we'd like a numeric array to return `0` for non-existant values instead of `undefined`.

Let's wrap it into a proxy that traps reading and returns the default value if there's no such property:

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (no such value)
*/!*
```

The approach is generic. We can use `Proxy` to implement any logic for "default" values.

Imagine, we have a dictionary with phrases along with translations:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

Right now, if there's no phrase, reading from `dictionary` returns `undefined`. But in practice, leaving a phrase non-translated is usually better than `undefined`. So let's make a non-translated phrase the default value instead of `undefined`.

To achieve that, we'll wrap `dictionary` in a proxy that intercepts reading operations:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // intercept reading a property from dictionary
*/!*
    if (phrase in target) { // if we have it in the dictionary
      return target[phrase]; // return the translation
    } else {
      // otherwise, return the non-translated phrase
      return phrase;
    }
  }
});

// Look up arbitrary phrases in the dictionary!
// At worst, they are not translated.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)
*/!*
```

````smart header="Proxy should be used instead of `target` everywhere"
Please note how the proxy overwrites the variable:

```js
dictionary = new Proxy(dictionary, ...);
numbers = new Proxy(numbers, ...);
```

The proxy should totally replace the target object everywhere. No one should ever reference the target object after it got proxied. Otherwise it's easy to mess up.
````

## Validation with "set" trap

Now let's intercept writing as well.

Let's say we want a numeric array. If a value of another type is added, there should be an error.

The `set` trap triggers when a property is written: `set(target, property, value, receiver)`

- `target` -- is the target object, the one passed as the first argument to `new Proxy`,
- `property` -- property name,
- `value` -- property value,
- `receiver` -- same as in `get` trap, only matters if the property is a setter.

The `set` trap should return `true` if setting is successful, and `false` otherwise (leads to `TypeError`).

Let's use it to validate new values:

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // to intercept property writing
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1);
numbers.push(2);
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' on proxy returned false)
*/!*

alert("This line is never reached (error in the line above)");
```

Please note: the built-in functionality of arrays is still working! The `length` property auto-increases when values are added. Our proxy doesn't break anything.

Also, we don't have to override value-adding array methods like `push` and `unshift`, and so on! Internally, they use `[[Set]]` operation, that's intercepted by the proxy.

So the code is clean and concise.

```warn header="Don't forget to return `true`"
As said above, there are invariants to be held.

For `set`, it must return `true` for a successful write.

If it returns a falsy value (or doesn't return anything), that triggers `TypeError`.
```

## Protected properties with "deleteProperty" and "ownKeys"

There's a widespread convention that properties and methods prefixed by an underscore `_` are internal. They shouldn't be accessible from outside the object.

Technically, that's possible though:

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret  
```

Let's use proxies to prevent any access to properties starting with `_`.

We'll need the traps:
- `get` to throw an error when reading,
- `set` to throw an error when writing,
- `deleteProperty` to throw an error when deleting,
- `ownKeys` to skip properties starting with `_` when iterating over an object or using `Object.keys()`

Here's the code:

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // to intercept property writing
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
    }
  },
*!*
  deleteProperty(target, prop) { // to intercept property deletion
*/!*  
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // to intercept property list
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" doesn't allow to read _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" doesn't allow to write _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" doesn't allow to delete _password
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" filters out _password
for(let key in user) alert(key); // name
```

Please note the important detail in `get` trap, in the line `(*)`:

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

If an object method is called, such as `user.checkPassword()`, it must be able to access `_password`:

```js
user = {
  // ...
  checkPassword(value) {
    // object method must be able to read _password
    return value === this._password;
  }
}
```

Normally, `user.checkPassword()` call gets proxied `user` as `this` (the object before dot becomes `this`), so when it tries to access `this._password`, the property protection kicks in and throws an error. So we bind it to `target` in the line `(*)`. Then all operations from that function directly reference the object, without any property protection.

That solution is not ideal, as the method may pass the unproxied object somewhere else, and then we'll get messed up: where's the original object, and where's the proxied one.

As an object may be proxied multiple times (multiple proxies may add different "tweaks" to the object), weird bugs may follow.

So, for complex objects with methods such proxy shouldn't be used.

```smart header="Private properties of a class"
Modern JavaScript engines natively support private properties in classes, prefixed with `#`. They are described in the chapter <info:private-protected-properties-methods>. No proxies required.

Such properties have their own issues though. In particular, they are not inherited.
```


## "In range" with "has" trap

Let's say we have a range object:

```js
let range = {
  start: 1,
  end: 10
};
```

We'd like to use "in" operator to check that a number is in `range`.

The "has" trap intercepts "in" calls: `has(target, property)`

- `target` -- is the target object, passed as the first argument to `new Proxy`,
- `property` -- property name

Here's the demo:

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

A nice syntactic sugar, isn't it?

## Wrapping functions: "apply"

We can wrap a proxy around a function as well.

The `apply(target, thisArg, args)` trap handles calling a proxy as function:

- `target` is the target object,
- `thisArg` is the value of `this`.
- `args` is a list of arguments.

For example, let's recall `delay(f, ms)` decorator, that we did in the chapter <info:call-apply-decorators>.

In that chapter we did it without proxies. A call to `delay(f, ms)` would return a function that forwards all calls to `f` after `ms` milliseconds.

Here's the function-based implementation:

```js run
// no proxies, just a function wrapper
function delay(f, ms) {
  // return a wrapper that passes the call to f after the timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// now calls to sayHi will be delayed for 3 seconds
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)
```

As you can see, that mostly works. The wrapper function `(*)` performs the call after the timeout.

But a wrapper function does not forward property read/write operations or anything else. So if we have a property on the original function, we can't access it after wrapping:

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 (function length is the arguments count)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (wrapper has no arguments)
*/!*
```


`Proxy` is much more powerful, as it forwards everything to the target object.

Let's use `Proxy` instead of a wrapping function:

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target
*/!*

sayHi("John"); // Hello, John! (after 3 seconds)
```

The result is the same, but now not only calls, but all operations on the proxy are forwarded to the original function. So `sayHi.length` is returned correctly after the wrapping in the line `(*)`.

We've got a "richer" wrapper.

There exist other traps, but probably you've already got the idea.

## Reflect

The `Reflect` API was designed to work in tandem with `Proxy`.

For every internal object operation that can be trapped, there's a `Reflect` method. It has the same name and arguments as the trap, and can be used to forward the operation to an object.

For example:

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop} TO ${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // GET name
user.name = "Pete"; // SET name TO Pete
```

- `Reflect.get` gets the property, like `target[prop]` that we used before.
- `Reflect.set` sets the property, like `target[prop] = value`, and also ensures the correct return value.

In most cases, we can do the same thing without `Reflect`. But we may miss some peculiar aspects.

Consider the following example, it doesn't use `Reflect` and doesn't work right.

We have a proxied user object and inherit from it, then use a getter:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*)
  }
});


let admin = {
  __proto__: user,
  _name: "Admin"
};

*!*
// Expected: Admin
alert(admin.name); // Guest (?!?)
*/!*
```

As you can see, the result is incorrect! The `admin.name` is expected to be `"Admin"`, not `"Guest"`! Without the proxy, it would be `"Admin"`, looks like the proxying "broke" our object.

![](proxy-inherit.png)

Why this happens? That's easy to understand if we explore what's going on during the call in the last line of the code.

1. There's no `name` property in `admin`, so `admin.name` call goes to `admin` prototype.
2. The prototype is the proxy, so its `get` trap intercepts the attempt to read `name`.
3. In the line `(*)` it returns `target[prop]`, but what is the `target`?
    - The `target`, the first argument of `get`, is always the object passed to `new Proxy`, the original `user`.
    - So, `target[prop]` invokes the getter `name` with `this=target=user`.
    - Hence the result is `"Guest"`.

How to fix it? That's what the `receiver`, the third argument of `get` is for! It holds the correct `this`. We just need to call `Reflect.get` to pass it on.

Here's the correct variant:

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

user = new Proxy(user, {
  get(target, prop, receiver) {
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: user,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

Now the `receiver` holding the correct `this` is passed to getter by `Reflect.get` in the line `(*)`, so it works correctly.

We could also write the trap as:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```

`Reflect` calls are named exactly the same way as traps and accept the same arguments. They were specifically designed this way.

So, `return Reflect...` provides a safe no-brainer to forward the operation and make sure we don't forget anything related to that.

## Proxy limitations

Proxies are a great way to alter or tweak the behavior of the existing objects, including built-in ones, such as arrays.

Still, it's not perfect. There are limitations.

### Built-in objects: Internal slots

Many built-in objects, for example `Map`, `Set`, `Date`, `Promise` and others make use of so-called "internal slots".

These are like properties, but reserved for internal purposes. Built-in methods access them directly, not via `[[Get]]/[[Set]]` internal methods. So `Proxy` can't intercept that.

Who cares? They are internal anyway!

Well, here's the issue. After such built-in object gets proxied, the proxy doesn't have these internal slots, so built-in methods will fail.

For example:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Error
*/!*
```

An attempt to set a value into a proxied `Map` fails, for the reason related to its [internal implementation](https://tc39.es/ecma262/#sec-map.prototype.set).

Internally, a `Map` stores all data in its `[[MapData]]` internal slot. The proxy doesn't have such slot. The `set` method tries to access `this.[[MapData]]` internal property, but because `this=proxy`, can't find it in `proxy` and just fails.

Fortunately, there's a way to fix it:

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

Now it works fine, because `get` trap binds function properties, such as `map.set`, to the target object (`map`) itself.

Unlike the previous example, the value of `this` inside `proxy.set(...)` will be not `proxy`, but the original `map`. So when the internal implementation of `set` tries to access `this.[[MapData]]` internal slot, it succeeds.

```smart header="`Array` has no internal slots"
A notable exception: built-in `Array` doesn't use internal slots. That's for historical reasons, as it appeared so long ago.

So there's no such problem when proxying an array.
```

### Private fields

The similar thing happens with private class fields.

For example, `getName()` method accesses the private `#name` property and breaks after proxying:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Error
*/!*
```

The reason is that private fields are implemented using internal slots. JavaScript does not use `[[Get]]/[[Set]]` when accessing them.

In the call `user.getName()` the value of `this` is the proxied user, and it doesn't have the slot with private fields.

Once again, the solution with binding the method makes it work:

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

That said, the solution has drawbacks, explained previously: it exposes the original object to the method, potentially allowing it to be passed further and breaking other proxied functionality.

### Proxy != target

Proxy and the original object are different objects. That's natural, right?

So if we store the original object somewhere, and then proxy it, then things might break:

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

As we can see, after proxying we can't find `user` in the set `allUsers`, because the proxy is a different object.

```warn header="Proxies can't intercept a strict equality test `===`"
Proxies can intercept many operators, such as `new` (with `construct`), `in` (with `has`), `delete` (with `deleteProperty`) and so on.

But there's no way to intercept a strict equality test for objects. An object is strictly equal to itself only, and no other value.

So all operations and built-in classes that compare objects for equality will differentiate between the object and the proxy. No transparent replacement here.
```


## Revocable proxies

A *revocable* proxy is a proxy that can be disabled.

Let's say we have a resource, and would like to close access to it any moment.

What we can do is to wrap it into a revocable proxy, without any traps. Such proxy will forward operations to object, and we also get a special method to disable it.

The syntax is:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

The call returns an object with the `proxy` and `revoke` function to disable it.

Here's an example:

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error
```

A call to `revoke()` removes all internal references to the target object from the proxy, so they are no more connected. The target object can be garbage-collected after that.

We can also store `revoke` in a `WeakMap`, to be able to easily find it by the proxy:


```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..later in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revoked)
```

The benefit of such approach is that we don't have to carry `revoke` around. We can get it from the map by `proxy` when needeed.

Using `WeakMap` instead of `Map` here, because it should not block garbage collection. If a proxy object becomes "unreachable" (e.g. no variable references it any more), `WeakMap` allows it to be wiped from memory (we don't need its revoke in that case).

## References

- Specification: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Summary

`Proxy` is a wrapper around an object, that forwards operations to the object, optionally trapping some of them.

It can wrap any kind of object, including classes and functions.

The syntax is:

```js
let proxy = new Proxy(target, {
  /* traps */
});
```

...Then we should use `proxy` everywhere instead of `target`. A proxy doesn't have its own properties or methods. It traps an operation if the trap is provided or forwards it to `target` object.

We can trap:
- Reading (`get`), writing (`set`), deleting (`deleteProperty`) a property (even a non-existing one).
- Calling functions with `new` (`construct` trap) and without `new` (`apply` trap)
- Many other operations (the full list is at the beginning of the article and in the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).

That allows us to create "virtual" properties and methods, implement default values, observable objects, function decorators and so much more.

We can also wrap an object multiple times in different proxies, decorating it with various aspects of functionality.

The [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) API is designed to complement [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). For any `Proxy` trap, there's a `Reflect` call with same arguments. We should use those to forward calls to target objects.

Proxies have some limitations:

- Built-in objects have "internal slots", access to those can't be proxied. See the workaround above.
- The same holds true for private class fields, as they are internally implemented using slots. So proxied method calls must have the target object as `this` to access them.
- Object equality tests `===` can't be intercepted.
- Performance: benchmarks depend on an engine, but generally accessing a property using a simplest proxy takes a few times longer. In practice that only matters for some "bottleneck" objects though.
