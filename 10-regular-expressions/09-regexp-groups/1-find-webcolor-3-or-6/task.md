# Find color in the format #abc or #abcdef

Write a regexp that matches colors in the format `#abc` or `#abcdef`. That is: `#` followed by 3 or 6 hexadimal digits.

Usage example:
```js
let reg = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef
```

P.S. Should be exactly 3 or 6 hex digits: values like `#abcd` should not match.
