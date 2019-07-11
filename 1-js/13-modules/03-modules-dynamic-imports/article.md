
# Dynamic imports

Export and import statements that we covered in previous chapters are called "static".

That's because they are indeed static. The syntax is very strict.

First, we can't dynamically generate any parameters of `import`.

The module path must be a primitive string, can't be a function call. This won't work:

```js
import ... from *!*getModuleName()*/!*; // Error, only from "string" is allowed
```

Second, we can't import conditionally or at run-time:

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
```

That's because `import`/`export` aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed ("tree-shaken"). That's possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?

## The import() function

The `import(module)` function can be called from anywhere. It returns a promise that resolves into a module object.

The usage pattern looks like this:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

Or, we could use `let module = await import(modulePath)` if inside an async function.

For instance, if we have the following `say.js`:

```js
// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
```

...Then dynamic import can be like this:

```js
let {hi, bye} = await import('./say.js');

hi();
bye();

```

Or, for the default export:

```js
// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
```

To import it, we need to get `default` property of the module object, as explained in the [previous chapter](info:import-export).

So, the dynamic import will be like this:

```js
let {default: say} = await import('./say.js'); // map .default to say variable

say();
```

Here's the full example:

[codetabs src="say" current="index.html"]

So, dynamic imports are very simple to use, and they allow to import modules at run-time.

Also, dynamic imports work in regular scripts, they don't require `script type="module"`.

```smart
Although `import()` looks like a function call, it's a special syntax that just happens to use parentheses (similar to `super()`).

That means that import doesn't inherit from `Function.prototype` so we cannot call or apply it.
```
