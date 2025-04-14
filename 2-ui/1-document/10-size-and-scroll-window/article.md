# Window sizes and scrolling

How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.

## Width/height of the window

To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:

![](document-client-width-height.svg)

```online
For instance, this button shows the height of your window:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.

If there's a scrollbar, and it occupies some space, then these two lines show different values:
```js run
alert( window.innerWidth ); // full window width
alert( document.documentElement.clientWidth ); // window width minus the scrollbar
```

In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
````

```warn header="`DOCTYPE` is important"
Please note: top-level geometry properties may work a little bit differently when there's no `<!DOCTYPE HTML>` in HTML. Odd things are possible.

In modern HTML we should always write `DOCTYPE`.
```

## Width/height of the document

Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?

To reliably obtain the full document height, we should take the maximum of these properties:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

Why so? Better don't ask. These inconsistencies come from ancient times, not a "smart" logic.

## Get the current scroll [#page-scroll]

DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

These properties are read-only.

```smart header="Also available as `window` properties `scrollX` and `scrollY`"
For historical reasons, both properties exist, but they are the same:
- `window.pageXOffset` is an alias of `window.scrollX`.
- `window.pageYOffset` is an alias of `window.scrollY`.
```

## Scrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
```

Regular elements can be scrolled by changing `scrollTop/scrollLeft`.

We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- The method `scrollBy(x,y)` scrolls the page *relative to its current position*. For instance, `scrollBy(0,10)` scrolls the page `10px` down.

    ```online
    The button below demonstrates this:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- The method `scrollTo(pageX,pageY)` scrolls the page *to absolute coordinates*, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document's top-left corner. It's like setting `scrollLeft/scrollTop`.

    To scroll to the very beginning, we can use `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Both methods can also use an `options` object as an argument instead of coordinates:

```js
window.scrollTo(options);
window.scrollBy(options);
```

`options` supports three properties:

```js
window.scrollTo({
  top: 100,
  left: 0,
  behavior: "smooth"
});
```

- `top` -- same as `y`/`pageY`
- `left` -- same as `x`/`pageX`
- `behavior` -- determines how the page will scroll:
  - `"smooth"` -- smoothly (not supported in IE and older versions of Safari)
  - `"instant"` -- instantly
  - `"auto"` -- the browser itself chooses (depends on the CSS property [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior))

```online
Demonstration of smooth page scrolling:
<button onclick="window.scrollBy({ top: 500, left: 0, behavior: 'smooth' })">window.scrollBy({ top: 500, left: 0, behavior: 'smooth' })</button>
```

## scrollIntoView

For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

The call to `elem.scrollIntoView(top)` scrolls the page to make `elem` visible. It has one argument:

- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

Like `scrollTo`/`scrollBy`, `scrollIntoView` also takes an `options` object as an argument (it is slightly different):

```js
this.scrollIntoView(options).
```

`options` supports three properties:

```js
this.scrollIntoView({
  behavior: "smooth",
  block: "end",
  inline: "nearest" 
});
```

- `behavior` -- scroll animation (`smooth`, `instant`, `auto`)
- `block` -- vertical alignment (`start`, `center`, `end`, `nearest`). Defaults to `start`
- `inline` -- horizontal alignment (`start`, `center`, `end`, `nearest`). Defaults to `nearest`

## Forbid the scrolling

Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.

```online
Try it:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.

## Summary

Geometry:

- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Scrolling:

- Read the current scroll: `window.pageYOffset/pageXOffset`.
- Change the current scroll:

    - `window.scrollTo(pageX,pageY)` -- absolute coordinates,
    - `window.scrollBy(x,y)` -- scroll relative the current place,
    - `elem.scrollIntoView(top)` -- scroll to make `elem` visible (align with the top/bottom of the window).
