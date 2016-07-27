

# Property descriptors

An object property is actually a more complex and tunable thing than just a "key-value" mapping.

There are two kinds of properties.

The first is *data properties*. All properties that we've seen yet are data properties.

Data properties have a `value` and three special attributes:

- **`writable`** -- if `true`, can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.

By default when a property is created, all attributes are `true`.

We can get the the information about an existing property using [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor):


```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( descriptor.value ); // John
alert( descriptor.writable ); // true
alert( descriptor.enumerable ); // true
alert( descriptor.configurable ); // true
```