
# Strict mode

JavaScript appeared in 1995 as a simple, browser-only language. Then, for a long time, it evolved without compatibility issues. New features were added to the language while old functionality didn't change.

That had the benefit of never breaking existing code. But the downside was that any mistake or an imperfect decision made by JavaScript creators got stuck in the language forever.

This was the case until 2009, when the 5th version of the standard appeared. It added new features to the language and modified some of the existing ones. Also made some syntax more strict.

Now the important part about it. 

**To avoid breaking the old code, the newer modifications and restrictions are off by default.** 

The good thing is: there aren't many such modifications. Also, newly introduced language features do work. The disabled things are only those that were *changed* in the language in a way that may break the code written before them.

For example, in dark old times JavaScript allowed variables to be assigned without a declaration.

Like this:

```js no-strict
*!*
user = "John";
*/!*

console.log(user); // John
```

As we can see, it should be `let user`. But JavaScript was forgiving.

This feature of the language was frowned upon, because it made code more error-prone.

Imagine, if you have a variable named `user`, and then mistype, e.g. assign to `usr` instead:

```js no-strict
let user;

usr = "John"; // mistype!
// (technically, not an error, a new variable usr is created)
```

After 2009, the language started to protect against such mistypes by requiring all variables to be declared and triggering an error otherwise. 

Although, as there were many old scripts, to keep them functioning, this change, along with others, is off by default.

## Use strict

To enable all the modern changes, we need to start a script with a special directive: `"use strict"`.

Like this:

```js
"use strict";

console.log("This script works in the strict mode");
```

Please note: the directive must be at the very top, only comments are allowed above it. 

With `"use strict"`, a mistype in the variable name causes an error:

```js no-strict
"use strict";

let user;

usr = "John"; // Error
```

In the future, when we learn some advanced language features (such as classes and modules), you'll see that they enable strict mode automatically. Until then, it's a good rule to start scripts with  `"use strict"`.

**Here, in the tutorial, we'll always use strict mode, unless explicitly stated otherwise.**

We're studying modern JavaScript after all. But you'll also see notes about how things work without `use strict`, so that you're aware, just in case you forget to put that directive or meet a script without it.
