
Opening tag is `pattern:\[(b|url|quote)\]`.

Then to find everything till the closing tag -- let's use the pattern `pattern:.*?` with flag `s` to match any character including the newline and then add a backreference to the closing tag.

The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1\]`.

In action:

```js run
let reg = /\[(b|url|quote)\].*?\[\/\1\]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Please note that we had to escape a slash for the closing tag `pattern:[/\1]`, because normally the slash closes the pattern.
