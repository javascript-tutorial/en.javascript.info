# Primitives as objects

As we know from the chapter <info:types>, there are 7 data types in JavaScript:

- Six primitive types: `string`, `number`, `boolean`, `symbol`, `null` and `undefined`.
- One `object` type for anything else.

In this section we'll see how JavaScript allows to work with primitives as if they were objects. This ability may even lead to opinions like 'everything in JavaScript behaves as an object'. Of course in fact it's not so. And here we plan to make it clear.

Let's formulate the definitive distinction between primitives and objects.

A primitive
: Is a single value. Like a number `123`. Or a string `"Hello"`. 

An object
: Is capable of storing multiple values as properties. 
An empty object: `{}`. An object with two properties: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript too, we'll study them later.

One of the best thing about objects is that they are not just a "collection of values". We can store a function as one of properties:

```js run
let john = { 
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

That's very convenient in practice. 

There are many kinds of objects, including those that work with dates, errors, HTML elements etc. They have different properties and methods.

But features come at a price. Objects are "heavier" than primitives. They require additional resources for the machinery. But accessing properties and methods looks good. We can easily create methods of our own.

## A primitive as an object

So here's the paradox faced by the creator of JavaScript:

- There are many things one would want to do with a string or a number, could be great to access them as methods.
- Primitives must store a single value, be as fast and lightweight as possible.

The solution looks a little bit awkward, but here it is.

1. Primitives are still primitive. A single value, as discussed.
2. The language allows to access methods and properties of strings, numbers, booleans and symbols.
3. When it happens, a special "object wrapper" is created that provides the functionality and then is destroyed. 

The "object wrappers" are different for each primitive type and are named specifically: `String`, `Number`, `Boolean` and `Symbol`. Thus they provide different sets of methods.

For instance, let's consider the method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns the capitalized string.

Here's how it works:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, right? And here's what actually happens in `str.toUpperCase()`:

1. The string `str` is a primitive. So in the moment of accessing it's property a special object is created that both knows the value of the string and has useful methods, like `toUpperCase()`.
2. That method runs and returns a new string (shown by `alert`).
3. The special object disappears, leaving the primitive `str` alone.

So, primitives can provide methods, but they still remain lightweight.

Of course, the JavaScript engine highly optimizes that process. Internally it may skip the creation of the extra object at all, so it's not so costly performance-wise.

A number has methods of it's own, for instance, [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to the given precision:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

We'll see more into specific methods in next chapters.

Now please ensure that you really grasped that by solving the first task in this chapter (below). 


````warn header="null/undefined have no methods"
Special types `null` and `undefined` are exceptions. They have no corresponding "wrapper objects" and provide no methods. In a sense, they are "the most primitive".

An attempt to access a property of such value would give an error:

```js run
alert(null.test); // error
````

## Summary

- Primitives except `null` and `undefined` provide various methods. We plan to study those in the next sections.
- Still, primitives are not objects. Formally, methods work via temporary objects that are created "just for the call". The JavaScript engines are tuned to optimize that internally, so it's not expensive at all.

Further we'll get back to data structures and study methods in more detail. 
