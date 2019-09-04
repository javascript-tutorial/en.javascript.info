We need to find the beginning of the comment `match:<!--`, then everything till the end of `match:-->`.

The first idea could be `pattern:<!--.*?-->` -- the lazy quantifier makes the dot stop right before  `match:-->`.

But a dot in JavaScript means "any symbol except the newline". So multiline comments won't be found.

We can use `pattern:[\s\S]` instead of the dot to match "anything":

```js run
let reg = /<!--[\s\S]*?-->/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
