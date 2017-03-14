# Page lifecycle: DOMContentLoaded, load, beforeunload, unload

The lifecycle of an HTML page has three important events:

- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may be not yet loaded.  
- `load` -- the browser loaded all resources (images, styles etc).
- `beforeunload/unload` -- when the user is leaving the page.

Each event may be useful:

- `DOMContentLoaded` event -- DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
- `load` event -- additional resources are loaded, we can get image sizes (if not specified in HTML/CSS) etc.
- `beforeunload/unload` event -- the user is leaving: we can check if the user saved the changes and  ask him whether he really wants to leave.

Let's explore the details of these events.

[cut]

## DOMContentLoaded

The `DOMContentLoaded` event happens on the `document` object.

We must use `addEventListener` to catch it:

```js
document.addEventListener("DOMContentLoaded", ready);
```

For instance:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // image is not yet loaded (unless was cached), so the size is 0x0
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

In the example the `DOMContentLoaded` handler runs when the document is loaded, not waits for the page load. So `alert` shows zero sizes.

At the first sight `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. But there are few pecularities.

### DOMContentLoaded and scripts

When the browser initially loads HTML and comes across a `<script>...</script>` in the text, it can't continue building DOM. It must execute the script right now. So `DOMContentLoaded` may only happen after all such scripts are executed.

External scripts (with `src`) also put DOM building to pause while the script is loading and executing. So `DOMContentLoaded` waits for external scripts as well.

The only exception are external scripts with `async` and `defer` attributes. They tell the browser to continue processing without waiting for the scripts. So the user can see the page before scripts finish loading, good for performance.

```smart header="A word about `async` and `defer`"
Attributes `async` and `defer` work only for external scripts. They are ignored if there's no `src`.

Both of them tell the browser that it may go on working with the page, and load the script "in background", then run the script when it loads. So the script doesn't block DOM building and page rendering.

There are two differences between them.

|         | `async` | `defer` |
|---------|---------|---------|
| Order | Scripts with `async` execute *in the load-first order*. Their document order doesn't matter -- which loads first runs first. | Scripts with `defer` always execute *in the document order* (as they go in the document). |
| `DOMContentLoaded` | Scripts with `async` may load and execute *before `DOMContentLoaded`*: if they are small, and the document is big, they load faster. | Scripts with `defer` always execute *after `DOMContentLoaded`*: they wait for it if needed. |

So `async` is used for totally independent scripts, and `defer` is used where we want some order.

```

### DOMContentLoaded and styles

External style sheets don't affect DOM, and so `DOMContentLoaded` does not wait for them.

But there's a pitfall: if we have a script after the style, then that script must wait for the stylesheet to execute:

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // the script doesn't not execute until the stylesheet is loaded
  alert(getComputedStyle(document.body).marginTop);
</script>
```

The reason is that the script may want to get coordinates and other style-dependent properties of elements, like in the example above. Naturally, it has to wait for styles to load.

As `DOMContentLoaded` waits for scripts, it now waits for styles before them as well.

### Built-in browser autofill

Firefox, Chrome and Opera autofill forms on `DOMContentLoaded`.

For instance, if the page has a form with login and password, and the browser remembered the values, then on `DOMContentLoaded` it may try to autofill them (if approved by the user).

So if `DOMContentLoaded` is postponed by long-loading scripts, then autofill also awaits. You probably saw that on some sites (if you use browser autofill) -- the login/password fields don't get autofilled immediately, but there's a delay till the page fully loads. That's actually the delay until the `DOMContentLoaded` event.

One of minor benefits in using `async` and `defer` for external scripts -- they don't block `DOMContentLoaded` and don't delay browser autofill.

## window.onload [#window-onload]

The `load` event on the `window` object triggers when the whole page is loaded including styles, images and other resources.

The example below correctly shows image sizes, because `window.onload` waits for all images:

```html run height=200 refresh
<script>
  window.onload = function() {
    alert('Page loaded');

    // image is loaded at this time
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

When a visitor leaves the page, the `unload` event triggers on `window`. We can do something there that doesn't involve a delay, like closing related popup windows. But we can't cancel the transition to another page.

For that we should use another event -- `onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

If a visitor initiated leaving the page or tries to close the window, the `beforeunload` handler can ask for additional confirmation.

It needs to return the string with the question. The browser will show it.

For instance:

```js
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

```online
Click on the button in `<iframe>` below to set the handler, and then click the link to see it in action:

[iframe src="window-onbeforeunload" border="1" height="80" link edit]
```

```warn header="Some browsers ignore the text and show their own message instead"
Some browsers like Chrome and Firefox ignore the string and shows its own message instead. That's for sheer safety, to protect the user from potentially misleading and hackish messages.
```

## Summary

Page lifecycle events:

- `DOMContentLoaded` event triggers on `document` when DOM is ready. We can apply Javascript to elements at this stage.
  - All scripts are executed except those that are external with `async` or `defer`
  - Images and other resources may still continue loading.

- `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- `beforeload` event on `window` triggers when the user wants to leave the page. If it returns a string, the browser shows a question whether the user really wants to leave or not.
- `unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used.
