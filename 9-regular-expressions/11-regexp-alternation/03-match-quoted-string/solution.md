The solution: `pattern:/"(\\.|[^"\\])*"/g`.

Step by step:

- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we technically have to double it in the pattern, because it is a special character, so that's a single backslash in fact), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.

In action:

```js run
let reg = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(reg) ); // "test me","Say \"Hello\"!","\\ \""
```
