
# Function object, NFE

As we already know, functions in Javascript are values.

Every value in Javascript has the type. What type of value is a function?

In Javascript, a function is an object. 

From one side, they are callable "actions". From the other side, we can treat them as objects: add/remove properties, pass by reference etc.


## The "name" property

A function name is accessible as the "name" property.

For Function Declarations, it's obvious:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

But what's more funny, the name-assigning logic is smart. It also sticks the right name to function that are used in assignments:

```js run
let sayHi = function() {
  alert("Hi");
}

alert(sayHi.name); // sayHi (works!)
```

Also here, as a default parameter:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (works!)
}

f(); 
```

In the specification, this is called a "contextual name". The function itself does not provide one, but in an assignment it's easy to figure out from context.

Object methods have names too:

```js run
let user = {
  
  sayHi() { 
    // ...
  },

  sayBye: function() { 
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

There's no magic though. In other cases, when there's no way to figure out the right name, it's empty, like here:

```js
// function created inside array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none
```

In practice, most functions do have a name. It's mostly used for debugging and checking.

## The "length" property

There is another built-in property "length" that returns the number of function parameters, for instance:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Here we can see that rest parameters are not counted.

The `length` property is sometimes used for introspection: what kind of function we have?

For instance, in the code below `ask` function accepts `question` to ask and an arbitrary number of `handler` functions to call.

Each handler may be either a zero-argument function, then it is only called for a positive answer, or a single(or more)-argument function, then it is called with any answer as an argument.

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    } 
  }
  
}

// for positive answer, both handlers are called
// for negative answer, only the second one
ask("Question?", () => alert('You said yes'), result => alert(result));
```

This is a particular case of [polymorphism](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) -- treating arguments differently depending on their type -- or, in our case of their `length`.

## Custom properties

We can also add properties of our own.

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
A property assigned to a function like `sayHi.counter = 0` does *not* define a local variable `counter` inside it. In other words, a property `counter` and a variable `let counter` are two unrelated things.

We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables never use function properties and vise versa. These are just parallel words.
```

Also we can rewrite the counter example from the chapter <info:closure> to use function property instead of the closure:

```js run
function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++; 
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

Unlike the closures, the `count` is now bound to the function directly, not to its outer Lexical Environment.

Is it worse or better than using the closure?

The main difference is that if the value of `count` lives in an outer variable, then an external code is unable to access it. Only the nested function may modify it. And if it's bound to function, then such thing is possible:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Sometimes such possibility can be a plus, but usually we want more control over `count`, and hence the closure is more often used.

## Named Function Expression

Compare these two function definitions:

```js
let sayHi = function() { // (1)
  alert('Hello');
};

let sayHi = function *!*func*/!*() { // (2)
  alert('Hello');
};
```

Both create a function and put it into the variable `sayHi`. And usually we use the first variant is fine.

But if we specify a name right in the Function Expression (2), then it becomes an "internal function name", only visible from inside the function.

Let's see why we may need it.

As we've seen it's easy to copy a function and maybe replace the previous value with something else:

```js run
let sayHi = function() {
  alert('Hello');
};

// oh maybe another word is better? replace it!
let oldSayHi = sayHi; // keep the old variant here
sayHi = function() { //  replace with a newer one
  alert("What's up dude?");
};


oldSayHi(); // Hello 
sayHi(); // What's up dude?
```

The problem may occur if a function references *itself* from inside. It happens when the function wants to access its properties (`sayHi.counter` in the example above), or it wants to recursively call itself one more time.

But if the function has moved, then the old name becomes irrelevant! There will be an error.

Here's the code:

```js run
// create a function
let sayHi = function() {
  sayHi.counter++;
  alert('Hi ' + sayHi.counter);
};
sayHi.counter = 0; 

// move it 
let movedSayHi = sayHi;

// overwrite the old name to make things more obvious
sayHi = null;

*!*
movedSayHi(); // Error: Cannot read property 'counter' of null
*/!*
```

The optional name which we can put into the Function Expression is exactly meant to solve this kind of problems.

- It is only visible from inside the function.
- It always references the current function.

Let's use it to fix the code:

```js run
// now with the internal name "say"
let sayHi = function *!*say*/!*() {
  *!*say*/!*.counter++; 
  alert('Hi ' + *!*say*/!*.counter); // and use it everywhere inside
};
sayHi.counter = 0; 

let movedSayHi = sayHi;

sayHi = null;

movedSayHi(); // Hi 1
movedSayHi(); // Hi 2 (works)

alert(say); // Error (say is undefined, that's normal)
```

Please note that:

- The name `say` exists only inside the function. The last line demonstrates that.
- The name `say` inside the function is always the current function, no matter in which variable it is. That's why it works.

So the outer code has it's variable `sayHi` or `movedSayHi` later to call the function. The `say` is an "internal function name", how it calls itself privately.

A Function Expression with a name is called *Named Function Expression*, often abbreviated as NFE.

The "internal name" feature described here is only available for Function Expressions, not to Function Declarations. For Function Declarations, there's just no syntax possibility to add a one more "internal" name for them. 

Sometimes, when we need a reliable internal name, it's the reason to rewrite a Function Declaration to Named Function Expression form.

## Summary

Functions are objects.

Here we covered their properties:

- `name` -- the function name. Exists not only when given in the function definition, but also for assignments and object properties.
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known Javascript libraries make a great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jquery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`. And then adds `_.clone`, `_.keyBy` and other properties to (see the [docs](https://lodash.com/docs) when you want learn more about them). Actually, they do it to less pollute the global space, so that a single library gives only one global variable. That lowers the chance of possible naming conflicts.

So, a function can do a useful job by itself and also carry a bunch of other functionality in properties.

