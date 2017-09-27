# String start ^ and finish $

The caret `pattern:'^'` and dollar `pattern:'$'` characters have special meaning in a regexp. They are called "anchors".

[cut]

The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- in the end.

For instance, let's test if the text starts with `Mary`:

```js run
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( /^Mary/.test(str1) ); // true
alert( /^Mary/.test(str2) ); // false
```

The pattern `pattern:^Mary` means: "the string start and then Mary".

Now let's test whether the text ends with an email.

To match an email, we can use a regexp `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}`. It's not perfect, but mostly works.

To test whether the string ends with the email, let's add `pattern:$` to the pattern:

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

let str1 = 'My email is mail@site.com';
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( reg.test(str1) ); // true
alert( reg.test(str2) ); // false
```

We can use both anchors together to check whether the string exactly follows the pattern. That's often used for validation.

For instance we want to check that `str` is exactly a color in the form `#` plus 6 hex digits. The pattern for the color is `pattern:#[0-9a-f]{6}`.

To check that the *whole string* exactly matches it, we add `pattern:^...$`:

```js run
let str = "#abcdef";

alert( /^#[0-9a-f]{6}$/i.test(str) ); // true
```

The regexp engine looks for the text start, then the color, and then immediately the text end. Just what we need.

```smart header="Anchors have zero length"
Anchors just like `\b` are tests. They have zero-width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
```

The behavior of anchors changes if there's a flag `pattern:m` (multiline mode). We'll explore it in the next chapter.
