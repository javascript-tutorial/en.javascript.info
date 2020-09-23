The core of the solution is a function that adds more dates to the page (or loads more stuff in real-life) while we're at the page end.

We can call it immediately and add as a `window.onscroll` handler.

The most important question is: "How do we detect that the page is scrolled to bottom?"

Let's use window-relative coordinates.

The document is represented (and contained) within `<html>` tag, that is `document.documentElement`.

We can get window-relative coordinates of the whole document as `document.documentElement.getBoundingClientRect()`, the `bottom` property will be window-relative coordinate of the document bottom.

For instance, if the height of the whole HTML document is `2000px`, then:

```js
// when we're on the top of the page
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
// document top is above the window 1400px
document.documentElement.getBoundingClientRect().top = -1400
// document bottom is below the window 600px
document.documentElement.getBoundingClientRect().bottom = 600
```

Please note that the `bottom` can't be `0`, because it never reaches the window top. The lowest limit of the `bottom` coordinate is the window height (we assumed it to be `600`), we can't scroll it any more up.

We can obtain the window height as `document.documentElement.clientHeight`.

For our task, we need to know when the document bottom is not no more than `100px` away from it (that is: `600-700px`, if the height is `600`).

So here's the function:

```js
function populate() {
  while(true) {
    // document bottom
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    // if the user hasn't scrolled far enough (>100px to the end)
    if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;
    
    // let's add more data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
