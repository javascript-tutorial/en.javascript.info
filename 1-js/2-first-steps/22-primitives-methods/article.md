# Methods of primitives

In this section we'll see how JavaScript allows to work with primitives (strings, numbers etc) as if they were objects. They have methods and such.

Actually, most things in Javascript behave as objects. Of course primitives are not objects (and here we plan to make it even more clear), but can be used like them.

Let's formulate the definitive distinction between primitives and objects.

A primitive
: Is a value of a primitive type. There are 6 primitive types: `string`, `number`, `boolean`, `symbol`, `null` and `undefined`.

An object
: Is capable of storing multiple values as properties. 
Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript, e.g. functions are objects.

One of the best thing about objects is that we can store a function as one of properties:

```js run
let john = { 
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

So, here we've made an object `john` with the method `sayHi`.

There exist many built-in objects, including those that work with dates, errors, HTML elements etc. They have different properties and methods.

But features come at a price!

Objects are "heavier" than primitives. They require additional resources to support the internal property-managing machinery. But properties and methods are useful in programming, and engines try to optimize that, so the price is usually fair.

## A primitive as an object

Here's the paradox faced by the creator of JavaScript:

- There are many things one would want to do with a string or a number, could be great to access them as methods.
- Primitives must store a single value, be as fast and lightweight as possible.

The solution looks a little bit awkward, but here it is.

1. Primitives are still primitive. A single value, as discussed.
2. The language allows to access methods and properties of strings, numbers, booleans and symbols.
3. When it happens, a special "object wrapper" is created that provides the functionality and then is destroyed. 

The "object wrappers" are different for each primitive type and are named specifically: `String`, `Number`, `Boolean` and `Symbol`. Thus they provide different sets of methods.

For instance, there exists a method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns the capitalized string.

Here's how it works:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, right? And here's what actually happens in `str.toUpperCase()`:

1. The string `str` is a primitive. So in the moment of accessing its property a special object is created that both knows the value of the string and has useful methods, like `toUpperCase()`.
2. That method runs and returns a new string (shown by `alert`).
3. The special object is destroyed, leaving the primitive `str` alone.

So, primitives can provide methods, but they still remain lightweight.

Of course, the JavaScript engine highly optimizes that process. Internally it may skip the creation of the extra object at all, so it's not so costly performance-wise.

A number has methods of it's own, for instance, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to the given precision:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

We'll see more specific methods in next chapters. 

````warn header="null/undefined have no methods"
Special types `null` and `undefined` are exceptions. They have no corresponding "wrapper objects" and provide no methods. In a sense, they are "the most primitive".

An attempt to access a property of such value would give an error:

```js run
alert(null.test); // error
````

## Summary

- Primitives except `null` and `undefined` provide many helpful methods. We plan to study those in the next chapters.
- Formally, these methods work via temporary objects, but JavaScript engines are tuned to optimize that internally, so they are not expensive to call.

