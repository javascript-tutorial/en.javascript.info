In order to insert after the `<body>` tag, you must first find it. We will use the regular expression pattern `pattern:<body.*>`.

Next, we need to leave the `<body>` tag in place and add text after it.

This can be done like this:
```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

In the replacement string `$&` means the match itself, that is, we replace `pattern:<body.*>` Is replaced by itself plus  `<h1>Hello</h1>`.

An alternative is to use retrospective validation:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Such a regular expression at each position will check if `pattern:<body.*>`does not go directly in front of it. If yes, a match is found. But the tag `pattern:<body.*>` does not coincide, it only participates in the verification. And there are no other characters after checking in it, so the match text will be empty.

This replaces the "empty line", followed by `pattern:<body.*>` With `<h1>Hello</h1>`. Which, exactly, is the insertion of this line after `<body>`.

P.S. The flags: `pattern:/<body.*>/si`, will not interfere with this regular expression, so that a line break appears in the "dot" (a tag can span several lines), and also that the tags are in a different register of the `match:<BODY>` type, too.
