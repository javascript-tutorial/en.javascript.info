We need to find the beginning of the comment `match:<!--`, then everything till the end of `match:-->`.

An acceptable variant is `pattern:<!--.*?-->` -- the lazy quantifier makes the dot stop right before `match:-->`. We also need to add flag `pattern:s` for the dot to include newlines.

Otherwise multiline comments won't be found:

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
```
