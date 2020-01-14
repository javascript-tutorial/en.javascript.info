# Paste after fragment

There is a line with an HTML Document.

Insert after tag `<body>` (it may have attributes) line `<h1>Hello</h1>`.

For instance:

```js
let regexp = /your regular expression/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

After that value `str`:
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
