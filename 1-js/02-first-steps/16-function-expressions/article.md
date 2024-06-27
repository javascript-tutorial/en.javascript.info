# Function expressions

In JavaScript, functions are treated as values. This means you can assign them to variables, pass them as arguments to other functions, and even return them from functions.

The syntax that we used in previous chapter is called a **Function Declaration**:

```js
function sayHi() {
  alert( "Hello" );
}
```

There is another syntax for creating a function that is called a **Function Expression**.

In JavaScript, a Function Expression is a way to create a function within an expression, typically as part of an assignment.

For example:

```js
let sayHi = function() {
  alert( "Hello" );
};
```

In this example:

- `sayHi` is a variable.
- It is assigned a function created using `function() { alert("Hello"); }`.
- This type of function creation is known as a *Function Expression* because it happens in the context of an assignment.

**No Name Required**

Unlike Function Declarations, which always have a name (`function sayHi() { ... }`), Function Expressions can be anonymous. Here, there's no name immediately following the `function` keyword.In function Expression name can be omitted.


**Practical Use**

- When you want to assign a function to a variable.
- In scenarios where the function doesn't need a name right away.
- For creating functions dynamically at runtime.

**Advanced Usage**

In more advanced cases that we will see later :

- Functions created by expressions can be immediately invoked or passed around as arguments to other functions.
- They can be used for callback functions or to encapsulate functionality in a more concise form.

## Function is a value

Let's reiterate: no matter how the function is created, a function is a value. Both examples above store a function in the `sayHi` variable. In the first example it is done automatically and in second example you do it manully by assigning the function to `sayHi` variable.

We can even print out that value using `alert`:

```js run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Please note that the last line does not run the function, because there are no parentheses after `sayHi`. There are programming languages where any mention of a function name causes its execution, but JavaScript is not like that.

In JavaScript, a function is a value, so we can deal with it as a value. The code above shows the string representation of the function.

Surely, a function is a special value, in the sense that we can call it using `sayHi();` in our example. But, it's still a value. So we can work with it like any other value.

**Assigning Functions to Variable:**

```js run no-beautify
function sayHi() {   // (1) create
  alert( "Hello" );
}

let func = sayHi;    // (2) copy

func(); // Hello     // (3) run the copy (it works)!
sayHi(); // Hello    //     this still works too (why wouldn't it)
```

Here's what happens above in detail:

1. The Function Declaration `(1)` creates the function and puts it into the variable named `sayHi`.
2. `(2)` copies it into the variable `func`. Please note again: there are no parentheses after `sayHi`. If there were, then `func = sayHi()` would write  *the result of the call* `sayHi()` into `func`, not *the function* `sayHi` itself.
3. Now the function can be called as both `sayHi()` and `func()`.

We could also have used a Function Expression to declare `sayHi`, in the first line:

```js
let sayHi = function() { // (1) create
  alert( "Hello" );
};

let func = sayHi;
// ...
```

Everything would work the same.


````smart header="Why is there a semicolon at the end?"
You might wonder, why do *Function Expressions* have a semicolon `;` at the end, but Function Declarations do not:

```js
function sayHi() {
  // ...
}

let sayHi = function() {
  // ...
}*!*;*/!*
```

The answer is simple: A function do not need a semicolon at the end but a assignment statement needs one. The semicolon in *function Expression* syntax is not a part of function but the assignment statement.

The semicolon would be there for a simple assignments, such as `let sayHi = 5;`, and it's also there for a function assignment.
````

## Callback functions

In JavaScript, a callback function is a function that is passed as an argument to another function. The callback function is then invoked (called back) inside the outer function to complete some kind of routine or action.

We'll write a function `ask(question, yes, no)` with three parameters:

`question`
: Text of the question

`yes`
: Function to run if the answer is "Yes"

`no`
: Function to run if the answer is "No"

The function should ask the `question` and, depending on the user's answer, call `yes()` or `no()`:

```js run
*!*
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/!*

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

In practice, such functions are quite useful. The major difference between a real-life `ask` and the example above is that real-life functions use more complex ways to interact with the user than a simple `confirm`. In the browser, such functions usually draw a nice-looking question window. But that's another story.

The functions `showOk` and `showCancel` that are passed to `ask` as argumnets are called **callback functions** or just **callbacks**.

The concept of callback functions revolves around passing a function as an argument and anticipating its invocation ('calling back') later as needed. In our example, `showOk` serves as the callback when the user answers 'yes', while `showCancel` is invoked when the answer is 'no'.

We can use Function Expressions to write an equivalent, shorter function:

```js run no-beautify
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

*!*
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
*/!*
```

Here, functions are declared right inside the `ask(...)` call. They have no name, and so are called **anonymous**. Such functions are not accessible outside of `ask` (because they are not assigned to variables), but that's just what we want here.

Such code appears in our scripts very naturally, it's in the spirit of JavaScript.

```smart header="A function is a value representing an \"action\""
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

We can pass it between variables and run when we want.
```


## Function Expression vs Function Declaration

Let's formulate the key differences between Function Declarations and Expressions.

#### Syntax Differences:

First, lets see how they differntiate in syntax

- *Function Declaration:* a function, declared as a separate statement, in the main code flow:

    ```js
    // Function Declaration
    function sum(a, b) {
      return a + b;
    }
    ```
- *Function Expression:* a function, created inside an expression or inside another syntax construct. Here, the function is created on the right side of the "assignment expression" `=`:

    ```js
    // Function Expression
    let sum = function(a, b) {
      return a + b;
    };
    ```

#### Creation Time and Visibility

- A Function Expression is created when the execution reaches it and is usable only from that moment.
  Once the execution flow passes to the right side of the assignment `let sum = function…` , the function is created and can be used (assigned, called, etc. ) from now on.
<br>

- A Function Declaration can be called earlier than it is defined.That's due to internal algorithms. When JavaScript prepares to run the script, it first looks for global Function Declarations in it and creates those functions. We can think of it as an "initialization stage".
  After all Function Declarations are processed, rest of the code is executed. So it has access to these functions.
  That's why a global Function Declaration is visible in the whole script, no matter where it is.

For example, this works:

```js run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

The Function Declaration above creates the function `sayHi` when JavaScript is preparing to start the script and therefore it is visible everywhere in the script.

...If it were a Function Expression, then it wouldn't work: Because we would be using the function before it is created, like below.

```js run refresh untrusted
*!*
sayHi("John"); // error!
*/!*

let sayHi = function(name) {  // (*) no magic any more
  alert( `Hello, ${name}` );
};
```

#### Scope Considerations

**Note:-** In simple words **Hoisting** means you can use a variable or function anywhere in the code block or script, it doesn't mattter where the variable or function is defined in that code block or script.  

##### Function Declarations
 1. Strict Mode:
    - Function Declarations are hoisted to the top of their scope during script initialization, meaning they are processed before any code is executed.
    - They are accessible globally or functionally depending on where they are defined. This means they can be called from anywhere within their scope, whether it's the entire script or a specific function.
    - Function Declarations inside blocks are block-scoped, which restricts their visibility to only the block in which they are defined.
<br>
2. Non-Strict Mode:
    - Function Declarations behave similarly to strict mode regarding hoisting and accessibility.
    - They are hoisted to the top of their scope during script initialization and can be accessed globally or functionally.
    - Unlike strict mode, Function Declarations inside blocks are not block-scoped. Instead, they behave as if they were declared at the top level of their containing function or script, potentially affecting the overall scope management.

##### Function Expression
1. Strict Mode and Non-Strict Mode:
    - Function Expressions are not hoisted like Function Declarations. They are treated as assignments and are only accessible after they have been assigned a value during runtime.
    - They are scoped to the enclosing function or block where they are defined. This encapsulation allows for better control over where the function can be accessed and used.
    - Function Expressions are particularly useful for conditional declarations and scenarios where you need to limit the scope of a function based on runtime conditions, enhancing code modularity and maintainability.
In strict mode, when a Function Declaration is within a code block, it's visible everywhere inside that block. But not outside of it.

For instance, let's imagine that we need to declare a function `welcome()` depending on the `age` variable that we get during runtime. And then we plan to use it some time later.

If we use Function Declaration, it won't work as intended:

```js run
let age = prompt("What is your age?", 18);

// conditionally declare a function
if (age < 18) {

  function welcome() {
    alert("Hello!");
  }

} else {

  function welcome() {
    alert("Greetings!");
  }

}

// ...use it later
*!*
welcome(); // Error: welcome is not defined
*/!*
```

That's because a Function Declaration is only visible inside the code block in which it resides.

Here's another example:

```js run
let age = 16; // take 16 as an example

if (age < 18) {
*!*
  welcome();               // \   (runs)
*/!*
                           //  |
  function welcome() {     //  |
    alert("Hello!");       //  |  Function Declaration is available
  }                        //  |  everywhere in the block where it's declared
                           //  |
*!*
  welcome();               // /   (runs)
*/!*

} else {

  function welcome() {
    alert("Greetings!");
  }
}

// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.

*!*
welcome(); // Error: welcome is not defined
*/!*
```

What can we do to make `welcome` visible outside of `if`?

The correct approach would be to use a Function Expression and assign `welcome` to the variable that is declared outside of `if` and has the proper visibility.

This code works as intended:

```js run
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

  welcome = function() {
    alert("Hello!");
  };

} else {

  welcome = function() {
    alert("Greetings!");
  };

}

*!*
welcome(); // ok now
*/!*
```

Or we could simplify it even further using a question mark operator `?`:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  function() { alert("Hello!"); } :
  function() { alert("Greetings!"); };

*!*
welcome(); // ok now
*/!*
```


```smart header="When to choose Function Declaration versus Function Expression?"
As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration syntax. It gives more freedom in how to organize our code, because we can call such functions before they are declared.

That's also better for readability, as it's easier to look up `function f(…) {…}` in the code than `let f = function(…) {…};`. Function Declarations are more "eye-catching".

...But if a Function Declaration does not suit us for some reason, or we need a conditional declaration (we've just seen an example), then Function Expression should be used.
```

## Summary

- Functions are values. They can be assigned, copied or declared in any place of the code.
- If the function is declared as a separate statement in the main code flow, that's called a "Function Declaration".
- If the function is created as a part of an expression, it's called a "Function Expression".
- Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
- Function Expressions are created when the execution flow reaches them.

In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.

So we should use a Function Expression only when a Function Declaration is not fit for the task. We've seen a couple of examples of that in this chapter, and will see more in the future.
