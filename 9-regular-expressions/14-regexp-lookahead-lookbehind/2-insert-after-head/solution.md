In order to insert after the `<body>` tag, we must first find it. We can use the regular expression pattern `pattern:<body.*?>` for that.

In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.

Here's how we can do it:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

In the replacement string `$&` means the match itself, that is, the part of the source text that corresponds to `pattern:<body.*?>`. It gets replaced by itself plus `<h1>Hello</h1>`.

An alternative is to use lookbehind:

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

As you can see, there's only lookbehind part in this regexp.

It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.

P.S. Regexp flags, such as `pattern:s` and `pattern:i` can also be useful: `pattern:/<body.*?>/si`. The `pattern:s` flag makes the dot `pattern:.` match a newline character, and `pattern:i` flag makes `pattern:<body>` also match `match:<BODY>` case-insensitively.
