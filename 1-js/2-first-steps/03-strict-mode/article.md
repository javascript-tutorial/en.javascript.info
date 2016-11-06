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
We will learn functions (a way to group commands) soon.

Looking ahead let's just note that `"use strict"` can be put at the start of a function (most kinds of functions) instead of the whole script. Then strict mode is enabled in that function only. But usually people use it for the whole script.
```


## Start with "use strict"

It is recommended to always start a script with `"use strict"`, for the following reasons:

1. First, all modern browsers support it. Only outdated ones like Internet Explorer 9 and below do not.
2. Second, the modern JavaScript actually forces us into the strict mode. There are several modern language features like "classes" and "modules" that enable strict mode automatically. So, it's hard to evade it.

Here in the tutorial all code (except where said otherwise) works in `"use strict"`.  but we'll still note the subtle differences of what happens if you forget it or if the visitor has an outdated browser. So you will also be able to write a code that also works for old IE if you'd like that.

## Summary

- The `"use strict"` directive switches the engine to the "modern" mode, changing the behavior of some builtin features.
- Several modern features of the language enable `"use strict"` implicitly, so it's quite hard to evade it.

It's always recommended to start scripts with `"use strict"`. All examples in this book assume so, unless (very rarely) specified otherwise.
