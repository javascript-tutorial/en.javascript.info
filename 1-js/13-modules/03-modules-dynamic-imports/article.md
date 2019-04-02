
# Dynamic imports

Export and import statements that we covered in previous chaters are called "static".

That's because they are indeed static. The syntax is very strict.

First, we can't dynamicaly generate any parameters of `import`.

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

That's because, import/export aim to provide a backbone for the code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed (tree-shaken). That's possible only because everything is fixed.

But how do we import a module dynamically, on-demand?

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

Like this:

[codetabs src="say" current="index.html"]

So, dynamic imports are very simple to use.

Also, dynamic imports work in regular scripts, they don't require `script type="module"`.
