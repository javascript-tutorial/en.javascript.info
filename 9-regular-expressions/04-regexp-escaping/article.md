
# Escaping, special characters

As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character in regexps (just like in a regular string).

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches. Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember the list -- soon we'll deal with each of them separately and you'll know them by heart automatically.

## Escaping

Let's say we want to find a dot literally. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## A slash

A slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:

```js run
alert( "/".match(/\//) ); // '/'
```

On the other hand, if we're not using `/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```                                                                                                                                                                                   

## new RegExp

If we are creating a regular expression with `new RegExp`, then we don't have to escape `/`, but need to do some other escaping.

For instance, consider this:

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

It worked with `pattern:/\d\.\d/`, but with `new RegExp("\d\.\d")` it doesn't, why?

The reason is that backslashes are "consumed" by a string. Remember, regular strings have their own special characters like `\n`, and a backslash is used for escaping.

Please, take a look, what "\d\.\d" really is:

```js run
alert("\d\.\d"); // d.d
```

The quotes "consume" backslashes and interpret them, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `\d` or `\z`, then the backslash is simply removed.

So the call to `new RegExp` gets a string without backslashes. That's why it doesn't work!

To fix it, we need to double backslashes, because quotes turn `\\` into `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (correct now)

let reg = new RegExp(regStr);

alert( "Chapter 5.1".match(reg) ); // 5.1
```

## Summary

- To search special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string `new RegExp`, we need to double backslashes `\\`, cause strings consume one of them.
