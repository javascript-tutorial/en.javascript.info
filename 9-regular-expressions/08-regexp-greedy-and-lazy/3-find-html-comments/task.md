# Find HTML comments

Find all HTML comments in the text:

```js
let reg = /your regexp/g;

let str = `... <!-- My -- comment
 test --> ..  <!----> .. 
`;

alert( str.match(reg) ); // '<!-- My -- comment \n test -->', '<!---->'
```
