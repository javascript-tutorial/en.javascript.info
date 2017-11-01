
# Escaping, special characters

As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character.

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches.

Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember it -- when we deal with each of them separately, you'll know it by heart automatically.

## Escaping

To use a special character as a regular one, prepend it with a backslash.

That's also called "escaping a character".

For instance, we need to find a dot `pattern:'.'`. In a regular expression a dot means "any character except a newline", so if we really mean "a dot", let's put a backslash before it: `pattern:\.`.

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

If we're looking for a backslash `\`, then we should double it:

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## A slash

The slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:

```js run
alert( "/".match(/\//) ); // '/'
```

From the other hand, the alternative `new RegExp` syntaxes does not require escaping it:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```

## new RegExp

If we are creating a regular expression with `new RegExp`, then we need to do some more escaping.

For instance, consider this:

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

It doesn't work, but why?

The reason is string escaping rules. Look here:

```js run
alert("\d\.\d"); // d.d
```

Backslashes are used for escaping inside a string and string-specific special characters like `\n`. The quotes "consume" and interpret them, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `\d` or `\z`, then the backslash is simply removed.

So the call to `new RegExp` gets a string without backslashes.

To fix it, we need to double backslashes, because quotes turn `\\` into `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct now)

let reg = new RegExp(regStr);

alert( "Chapter 5.1".match(reg) ); // 5.1
```
