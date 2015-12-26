
## Named Function Expression

Named Function Expression or, shortly, NFE, is a term a Function Expression that has a name.

For instance, let's take an ordinary Function Expression:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

...And add a name to it:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

What's the role of that additional `"func"` name?

First let's note, that we're still having a Function Expression. Adding the name `"func"` after `function` did not make it a Function Declaration, because it is still created as a part of an assignment expression.

Adding such a name also did not break anything. 

The function is still available as `sayHi()`:

```js
//+ run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

There are two special things about the name `func`:
<ol>
<li>It allows to reference the function from inside itself.</li>
<li>It is not visible outside of the function.</li>
</ol>

For instance, the function `sayHi` below re-calls itself with `"Guest"` if no `who` is provided:

```js
//+ run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // use func to re-call itself
*/!* 
  }
};

sayHi(); // Hello, Guest

// But this won't work: 
func(); // Error, func is not defined (not visible outside of the function)
```

Later we'll see more cases when a function wants to re-call itself with modified parameters.

So, why won't we use `sayHi` for the nested call?

Actually, in most cases we can:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!* 
  }
};
```

The problem with the latter code is that the value of `sayHi` may change. The function may go to another variable:

```js
//+ run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // (*)
*/!* 
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (still works under different name)
```

Using `func` in the line `(*)` *guarantees* that this exactly function will be called. Using `sayHi` there 


...But the name `func` is not visible outside of the function:

```js
//+ run
let sayHi = function *!*func*/!*(who) {
  // ...
};

*!*
func(); // Error: func is not defined
*/!*
```

Named Function Expressions are used in rare cases when:
<ul>
<li>The function needs to reference itself from inside. For instance, call itself with another arguments.</li>
<li>The function travels between variables.</li>
</ul>

The code below demonstrates both conditions:

```js
//+ run
let sayHi = function *!*func*/!*(name) {
  if (name) {
    alert(`Hello, ${name}!`)
  } else {
    func("Guest");
  }
};

welcome(); // Works
```


