# Browser default actions

Many events automatically lead to browser actions.

For instance:

- A click on a link -- initiates going to its URL.
- A click on submit button inside a form -- initiates its submission to the server.
- Pressing a mouse button over a text and moving it -- selects the text.

If we handle an event in JavaScript, often we don't want browser actions. Fortunately, it can be prevented.

## Preventing browser actions

There are two ways to tell the browser we don't want it to act:

- The main way is to use the `event` object. There's a method `event.preventDefault()`.
- If the handler is assigned using `on<event>` (not by `addEventListener`), then we can just return `false` from it.

In the example below a click to links doesn't lead to URL change:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

```warn header="Not necessary to return `true`"
The value returned by an event handler is usually ignored.

The only exception -- is `return false` from a handler assigned using `on<event>`.

In all other cases, the return is not needed and it's not processed anyhow.
```

### Example: the menu

Consider a site menu, like this:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Here's how it looks with some CSS:

[iframe height=70 src="menu" link edit]

Menu items are links `<a>`, not buttons. There are several benefits, for instance:

- Many people like to use "right click" -- "open in a new window". If we use `<button>` or `<span>`, that doesn't work.
- Search engines follow `<a href="...">` links while indexing.

So we use `<a>` in the markup. But normally we intend to handle clicks in JavaScript. So we should prevent the default browser action.

Like here:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...can be loading from the server, UI generation etc

*!*
  return false; // prevent browser action (don't go to the URL)
*/!*
};
```

If we omit `return false`, then after our code executes the browser will do its "default action" -- following to the URL in `href`.

By the way, using event delegation here makes our menu flexible. We can add nested lists and style them using CSS to "slide down".


## Prevent further events

Certain events flow one into another. If we prevent the first event, there will be no second.

For instance, `mousedown` on an `<input>` field leads to focusing in it, and the `focus` event. If we prevent the `mousedown` event, there's no focus.

Try to click on the first `<input>` below -- the `focus` event happens. That's normal.

But if you click the second one, there's no focus.

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

That's because the browser action is canceled on `mousedown`. The focusing is still possible if we use another way to enter the input. For instance, the `key:Tab` key to switch from the 1st input into the 2nd. But not with the mouse click any more.

## The "passive" handler option

The optional `passive: true` option of `addEventListener` signals the browser that the handler is not going to call `preventDefault()`.

Why that may be needed?

There are some events like `touchmove` on mobile devices (when the user moves their finger across the screen), that cause scrolling by default, but that scrolling can be prevented using `preventDefault()` in the handler.

So when the browser detects such event, it has first to process all handlers, and then if `preventDefault` is not called anywhere, it can proceed with scrolling. That may cause unnecessary delays and "jitters" in the UI.

The `passive: true` options tells the browser that the handler is not going to cancel scrolling. Then browser scrolls immediately providing a maximally fluent experience, and the event is handled by the way.

For some browsers (Firefox, Chrome), `passive` is `true` by default for `touchstart` and `touchmove` events.


## event.defaultPrevented

The property `event.defaultPrevented` is `true` if the default action was prevented, and `false` otherwise.

There's an interesting use case for it.

You remember in the chapter <info:bubbling-and-capturing> we talked about `event.stopPropagation()`  and why stopping bubbling is bad?

Sometimes we can use `event.defaultPrevented` instead.

Let's see a practical example where stopping the bubbling looks necessary, but actually we can do well without it.

By default the browser on `contextmenu` event (right mouse click) shows a context menu with standard options. We can prevent it and show our own, like this:

```html autorun height=50 no-beautify run
<button>Right-click for browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click for our context menu
</button>
```

Now let's say we want to implement our own document-wide context menu, with our options. And inside the document we may have other elements with their own context menus:

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

The problem is that when we click on `elem`, we get two menus: the button-level and (the event bubbles up) the document-level menu.

How to fix it? One of solutions is to think like: "We fully handle the event in the button handler, let's stop it" and use `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

Now the button-level menu works as intended. But the price is high. We forever deny access to information about right-clicks for any outer code, including counters that gather statistics and so on. That's quite unwise.

An alternative solution would be to check in the `document` handler if the default action was prevented? If it is so, then the event was handled, and we don't need to react on it.


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (fixed with event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

Now everything also works correctly. If we have nested elements, and each of them has a context menu of its own, that would also work. Just make sure to check for `event.defaultPrevented` in each `contextmenu` handler.

```smart header="event.stopPropagation() and event.preventDefault()"
As we can clearly see, `event.stopPropagation()` and `event.preventDefault()` (also known as `return false`) are two different things. They are not related to each other.
```

```smart header="Nested context menus architecture"
There are also alternative ways to implement nested context menus. One of them is to have a special global object with a method that handles `document.oncontextmenu`, and also methods that allow to store various "lower-level" handlers in it.

The object will catch any right-click, look through stored handlers and run the appropriate one.

But then each piece of code that wants a context menu should know about that object and use its help instead of the own `contextmenu` handler.
```

## Summary

There are many default browser actions:

- `mousedown` -- starts the selection (move the mouse to select).
- `click` on `<input type="checkbox">` -- checks/unchecks the `input`.
- `submit` -- clicking an `<input type="submit">` or hitting `key:Enter` inside a form field causes this event to happen, and the browser submits the form after it.
- `wheel` -- rolling a mouse wheel event has scrolling as the default action.
- `keydown` -- pressing a key may lead to adding a character into a field, or other actions.
- `contextmenu` -- the event happens on a right-click, the action is to show the browser context menu.
- ...there are more...

All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

To prevent a default action -- use either `event.preventDefault()` or  `return false`. The second method works only for handlers assigned with `on<event>`.

The `passive: true` option of `addEventListener` tells the browser that the action is not going to be prevented. That's useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of `event.defaultPrevented` becomes `true`, otherwise it's `false`.

```warn header="Stay semantic, don't abuse"
Technically, by preventing default actions and adding JavaScript we can customize the behavior of any elements. For instance, we can make a link `<a>` work like a button, and a button `<button>` behave as a link (redirect to another URL or so).

But we should generally keep the semantic meaning of HTML elements. For instance, `<a>` should preform navigation, not a button.

Besides being "just a good thing", that makes your HTML better in terms of accessibility.

Also if we consider the example with `<a>`, then please note: a browser allows to open such links in a new window (by right-clicking them and other means). And people like that. But if we make a button behave as a link using JavaScript and even look like a link using CSS, then `<a>`-specific browser features still won't work for it.
```
