# The modern mode, "use strict"

For a long time JavaScript was evolving without compatibility issues. New features were added to the language, but the old functionality did not change.

That had the benefit of never breaking the existing code. But the back side is that any mistake or an imprefect decision made by JavaScript creators got stuck in the language forever.

It had been so before ECMAScript 5 (ES5) appeared which added new features to the language and modified some of the existing ones.

To keep the old code working, most modifications of the pre-existing features are off by default. One need to enable them explicitly with a special directive `"use strict"`.

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



## Do I really need "use strict"?

Technically, we can `"use strict"`, the code will work in the "old mode". But it is suggested that you use it all the time.

1. First, because all modern browsers support it, except Internet Explorer 9 and lower.
2. Second, the modern JavaScript actually pushes us into the strict mode! There are several JavaScript features that enable strict mode automatically. Namely, "classes" and "modules" automatically switch the interpreter to "strict mode". So, it's hard to evade it.
3. And the last. If we're going to support Internet Explorer 9 and lower, that will not be a problem. It does not support `"use strict"` but the differences between the "old" and the "modern" modes are not that huge.


Here in the tutorial all code works correctly in `"use strict"`.

## Summary

- JavaScript without `"use strict"` may execute differently in some cases. Further in the tutorial we'll see what's different. Thankfully, not so much.
- Several modern features of the language enable `"use strict"` implicitly, so there's just no way to evade it.
- It is strongly advised to `"use strict"` everywhere, but keep in mind compability if we are to support old IE.

