# Backreferences in pattern: \n and \k

We can use the contents of capturing groups `(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \n

A group can be referenced in the pattern using `\n`, where `n` is the group number.

To make things clear let's consider a task.

We need to find a quoted string: either a single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants need to match.

How to look for them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like the string `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let reg = /['"](.*?)['"]/g;

// The result is not what we expect
alert( str.match(reg) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed lazily till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and use the backreference.

Here's the correct code:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(['"])(.*?)\1/g;
*/!*

alert( str.match(reg) ); // "She's the one!"
```

Now it works! The regular expression engine finds the first quote `pattern:(['"])` and remembers the content of `pattern:(...)`, that's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Please note:

- To reference a group inside a replacement string -- we use `$1`, while in the pattern -- a backslash `\1`.
- If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not remembered by the engine.

## Backreference by name: `\k<name>`

For named groups, we can backreference by `\k<name>`.

The same example with the named group:

```js run
let str = `He said: "She's the one!".`;

*!*
let reg = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(reg) ); // "She's the one!"
```
