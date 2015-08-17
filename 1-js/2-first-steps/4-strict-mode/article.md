# The modern mode, "use strict"

For a long time JavaScript was evolving without compatibility issues. New features got added to the language, but the old ones did not change.

That had the benefit of never breaking the existing code. But the back side is that any mistake or imprefect decision made by JavaScript creators got stuck in the language forever.

It had been so before EcmaScript 5 (ES5) appeared with added new features to the language and modified some of the existing ones. 

To keep old code working, by default most modifications of the pre-existing features are off. We need to enable them manually with a special directive `use strict`. 

[cut]

## "use strict"

The directive looks like a string `"use strict";` or `'use strict';`. When it is located on the top of the script, then the whole script works the "modern" way.

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
We will learn [functions](/function-basics) very soon. For the future let's note that `use strict` can be put at the start of a function instead of the whole script. Then the strict mode is enabled in this function only.
[/smart]

## Do I really need "use strict"?

Actually, yes. All modern browsers support it.

More than that, there are several JavaScript features that enable strict mode implicitly, "by default". So if we use for example [classes](/classes) (covered later), they implicitly switch the interpreter to "strict mode". 

So there's no way to stay modern and evade `"use strict"`. Let's put it everywhere.

The only downside is Internet Explorer prior to version 10. Those browsers do not support `use strict`, so we need to make sure that our code is compatible with the old behavior. That won't cause any problems for us.

Another minor problem is the 3rd party libraries, few of them are written without `use strict` in mind and do not work correctly when the calling code is in the strict mode. But that happens very rarely.

All code in the tutorial works correctly in `use strict`.

## Summary

Here we got acquanted with the notion of a "strict mode".

It is strongly advised to use it everywhere. Very soon, in the next chapter we'll see the differences of the strict mode in examples.

