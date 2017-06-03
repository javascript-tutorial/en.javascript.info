importance: 5

---

# Translate border-left-width to borderLeftWidth

Write the function `camelize(str)` that changes dash-separated words like "my-short-string" into camel-cased "myShortString".

That is: removes all dashes, each word after dash becomes uppercased.

Examples:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

P.S. Hint: use `split` to split the string into an array, transform it and `join` back.
