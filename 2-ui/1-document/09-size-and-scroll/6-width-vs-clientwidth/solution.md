Differences:

1. `clientWidth` is numeric, while `getComputedStyle(elem).width` returns a string with `px` at the end.
2. `getComputedStyle` may return a non-numeric width like `"auto"` for an inline element.
3. `clientWidth` is the inner content area of the element plus paddings, while CSS width (with standard `box-sizing`) is the inner content area *without paddings*.
4. If there's a scrollbar and the browser reserves the space for it, some browsers subtract that space from CSS width (because it's not available for content anymore), and some do not. The `clientWidth` property is always the same: scrollbar size is subtracted if reserved.
