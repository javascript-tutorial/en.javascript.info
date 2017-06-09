# The modern mode, "use strict"

For a long time JavaScript was evolving without compatibility issues. New features were added to the language, but the old functionality did not change.

That had the benefit of never breaking the existing codes. But the downside was that any mistake or an imperfect decision made by JavaScript creators got stuck in the language forever.

It had been so until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most modifications are off by default. One needs to enable them explicitly with a special directive `"use strict"`.


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
// "use strict" below is ignored, must be on the top

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

Here in the tutorial, all code (where not explicitly noted otherwise) works in `"use strict"`. We concentrate on modern JavaScript. But there will be notes about what happens without `"use strict"`, so that you can understand what's going on if you forget it or if you're working with an outdated script that doesn't have it.


## Summary

- The `"use strict"` directive switches the engine to the "modern" mode, changing the behavior of some built-in features.
- Several modern features of the language enable `"use strict"` implicitly, so it's quite hard to evade it.

It's always recommended to start scripts with `"use strict"`. All examples in this book assume so, unless (very rarely) specified otherwise.

If you want to know a little bit more about `"use strict"`, the section below tries to explain it a little bit more. If not, move on to the next exercise.

## What does it actually do?

Let's say you listen to us and toss 'use strict' into every piece of JS code that you write. What exactly does it do? Or to put it in better words, what does it let you *not do*? 

There are quite a few things that 'use strict' doesn't let you do, however as we haven't talked about some of the concepts that it affects, let's try illustrating an example that will, hopefully, help you understand why the 'strict mode' is essential.

```js
//not strict
var number;
numbe = 5;
alert(number);
```
We will be talking about variables and what the 'var' keyword does quite soon, but for now, think of it as a reference to a value. If I were to ask you your age, you'd give me a number. In a programming context, that'd translate to 'age is a variable which has the value xxx'. Coming back to 'strict mode', the above code does not, as it says, use the strict mode. If you run this piece of code, you'd get an alert window, like the ones you created in the previous exercise, which says '5'. No? It doesn't say anything? You'd have also noticed that give the variable 'numbe' a value 5. However, I *also* say that I have a variable called 'number'. If someone were to write this down, as a statement in english, it would go something like this:

```
Let's talk about my age. My ag is 5. Now, what's my age?
```

That's completely non-sensical, but you *probably* get the drift now. If I were to mistype in a 1000 line program, or an application with over 20 modules, detecting these kinds of mistypes would save us a lot of time. "But hey", you say, "it's wrong, why should we worry about it then? The *numbe = 5;* doesn't really do anything does it?" Well, not really. Let's look at it this way. The objective of your piece of code is to assign a value you get from somewhere to the variable 'number'. Howeer, you mistype and assign it to 'numbe' instead. Now, when you started off, you only needed to assign the value of 'number'. So, your program does *not* have any other variables apart from number. You would expect your compiler to tell you that you've given it two values now. You *declared* that you will be having a variable called *number* but you actually have **two** now; *number* and *numbe*. Throughout the rest of the program, *number* is not gonna have any value, while *numbe*, with your intended value, sits in your memory with nothing to do. This is where 'use strict' helps us.

```js
use strict;
var number;
numbe = 5;
alert(numbe);
```

Now this code would not compile *at all*. You would know that you have an error somewhere. What's even more helpful is that your compiler will probably tell you that you have a `'ReferenceError'` at `'line number ...'`. Concretely, it tells you what you've done wrong and at what part of the program.

To put it succintly, 'strict mode' is used because it helps. It's okay to write code without it, but it's highly advised that you do not do that unless specified otherwise.
