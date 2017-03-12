The `onscroll` handler should check which images are visible and show them.

We also may want to run it when the page loads, to detect immediately visible images prior to any scrolling and load them.

If we put it at the `<body>` bottom, then it runs when the page content is loaded.

```js
// ...the page content is above...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // top elem edge is visible OR bottom elem edge is visible
  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

For visible images we can take `img.dataset.src` and assign it to `img.src` (if not did it yet).

P.S. The solution also has a variant of `isVisible` that "pre-loads" images that are within 1 page  above/below (the page height is `document.documentElement.clientHeight`).
