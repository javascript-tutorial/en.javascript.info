Let's make a loop over `<li>`:

```js
for (let li of document.querySelectorAll('li')) {
  ...
}
```

In the loop we need to get the text inside every `li`. We can read it directly from the first child node, that is the text node:

```js
for (let li of document.querySelectorAll('li')) {
  let title = li.firstChild.data;

  // title is the text in <li> before any other nodes
}
```

Then we can get the number of descendants `li.getElementsByTagName('li')`.
