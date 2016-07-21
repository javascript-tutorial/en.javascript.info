
The function `makeArmy` does the following:

1. Creates an empty array `shooters`:

    ```js
    let shooters = [];
    ```
2. Fills it in the loop via `shooters.push`.

    Every element is a function, so the resulting array looks like this:

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. The array is returned from the function.

The call to `army[5]()` -- is getting the element `army[5]` from the array (it will be a function) and -- the immediate call of it.

Now why all shooters show the same.

There's no local variable `i` inside `shooter` functions. When such a function is called, it takes `i` from its outer lexical environment.

What will be the value of `i`?

It lives in the lexical environment associated with `makeArmy()` run. At the moment of the call, `makeArmy` already finished its job. The last value of `i` in the `while` loop was `i=10`.

As a result, all `shooter` functions get from the outer lexical envrironment the same, last value `i=10`.

The fix can be very simple:

```js run
function makeArmy() {
  
  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Now it works correctly, because every time the code block in `for (..) {...}` is executed, a new Lexical Environment is created for it, with the corresponding value of `i`.

So, the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds the current loop iteration. A `shooter` gets the value exactly from the one where it was created.

![](lexenv-makearmy.png)

Here we rewrote `while` into `for`. But it is also possible to keep the existing `while` structure:


```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
*!*
    let j = i;
*/!*
    let shooter = function() { // shooter function
      alert( *!*j*/!* ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Look at the trick. The `while` loop just like `for`, makes a new Lexical Environment for each run. So we must make sure that it gets the right value for a `shooter` will access it.

We copy `let j = i`. This makes a loop-local `j` and copies the value of `i` to it. Primitives are copied "by value", so we actually get a complete independent copy of `i`, belonging to the current loop iteration.

