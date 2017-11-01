# Cross-window communication

The "Same Origin" (same site) policy limits access of windows and frame to each other.

The idea is that if we have two windows open: one from `john-smith.com`, and another one is `gmail.com`, then we wouldn't want a script from `john-smith.com` to read our mail.

[cut]

## Same Origin [#same-origin]

Two URLs are said to have the "same origin" if they have the same protocol, domain and port.

These URLs all share the same origin:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

These ones do not:

- <code>http://<b>www.</b>site.com</code> (another domain: `www.` matters)
- <code>http://<b>site.org</b></code> (another domain: `.org` matters)
- <code><b>https://</b>site.com</code> (another protocol: `https`)
- <code>http://site.com:<b>8080</b></code> (another port: `8080`)

If we have a reference to another window (a popup or iframe), and that window comes from the same origin, then we can do everything with it.

If it comes from another origin, then we can only change its location. Please note: not *read* the location, but *modify* it, redirect it to another place. That's safe, because the URL may contain sensitive parameters, so reading it from another origin is prohibited, but changing is not.

Also such windows may exchange messages. Soon about that later.

````warn header="Exclusion: subdomains may be same-origin"

There's an important exclusion in the same-origin policy.

If windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com`, we can use JavaScript to assign to `document.domain` their common second-level domain `site.com`. Then these windows are treated as having the same origin.

In other words, all such documents (including the one from `site.com`) should have the code:

```js
document.domain = 'site.com';
```

Then they can interact without limitations.

That's only possible for pages with the same second-level domain.
````

## Accessing an iframe contents

An `<iframe>` is a two-faced beast. From one side it's a tag, just like `<script>` or `<img>`. From the other side it's a window-in-window.

The embedded window has a separate `document` and `window` objects.

We can access them like using the properties:

- `iframe.contentWindow` is a reference to the window inside the `<iframe>`.
- `iframe.contentDocument` is a reference to the document inside the `<iframe>`.

When we access an embedded window, the browser checks if the iframe has the same origin. If that's not so then the access is denied (with exclusions noted above).

For instance, here's an `<iframe>` from another origin:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // we can get the reference to the inner window
    let iframeWindow = iframe.contentWindow;

    try {
      // ...but not to the document inside it
      let doc = iframe.contentDocument;
    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't read the URL of the page in it
    try {
      alert(iframe.contentWindow.location);
    } catch(e) {
      alert(e); // Security Error
    }

    // ...but we can change it (and thus load something else into the iframe)!
    iframe.contentWindow.location = '/'; // works

    iframe.onload = null; // clear the handler, to run this code only once
  };
</script>
```

The code above shows errors for any operations except:

- Getting the reference to the inner window `iframe.contentWindow`
- Changing its `location`.

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
The `iframe.onload` event is actually the same as `iframe.contentWindow.onload`. It triggers when the embedded window fully loads with all resources.

...But `iframe.onload` is always available, while `iframe.contentWindow.onload` needs the same origin.
```

And now an example with the same origin. We can do anything with the embedded window:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // just do anything
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

### Please wait until the iframe loads

When an iframe is created, it immediately has a document. But that document is different from the one that finally loads into it!

Here, look:


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // the loaded document is not the same as initial!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

That's actually a well-known pitfall for novice developers. We shouldn't work with the document immediately, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.

...But the `onload` event triggers when the whole iframe with all resources is loaded. What if we want to act sooner, on `DOMContentLoaded` of the embedded document?

That's not possible if the iframe comes from another origin. But for the same origin we can try to catch the moment when a new document appears, and then setup necessary handlers, like this:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // every 100 ms check if the document is the new one
  let timer = setInterval(() => {
    if (iframe.contentDocument == oldDoc) return;

    // new document, let's set handlers
    iframe.contentDocument.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument.body.prepend('Hello, world!');
    });

    clearInterval(timer); // cancel setInterval, don't need it any more
  }, 100);
</script>
```

Let me know in comments if you know a better solution here.

## window.frames

An alternative way to get a window object for `<iframe>` -- is to get it from the named collection  `window.frames`:

- By number: `window.frames[0]` -- the window object for the first frame in the document.
- By name: `window.frames.iframeName` -- the window object for the frame with  `name="iframeName"`.

For instance:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

An iframe may have other iframes inside. The corresponding `window` objects form a hierarchy.

Navigation links are:

- `window.frames` -- the collection of "children" windows (for nested frames).
- `window.parent` -- the reference to the "parent" (outer) window.
- `window.top` -- the reference to the topmost parent window.

For instance:

```js run
window.frames[0].parent === window; // true
```

We can use the `top` property to check if the current document is open inside a frame or not:

```js run
if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## The sandbox attribute

The `sandbox` attribute allows to forbid certain actions inside an `<iframe>`, to run an untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.

By default, for `<iframe sandbox src="...">` the "default set" of restrictions is applied to the iframe. But we can provide a space-separated list of "excluded" limitations as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`. The listed limitations are not applied.

In other words, an empty `"sandbox"` attribute puts the strictest limitations possible, but we can put a space-delimited list of those that we want to lift.

Here's a list of limitations:

`allow-same-origin`
: By default `"sandbox"` forces the "different origin" policy for the iframe. In other words, it makes the browser to treat the `iframe` as coming from another origin, even if its `src` points to the same site. With all implied restrictions for scripts. This option removes that feature.

`allow-top-navigation`
: Allows the `iframe` to change `parent.location`.

`allow-forms`
: Allows to submit forms from `iframe`.

`allow-scripts`
: Allows to run scripts from the `iframe`.

`allow-popups`
: Allows to `window.open` popups from the `iframe`

See [the manual](mdn:/HTML/Element/iframe) for more.

The example below demonstrates a sandboxed iframe with the default set of restrictions: `<iframe sandbox src="...">`. It has some JavaScript and a form.

Please note that nothing works. So the default set is really harsh:

[codetabs src="sandbox" height=140]


```smart
The purpose of the `"sandbox"` attribute is only to *add more* restrictions. It cannot remove them. In particular, it can't relax same-origin restrictions if the iframe comes from another origin.
```

## Cross-window messaging

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

It has two parts.

### postMessage

The window that wants to send a message calls [postMessage](mdn:api/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call  `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: The data to send. Can be any object, the data is cloned using the "structured cloning algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`
: Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read it's `location`. So we can't be sure which site is open in the intended window right now: the user could navigate away.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at that site. Good when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

If we don't want that check, we can set `targetOrigin` to `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`
: The data from `postMessage`.

`origin`
: The origin of the sender, for instance `http://javascript.info`.

`source`
: The reference to the sender window. We can immediately `postMessage` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here's an example:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // something from an unknown domain, let's ignore it
    return;
  }

  alert( "received: " + event.data );
});
```

The full example:

[codetabs src="postmessage" height=120]

```smart header="There's no delay"
There's totally no delay between `postMessage` and the `message` event. That happens synchronously, even faster than `setTimeout(...,0)`.
```

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have two properties:
- `window.open` -- opens a new window and returns a reference to it,
- `window.opener` -- a reference to the opener window from a popup

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the location of another window (write-only access).
- Post a message to it.

Exclusions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows to talk with security checks:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the URL from  `targetWin` site.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.
