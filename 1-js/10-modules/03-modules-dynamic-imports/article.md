
# Dynamic imports

Export and import statements that we covered in previous chaters are called "static".

What's because they are indeed static.

First, we can't generate module name. It must be a string. This won't work:

```js
import {func} from getModuleName(); // Error, only from "string" is allowed
```

Second, we can't import conditionally or at run-time:

```js
if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in a block, must be at the top level
}
```

So, import/export provide a rigid code structure. That's a good thing, as code structure can be analyzed, modules can be gathered and bundled together, unused exports can be removed (tree-shaken), just because everything is fixed.

But how do we import a module on-demand?

## The import() function

The `import(module)` function can be called from anywhere. It returns a promise that resolved into a module object.

The usage pattern looks like this:

```js run
let modulePath = prompt("Module path?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, no such module?>)
```

Or, we could use `async/away` here, like this:

[codetabs src="say" current="index.html"]

Please note: dynamic imports work in regular scripts, they don't require `script type="module"`, like static imports.
