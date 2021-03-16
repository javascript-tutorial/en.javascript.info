We need to look for `#` followed by 6 hexadecimal characters.

A hexadecimal character can be described as `pattern:[0-9a-fA-F]`. Or if we use the `pattern:i` flag, then just  `pattern:[0-9a-f]`.

Then we can look for 6 of them using the quantifier `pattern:{6}`.

As a result, we have the regexp: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

The problem is that it finds the color in longer sequences:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

To fix that, we can add `pattern:\b` to the end:

```js run
// color
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// not a color
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
