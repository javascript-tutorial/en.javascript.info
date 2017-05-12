

# Global object

When JavaScript was created, there was an idea of a "global object" that provides all global variables and functions. It was planned that multiple in-browser scripts would use that single global object and share variables through it.

Since then, JavaScript greatly evolved, and that idea of linking code through global variables became much less appealing. In modern JavaScript, the concept of modules took its place.

But the global object still remains in the specification.

In a browser it is named "window", for Node.JS it is "global", for other environments it may have another name.

It does two things:

1. Provides access to built-in functions and values, defined by the specification and the environment.
    For instance, we can call `alert` directly or as a method of `window`:

    ```js run
    alert("Hello");

    // the same as
    window.alert("Hello");
    ```

    The same applies to other built-ins. E.g. we can use `window.Array` instead of `Array`.

2. Provides access to global Function Declarations and `var` variables. We can read and write them using its properties, for instance:

    <!-- no-strict to move variables out of eval -->
    ```js untrusted run no-strict refresh
    var phrase = "Hello";

    function sayHi() {
      alert(phrase);
    }

    // can read from window
    alert( window.phrase ); // Hello (global var)
    alert( window.sayHi ); // function (global function declaration)

    // can write to window (creates a new global variable)
    window.test = 5;

    alert(test); // 5
    ```

...But the global object does not have variables declared with `let/const`!

```js untrusted run no-strict refresh
*!*let*/!* user = "John";
alert(user); // John

alert(window.user); // undefined, don't have let
alert("user" in window); // false
```

```smart header="The global object is not a global Environment Record"
In versions of ECMAScript prior to ES-2015, there were no `let/const` variables, only `var`. And global object was used as a global Environment Record (wordings were a bit different, but that's the gist).

But starting from ES-2015, these entities are split apart. There's a global Lexical Environment with its Environment Record. And there's a global object that provides *some* of the global variables.

As a practical difference, global `let/const` variables are definitively properties of the global Environment Record, but they do not exist in the global object.

Naturally, that's because the idea of a global object as a way to access "all global things" comes from ancient times. Nowadays is not considered to be a good thing. Modern language features like `let/const` do not make friends with it, but old ones are still compatible.
```

## Uses of "window"

In server-side environments like Node.JS, the `global` object is used exceptionally rarely. Probably it would be fair to say "never".

In-browser `window` is sometimes used though.

Usually, it's not a good idea to use it, but here are some examples you can meet.

1. To access exactly the global variable if the function has the local one with the same name.

    ```js untrusted run no-strict refresh
    var user = "Global";

    function sayHi() {
      var user = "Local";

    *!*
      alert(window.user); // Global
    */!*
    }

    sayHi();
    ```

    Such use is a workaround. Would be better to name variables differently, that won't require use to write the code it this way. And please note `"var"` before `user`. The trick doesn't work with `let` variables.

2. To check if a certain global variable or a builtin exists.

    For instance, we want to check whether a global function `XMLHttpRequest` exists.

    We can't write `if (XMLHttpRequest)`, because if there's no `XMLHttpRequest`, there will be an error (variable not defined).

    But we can read it from `window.XMLHttpRequest`:

    ```js run
    if (window.XMLHttpRequest) {
      alert('XMLHttpRequest exists!')
    }
    ```

    If there is no such global function then `window.XMLHttpRequest` is just a non-existing object property. That's `undefined`, no error, so it works.

    We can also write the test without `window`:

    ```js
    if (typeof XMLHttpRequest == 'function') {
      /* is there a function XMLHttpRequest? */
    }
    ```

    This doesn't use `window`, but is (theoretically) less reliable, because `typeof` may use a local XMLHttpRequest, and we want the global one.


3. To take the variable from the right window. That's probably the most valid use case.

    A browser may open multiple windows and tabs. A window may also embed another one in `<iframe>`. Every browser window has its own `window` object and global variables. JavaScript allows windows that come from the same site (same protocol, host, port) to access variables from each other.

    That use is a little bit beyond our scope for now, but it looks like:
    ```html run
    <iframe src="/" id="iframe"></iframe>

    <script>
      alert( innerWidth ); // get innerWidth property of the current window (browser only)
      alert( Array ); // get Array of the current window (javascript core builtin)

      // when the iframe loads...
      iframe.onload = function() {
        // get width of the iframe window
      *!*
        alert( iframe.contentWindow.innerWidth );
      */!*
        // get the builtin Array from the iframe window
      *!*
        alert( iframe.contentWindow.Array );
      */!*
      };
    </script>
    ```

    Here, first two alerts use the current window, and the latter two take variables from `iframe` window. Can be any variables if `iframe` originates from the same protocol/host/port.

## "this" and global object

Sometimes, the value of `this` is exactly the global object. That's rarely used, but some scripts rely on that.

1. In the browser, the value of `this` in the global area is `window`:

    ```js run
    // outside of functions
    alert( this === window ); // true
    ```

    Other, non-browser environments, may use another value for `this` in such cases.

2. When a function with `this` is called in non-strict mode, it gets the global object as `this`:
    ```js run no-strict
    // not in strict mode (!)
    function f() {
      alert(this); // [object Window]
    }

    f(); // called without an object
    ```

    By specification, `this` in this case must be the global object, even in non-browser environments like Node.JS. That's for compatibility with old scripts, in strict mode `this` would be `undefined`.
