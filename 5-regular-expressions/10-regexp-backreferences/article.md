# Backreferences: \n and $n

Capturing groups may be accessed not only in the result, but in the replacement string, and in the pattern too.

## Group in replacement: $n

When we are using `replace` method, we can access n-th group in the replacement string using `$n`.

For instance:

```js run
let name = "John Smith";

name = name.replace(/(\w+) (\w+)/i, *!*"$2, $1"*/!*);
alert( name ); // Smith, John
```

Here `pattern:$1` in the replacement string means "substitute the content of the first group here", and `pattern:$2` means "substitute the second group here".

Referencing a group in the replacement string allows us to reuse the existing text during the replacement.

## Group in pattern: \n

A group can be referenced in the pattern using `\n`.

To make things clear let's consider a task. We need to find a quoted string: either a single-quoted  `subject:'...'` or a double-quoted `subject:"..."` -- both variants need to match.

How to look for them?

We can put two kinds of quotes in the pattern: `pattern:['"](.*?)['"]`. That finds strings like  `match:"..."` and `match:'...'`, but it gives incorrect matches when one quote appears inside another one, like the string `subject:"She's the one!"`:

```js run
let str = "He said: \"She's the one!\".";

let reg = /['"](.*?)['"]/g;

// The result is not what we expect
alert( str.match(reg) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed lazily till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, let's make a group of it and use the backreference:

```js run
let str = "He said: \"She's the one!\".";

let reg = /(['"])(.*?)\1/g;

alert( str.match(reg) ); // "She's the one!"
```

Now everything's correct! The regular expression engine finds the first quote `pattern:(['"])` and remembers the content of `pattern:(...)`, that's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group".

Please note:

- To reference a group inside a replacement string -- we use `$1`, while in the pattern -- a backslash `\1`.
- If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not remembered by the engine.
