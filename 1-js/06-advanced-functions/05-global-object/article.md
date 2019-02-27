
# Global object

The global object provides variables and functions that are available anywhere. Mostly, the ones that are built into the language or the host environment.

In a browser it is named "window", for Node.JS it is "global", for other environments it may have another name.

For instance, we can call `alert` as a method of `window`:

```js run
alert("Hello");

// the same as
window.alert("Hello");
```

We can reference other built-in functions like `Array` as `window.Array` and create our own properties on it.

## Browser: the "window" object

For historical reasons, in-browser `window` object is a bit messed up.

1. It provides the "browser window" functionality, besides playing the role of a global object.

    We can use `window` to access properties and methods, specific to the browser window:

    ```js run
    alert(window.innerHeight); // shows the browser window height

    window.open('http://google.com'); // opens a new browser window
    ```

2. Top-level `var` variables and function declarations automatically become properties of `window`.

    For instance:
    ```js untrusted run no-strict refresh
    var x = 5;

    alert(window.x); // 5 (var x becomes a property of window)

    window.x = 0;

    alert(x); // 0, variable modified
    ```

    Please note, that doesn't happen with more modern `let/const` declarations:

    ```js untrusted run no-strict refresh
    let x = 5;

    alert(window.x); // undefined ("let" doesn't create a window property)
    ```

3. Also, all scripts share the same global scope, so variables declared in one `<script>` become visible in  another ones:

    ```html run
    <script>
      var a = 1;
      let b = 2;
    </script>

    <script>
      alert(a); // 1
      alert(b); // 2
    </script>
    ```

4. And, a minor thing, but still: the value of `this` in the global scope is `window`.

    ```js untrusted run no-strict refresh
    alert(this); // window
    ```

Why was it made like this? At the time of the language creation, the idea to merge multiple aspects into a single `window` object was to "make things simple". But since then many things changed. Tiny scripts became big applications that require proper architecture.

Is it good that different scripts (possibly from different sources) see variables of each other?

No, it's not, because it may lead to naming conflicts: the same variable name can be used in two scripts for different purposes, so they will conflict with each other.

As of now, the multi-purpose `window` is considered a design mistake in the language.

Luckily, there's a "road out of hell", called "Javascript modules".

If we set `type="module"` attribute on a `<script>` tag, then such script is considered a separate "module" with its own top-level scope (lexical environment), not interfering with `window`.

- In a module, `var x` does not become a property of `window`:

    ```html run
    <script type="module">
      var x = 5;

      alert(window.x); // undefined
    </script>
    ```

- Two modules that do not see variables of each other:

    ```html run
    <script type="module">
      let x = 5;
    </script>

    <script type="module">
      alert(window.x); // undefined
      alert(x); // Error: undeclared variable
    </script>
    ```

- And, the last minor thing, the top-level value of `this` in a module is `undefined` (why should it be `window` anyway?):

    ```html run
    <script type="module">
      alert(this); // undefined
    </script>
    ```

**Using `<script type="module">` fixes the design flaw of the language by separating top-level scope from `window`.**

We'll cover more features of modules later, in the chapter [](info:modules).

## Valid uses of the global object

1. Using global variables is generally discouraged. There should be as few global variables as possible, but if we need to make something globally visible, we may want to put it into `window` (or `global` in Node.js).

    Here we put the information about the current user into a global object, to be accessible from all other scripts:

    ```js run
    // explicitly assign it to `window`
    window.currentUser = {
      name: "John",
      age: 30
    };

    // then, elsewhere, in another script
    alert(window.currentUser.name); // John
    ```

2. We can test the global object for support of modern language features.

    For instance, test if a build-in `Promise` object exists (it doesn't in really old browsers):
    ```js run
    if (!window.Promise) {
      alert("Your browser is really old!");
    }
    ```

3. We can create "polyfills": add functions that are not supported by the environment (say, an old browser), but exist in the modern standard.

    ```js run
    if (!window.Promise) {
      window.Promise = ... // custom implementation of the modern language feature
    }
    ```

...And of course, if we're in a browser, using `window` to access browser window features (not as a global object) is completely fine.
