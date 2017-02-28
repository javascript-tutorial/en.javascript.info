There are many ways, for instance:


The `<div>` DOM node:

```js
document.body.firstElementChild
// or
document.body.children[0]
// or (the first node is space, so we take 2nd)
document.body.childNodes[1]
```

The `<ul>` DOM node:

```js
document.body.lastElementChild
// or
document.body.children[1]
```

The second `<li>` (with Pete):

```js
// get <ul>, and then get its last element child
document.body.lastElementChild.lastElementChild
```
