# The modern mode, "use strict"

For a long time JavaScript was evolving without compatibility issues. New features were added to the language, but the old functionality did not change.

That had the benefit of never breaking the existing code. But the back side is that any mistake or an imprefect decision made by JavaScript creators got stuck in the language forever.

It had been so before ECMAScript 5 (ES5) appeared which added new features to the language and modified some of the existing ones.

To keep the old code working, most modifications are off by default. One needs to enable them explicitly with a special directive `"use strict"`.

[cut]

## "use strict"

The directive looks like a string: `"use strict"` or `'use strict'`. When it is located on the top of the script, then the whole script works the "modern" way.

For example

```js
"use strict";

// this code works the modern way
...
```

```warn header="There's no way to cancel `use strict`"
There is no directive `"no use strict"` or alike, that would return the old behavior.

Once we enter the strict mode, there's no return.
```

````warn header="Ensure that 'use strict' is at the top"
Please make sure that `"use strict"` is on the top of the script, otherwise the strict mode may not be enabled.

There is no strict mode here:

```js no-strict
alert("some code");
// "use strict" below is ignored, must be not on the top

"use strict";

// strict mode is not activated
```

Only comments may appear above `"use strict"`.
````


```smart header="`use strict` for functions"
We will learn [functions](/function-basics) very soon. 

Looking ahead let's just note that `"use strict"` can be put at the start of a function instead of the whole script. Then the strict mode is enabled in this function only. But that limitation is exceptionally rarely needed.
```



## Start with "use strict"

It is recommended to always start a script with `"use strict"`, for the following reasons:

1. First, because all modern browsers support it, except Internet Explorer 9 and lower.
2. Second, the modern JavaScript actually forces us into the strict mode. There are several modern language features like "classes" and "modules" that enable strict mode automatically. So, it's hard to evade it.

If we're going to support Internet Explorer 9-, then we should also `"use strict"`, but write a code in a compatible way for the outdated browsers to work too. As we'll see, it's not that difficult.

Here in the tutorial all code (except where said otherwise) works in `"use strict"`.

## Summary

- The `"use strict"` directive switches the engine to the "modern" mode, changing the behavior of some builtin features.
- Several modern features of the language enable `"use strict"` implicitly.
- It's recommended to start scripts with `"use strict"` all the time.
