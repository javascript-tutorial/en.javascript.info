importance: 5

---

# Create a tree from the object

Write a function `createTree` that creates a nested `ul/li` list from the nested object.

For instance:

```js
let data = {
  "Fish": {
    "trout": {},
    "salmon": {}
  },

  "Tree": {
    "Huge": {
      "sequoia": {},
      "oak": {}
    },
    "Flowering": {
      "apple tree": {},
      "magnolia": {}
    }
  }
};
```

The syntax:

```js
let container = document.getElementById('container');
*!*
createTree(container, data); // creates the tree in the container
*/!*
```

The result (tree) should look like this:

[iframe border=1 src="build-tree-dom"]

Choose one of two ways of solving this task:

1. Create the HTML for the tree and then assign to `container.innerHTML`.
2. Create tree nodes and append with DOM methods.

Would be great if you could do both.

P.S. The tree should not have "extra" elements like empty `<ul></ul>` for the leaves.
