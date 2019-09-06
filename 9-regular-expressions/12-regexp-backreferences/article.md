# Backreferences in pattern: \N and \k<name>

We can use the contents of capturing groups `pattern:(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \N

A group can be referenced in the pattern using `pattern:\N`, where `N` is the group number.

To make clear why that's helpful, let's consider a task.

We need to find quoted strings: either single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `subject:"She's the one!"`:

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// The result is not what we'd like to have
alert( str.match(regexp) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `pattern:(['"])(.*?)\1`.

Here's the correct code:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

Now it works! The regular expression engine finds the first quote `pattern:(['"])` and memorizes its content. That's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Similar to that, `pattern:\2` would mean the contents of the second group, `pattern:\3` - the 3rd group, and so on.

```smart
If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.
```

```warn header="Don't mess up: in the pattern `pattern:\1`, in the replacement: `pattern:$1`"
In the replacement string we use a dollar sign: `pattern:$1`, while in the pattern - a backslash `pattern:\1`.
```

## Backreference by name: `\k<name>`

If a regexp has many parentheses, it's convenient to give them names.

To reference a named group we can use `pattern:\k<имя>`.

In the example below the group with quotes is named `pattern:?<quote>`, so the backreference is `pattern:\k<quote>`:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
