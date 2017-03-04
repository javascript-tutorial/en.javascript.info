# Browser actions

Many events automatically lead to browser actions.

For instance:

- A click on a link -- initiates going to its URL.
- A click on submit button inside a form -- initiates its submission to the server.
- Pressing a mouse button over a text and moving it -- selects the text.

If we handle an event in JavaScript, often we don't want browser actions. Fortunately, it can be prevented.

[cut]

## Preventing browser actions

There are two ways to tell the browser we don't want it to act:

- The main way is to use the `event` object. There's a method `event.preventDefault()`.
- If the handler is assigned using `on<event>` (not by `addEventListener`), then we can just return `false` from it.

In the example below there a click to links don't lead to URL change:

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

## Other browser actions

There are many default browser actions.

Here are more events that cause browser actions:

- `mousedown` -- starts the selection (move the mouse to select).
- `click` on `<input type="checkbox">` -- checks/unchecks the `input`.
- `submit` -- clicking an `<input type="submit">` or hitting `key:Enter` inside a form field causes this event to happen, and the browser submits the form after it.
- `wheel` -- rolling a mouse wheel event has scrolling as the default action.
- `keydown` -- pressing a key may lead to adding a character into a field, or other actions.
- `contextmenu` -- the event happens on a right-click, the action is to show the browser context menu.
- ...

All the default actions can be prevented if we want to handle the event exclusively by JavaScript.

````warn header="Events may be related"
Certain events flow one into another.

For instance, `mousedown` on an `<input>` field leads to focusing in it, and the `focus` event. If we prevent the `mousedown` event, there's no focus.

Try to click on the first `<input>` below -- the `focus` event happens. That's normal.

But if you click the second one, there's no focus.

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

That's because the browser action is canceled on `mousedown`. The focusing is still possible if we use another way to enter the input. For instance, the `key:Tab` key to switch from the 1st input into the 2nd.
````

## Summary

- Browser has default actions for many events -- following a link, submitting a form etc.
- To prevent a default action -- use either `event.preventDefault()` or  `return false`. The second method works only for handlers assigned with `on<event>`.
