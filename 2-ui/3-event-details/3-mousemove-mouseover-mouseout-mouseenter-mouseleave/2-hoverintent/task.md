importance: 5

---

# "Smart" tooltip

Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there -- show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?

Technically, we can measure the mouse speed over the element, and if it's slow then we assume that it comes "over the element" and show the tooltip, if it's fast -- then we ignore it.

Make a universal object `new HoverIntent(options)` for it.

Its `options`:
- `elem` -- element to track.
- `over` -- a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` -- a function to call when the mouse leaves the element (if `over` was called).

An example of using such object for the tooltip:

```js
// a sample tooltip
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// the object will track mouse and call over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

The demo:

[iframe src="solution" height=140]

If you move the mouse over the "clock" fast then nothing happens, and if you do it slow or stop on them, then there will be a tooltip.

Please note: the tooltip doesn't "blink" when the cursor moves between the clock subelements.
