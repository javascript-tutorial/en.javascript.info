The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we're at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: "How do we detect that the page is scrolled to bottom?"

Let's use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`. And the `bottom` property will be window-relative coordinate of the document end.

For instance, if the height of the whole HTML document is 2000px, then:

```js
// When we're on the top of the page
// window-relative top = 0
document.documentElement.getBoundingClientRect().top = 0

// window-relative bottom = 2000
// the document is long, so that is probably far beyond the window bottom
document.documentElement.getBoundingClientRect().bottom = 2000
```

If we scroll `500px` below, then:

```js
// document top is above the window 500px
document.documentElement.getBoundingClientRect().top = -500
// document bottom is 500px closer
document.documentElement.getBoundingClientRect().bottom = 1500
```

When we scroll till the end, assuming that the window height is `600px`:


```js
// document top is above the window 500px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is 500px closer
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the bottom can't be 0, because it never reaches the window top. The lowest limit of the bottom coordinate is the window height, we can't scroll it any more up.

And the window height is `document.documentElement.clientHeight`.

We want the document bottom be no more than `100px` away from it.

So here's the function:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // if it's greater than window height + 100px, then we're not at the page back
    // (see examples above, big bottom means we need to scroll more)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

    // otherwise let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
