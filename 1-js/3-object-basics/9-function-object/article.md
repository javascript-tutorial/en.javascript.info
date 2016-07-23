
# Function object

Functions in Javascript are two-faced. From one side they are callable "actions". From the other side, they are objects. 

We can add/remove properties to them, and they have some useful properties of their own.

## Properties "name" and "length"

For Function Declarations, it's obvious:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

But what's more funny, the "name"-assigning logic is smart. It also recognizes functions, assigned to variables or provided as object methods:

```js run
let sayHi = function() {
  alert("Hi");
}

alert(sayHi.name); // sayHi (works!)
```

```js run
let user = {
  
  sayHi() { // works
    // ...
  },

  sayBye: function() { // works too
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

In other cases, the name is empty, like here:

```js
let arr = [function() {}];

alert( arr[0].name ); // ""
```

In practice, most functions do have a name. It's mostly used for debugging, or, sometimes, 

## Builtin "name" and "length"

Function objects have 

We already know that functions in Javascript are objects
Every value in Javascript has the type. What type of value is a function?

In Javascript, a function is an object. 

NOT ALL !!! (some inherit?)

For example, all functions have property `name` (function name) and `length` (number of arguments):

```js run
function sayHi() {
  alert("Hi");
}

alert( sayHi.name ); // sayHi
alert( sayHi.length ); // 0
```



## Custom properties

Using a function as an object is nothing special.

Here we add the `counter` property to track the total calls count:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // let's count how many times we run
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // initial value

sayHi(); // Hi 
sayHi(); // Hi 

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```


```warn header="A property is not a variable"
A property assigned to a function like `sayHi.counter = 0` does *not* define a local variable `counter` inside it. In other words, a property `sayHi.counter` and `let counter` inside the function (if we have it) are two unrelated things.

We can treat a function as an object for convenience, store properties in it, that has no effect on its execution.
```

There are many well-known Javascript libraries that make a great use of custom function properties. 

They create a "main" function and attach many other "helper" functions to it. For instance, the [jquery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`. And then adds `_.clone`, `_.keyBy` and other properties to (see the [docs](https://lodash.com/docs) when you want learn more about them). 

So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.
