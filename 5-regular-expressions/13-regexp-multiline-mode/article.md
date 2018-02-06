# Multiline mode, flag "m"

The multiline mode is enabled by the flag `pattern:/.../m`.

It only affects the behavior of `pattern:^` and `pattern:$`.

In the multiline mode they match not only at the beginning and end of the string, but also at start/end of line.

## Line start ^

In the example below the text has multiple lines. The pattern `pattern:/^\d+/gm` takes a number from the beginning of each one:

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/gm) ); // 1, 2, 33
*/!*
```

Without the flag  `pattern:/.../m` only the first number is matched:


```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/g) ); // 1
*/!*
```

That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of a line.

The regular expression engine moves along the text and looks for a string start `pattern:^`, when finds -- continues to match the rest of the pattern `pattern:\d+`.

## Line end $

The dollar sign `pattern:$` behaves similarly.

The regular expression `pattern:\w+$` finds the last word in every line

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+$/gim) ); // Winnie,Piglet,Eeyore
```

Without the `pattern:/.../m` flag the dollar `pattern:$` would only match the end of the whole string, so only the very last word would be found.

## Anchors ^$ versus \n

To find a newline, we can use not only `pattern:^` and `pattern:$`, but also the newline character `\n`.

The first difference is that unlike anchors, the character `\n` "consumes" the newline character and adds it to the result.

For instance, here we use it instead of `pattern:$`:

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+\n/gim) ); // Winnie\n,Piglet\n
```

Here every match is a word plus a newline character.

And one more difference -- the newline `\n` does not match at the string end. That's why `Eeyore` is not found in the example above.

So, anchors are usually better, they are closer to what we want to get.
