# Page lifecycle: DOMContentLoaded, load, beforeunload, unload

The lifecycle of an HTML page has three important events:

- `DOMContentLoaded` -- the browser fully loaded HTML, and the DOM tree is built, but external resources like pictures `<img>` and stylesheets may be not yet loaded.  
- `load` -- the browser loaded all resources (images, styles etc).
- `beforeunload/unload` -- when the user is leaving the page.

Each event may be useful:

- `DOMContentLoaded` event -- DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
- `load` event -- additional resources are loaded, we can get image sizes (if not specified in HTML/CSS) etc.
- `beforeunload/unload` event -- the user is leaving: we can check if the user saved the changes and ask them whether they really want to leave.

Let's explore the details of these events.

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

In the example the `DOMContentLoaded` handler runs when the document is loaded and does not wait for the image to load. So `alert` shows zero sizes.

At the first sight `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. But there are few peculiarities.

### DOMContentLoaded and scripts

When the browser initially loads HTML and comes across a `<script>...</script>` in the text, it can't continue building DOM. It must execute the script right now. So `DOMContentLoaded` may only happen after all such scripts are executed.

External scripts (with `src`) also put DOM building to pause while the script is loading and executing. So `DOMContentLoaded` waits for external scripts as well.

The only exception are external scripts with `async` and `defer` attributes. They tell the browser to continue processing without waiting for the scripts. This lets the user see the page before scripts finish loading, which is good for performance.

### Scripts with `async` and `defer`

Attributes `async` and `defer` work only for external scripts. They are ignored if there's no `src`.

Both of them tell the browser that it may go on working with the page, and load the script "in background", then run the script when it loads. So the script doesn't block DOM building and page rendering.

There are two differences between them.

|         | `async` | `defer` |
|---------|---------|---------|
| Order | Scripts with `async` execute *in the load-first order*. Their document order doesn't matter -- which loads first runs first. | Scripts with `defer` always execute *in the document order* (as they go in the document). |
| `DOMContentLoaded` | Scripts with `async` may load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. | Scripts with `defer` execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

So `async` is used for independent scripts, like counters or ads, that don't need to access page content. And their relative execution order does not matter.

While `defer` is used for scripts that need DOM and/or their relative execution order is important.

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

If a visitor initiated navigation away from the page or tries to close the window, the `beforeunload` handler asks for additional confirmation.

It may return a string with the question. Historically browsers used to show it, but as of now only some of them do. That's because certain webmasters abused this event handler by showing misleading and hackish messages.

You can try it by running this code and then reloading the page.

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

```online
Or you can click on the button in `<iframe>` below to set the handler, and then click the link:

[iframe src="window-onbeforeunload" border="1" height="80" link edit]
```

## readyState

What happens if we set the `DOMContentLoaded` handler after the document is loaded?

Naturally, it never runs.

There are cases when we are not sure whether the document is ready or not, for instance an external script with `async` attribute loads and runs asynchronously. Depending on the network, it may load and execute before the document is complete or after that, we can't be sure. So we should be able to know the current state of the document.

The `document.readyState` property gives us information about it. There are 3 possible values:

- `"loading"` -- the document is loading.
- `"interactive"` -- the document was fully read.
- `"complete"` -- the document was fully read and all resources (like images) are loaded too.

So we can check `document.readyState` and setup a handler or execute the code immediately if it's ready.

Like this:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}
```

There's a `readystatechange` event that triggers when the state changes, so we can print all these states like this:

```js run
// current state
console.log(document.readyState);

// print state changes
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

The `readystatechange` event is an alternative mechanics of tracking the document loading state, it appeared long ago. Nowadays, it is rarely used, but let's cover it for completeness.

What is the place of `readystatechange` among other events?

To see the timing, here's a document with `<iframe>`, `<img>` and handlers that log events:

```html
<script>
  function log(text) { /* output the time and message */ }
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

The working example is [in the sandbox](sandbox:readystate).

The typical output:
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

The numbers in square brackets denote the approximate time of when it happens. The real time is a bit greater, but events labeled with the same digit happen approximately at the same time (+- a few ms).

- `document.readyState` becomes `interactive` right before `DOMContentLoaded`. These two events actually mean the same.
- `document.readyState` becomes `complete` when all resources (`iframe` and `img`) are loaded. Here we can see that it happens in about the same time as `img.onload` (`img` is the last resource) and `window.onload`. Switching to `complete` state means the same as `window.onload`. The difference is that `window.onload` always works after all other `load` handlers.


## Lifecycle events summary

Page lifecycle events:

- `DOMContentLoaded` event triggers on `document` when DOM is ready. We can apply JavaScript to elements at this stage.
  - All inline scripts and scripts with `defer` are already executed.
  - Async scripts may execute both before and after the event, depends on when they load.
  - Images and other resources may also still continue loading.
- `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- `beforeunload` event on `window` triggers when the user wants to leave the page. If it returns a string, the browser shows a question whether the user really wants to leave or not.
- `unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used.
- `document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
  - `loading` -- the document is loading.
  - `interactive` -- the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
  - `complete` -- the document and resources are loaded, happens at about the same time as `window.onload`, but before it.
