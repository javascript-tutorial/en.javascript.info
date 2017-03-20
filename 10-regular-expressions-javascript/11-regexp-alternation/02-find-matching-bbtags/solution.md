
Opening tag is `pattern:\[(b|url|quote)\]`.

Then to find everything till the closing tag -- let's the pattern `pattern:[\s\S]*?` to match any character including the newline and then a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\][\s\S]*?\[/\1\]`.

In action:

```js run
let reg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Please note that we had to escape a slash for the closing tag `pattern:[/\1]`, because normally the slash closes the pattern.
