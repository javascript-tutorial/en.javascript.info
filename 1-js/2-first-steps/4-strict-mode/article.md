# The modern mode, "use strict"

For a long time JavaScript was evolving without compatibility issues. New features were added to the language, but the old functionality did not change.

That had the benefit of never breaking the existing code. But the back side is that any mistake or an imprefect decision made by JavaScript creators got stuck in the language forever.

It had been so before EcmaScript 5 (ES5) appeared which added new features to the language and modified some of the existing ones. 

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

[warn header="There's no way to cancel `use strict`"]
There is no directive `"no use strict"` or alike, that would return the old behavior.

Once we enter the strict mode, there's no return.
[/warn]

[smart header="`use strict` for functions"]
We will learn [functions](/function-basics) very soon. Looking ahead let's just note that `"use strict"` can be put at the start of a function instead of the whole script. Then the strict mode is enabled in this function only.
[/smart]

## Do I really need "use strict"?

Actually, yes. All modern browsers support it.

More than that, there are several JavaScript features that enable strict mode implicitly, "by default". Namely, "classes" and "modules" automatically switch the interpreter to "strict mode".

So there's no way to stay modern and evade `"use strict"`. 

The only downside is Internet Explorer prior to version 10. Those browsers do not support `"use strict"`, so if we plan to support them, then our code must be compatible with the old behavior. But that's an easy thing to do if we keep it in mind. 

Sometimes we can pass by a 3rd party library that do not work correctly when the calling code is in the strict mode. But that happens very rarely, and can usually be fixed on a per-library basis.

Here in the tutorial all code works correctly in `"use strict"`.

## Summary

<ul>
<li>JavaScript without `"use strict"` may execute differently in some cases. Further in the tutorial we'll see what's different. Thankfully, not so much.</li>
<li>Several modern features of the language enable `"use strict"` implicitly, so there's just no way to evade it.</li>
<li>It is strongly advised to `"use strict"` everywhere, but keep in mind compability if we are to support old IE.</li>
</ul>


