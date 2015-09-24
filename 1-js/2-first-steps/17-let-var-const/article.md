
# Let, const and var revisited

Now as we know most language syntax constructs, let's discuss the subtle features and differences between variable definitions: `let`, `var` and `const`.

## Let

We'll start with `let`, because in the modern code this declaration appears far more often than any other.

### Let is local to the block

A variable declared with `let` is local to the containing `{…}`.

In other words, the variable is only visible inside the block `{…}` where it was declared.

For instance, let's consider the following code:

```js
//+ run
'use strict';

let user = "John";

alert(`Hello ${user}!`); // Hello John!

if (true) {
*!*
  let user = "Pete";
*/!*
  alert(`…working with ${user}`); // …working with Pete
}

alert(`Goodbye ${user}!`); // Goodbye John!
```

Here the if-block declares and uses it's own variable named `"user"`. The code inside that `if` will see and use the local variable ("Pete"). And after the `if` finished, the if-local `user` is no longer seen ("John" again).

Let's see what happens if we remove the `let` inside `if`:

```js
//+ run
'use strict';

let user = "John";

alert(`Hello ${user}!`); // Hello John!

if (true) {
*!*
  user = "Pete";
*/!*
  alert(`…working with ${user}`); // …working with Pete
}

alert(`Goodbye ${user}!`); // Goodbye *!*Pete*/!*!
```

Now there is no declaration inside `if`, there's no local `user`, hence the outer (the only declared) variable is used and modified.

The same applies to other `{…}` blocks, including `for`, `while`, `switch` and other constructs.

[smart header="`let` in `for` is also local"]
In `for(let i=…)` the variable declared inside `for` is local to the loop body.

For instance, `i` in the example below is visible only inside the loop:

```js
//+ run
'use strict';

for(let i = 0; i < 3; i++) {
  // ...i becomes: 0, 1, 2
  alert(i);
}

// i no longer exists here
alert(i); // Error: i is not defined!
```
[/smart]

### Let is visible only after the declaration

The variable can only be used after it is declared:

```js
//+ run
'use strict';

alert(message); // Error, the variable does not exist yet!

let message = "hello";
```

In the code above we must put `alert` after `let message` for it to work.

That seems to be obvious. But a little later we'll see that `var` behaves differently here.

## Const

A variable declared with `const` is exactly the same as `let` except that it cannot be modified.

The visibility rules are same.

## Var





