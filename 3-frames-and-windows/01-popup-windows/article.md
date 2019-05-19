# Popups and window methods

A popup window is one of the oldest methods to show additional document to user.

Basically, you just run:
```js
window.open('https://javascript.info/')
```

... And it will open a new window with given URL. Most modern browsers are configured to open new tabs instead of separate windows.

## Popup blocking

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: JavaScript is able to send requests for server, so popups are rarely used. But sometimes they are still handy.

In the past, evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.

**Most browsers block popups if they are called outside of user-triggered event handlers like `onclick`.**

For example:
```js
// popup blocked
window.open('https://javascript.info');

// popup allowed
button.onclick = () => {
  window.open('https://javascript.info');
};
```

This way users are somewhat protected from unwanted popups, but the functionality is not disabled totally.

What if the popup opens from `onclick`, but after `setTimeout`? That's a bit tricky.

Try this code:

```js run
// open after 3 seconds
setTimeout(() => window.open('http://google.com'), 3000);
```

The popup opens in Chrome, but gets blocked in Firefox.

...If we decrease the delay, the popup works in Firefox too:

```js run
// open after 1 seconds
setTimeout(() => window.open('http://google.com'), 1000);
```

The difference is that Firefox treats a timeout of 2000ms or less are acceptable, but after it -- removes the "trust", assuming that now it's "outside of the user action". So the first one is blocked, and the second one is not.

## Modern usage

As of now, we have many methods to load and show data on-page with JavaScript. But there are still situations when a popup works good, because:

1. A popup is a separate window with its own independent JavaScript environment. So opening a popup with a third-party non-trusted site is safe.
2. It's very easy to open a popup, little to no overhead. 
3. A popup may persist even if the user left the page. In also can navigate (change URL) in the opener window.

## window.open

The syntax to open a popup is: `window.open(url, name, params)`:

url
: An URL to load into the new window.

name
: A name of the new window. Each window has a `window.name`, and here we can specify which window to use for the popup. If there's already a window with such name -- the given URL opens in it, otherwise a new window is opened.

params
: The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: `width:200,height=100`.

Settings for `params`:

- Position:
  - `left/top` (numeric) -- coordinates of the window top-left corner on the screen. There is a limitation: a new window cannot be positioned offscreen.
  - `width/height` (numeric) -- width and height of a new window. There is a limit on minimal width/height, so it's impossible to create an invisible window.
- Window features:
  - `menubar` (yes/no) -- shows or hides the browser menu on the new window.
  - `toolbar` (yes/no) -- shows or hides the browser navigation bar (back, forward, reload etc) on the new window.
  - `location` (yes/no) -- shows or hides the URL field in the new window. FF and IE don't allow to hide it by default.
  - `status` (yes/no) -- shows or hides the status bar. Again, most browsers force it to show.
  - `resizable` (yes/no) -- allows to disable the resize for the new window. Not recommended.
  - `scrollbars` (yes/no) -- allows to disable the scrollbars for the new window. Not recommended.


There is also a number of less supported browser-specific features, which are usually not used. Check <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> for examples.

## Example: a minimalistic window   

Let's open a window with minimal set of features just to see which of them browser allows to disable:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Here most "window features" are disabled and window is positioned offscreen. Run it and see what really happens. Most browsers "fix" odd things like zero `width/height` and offscreen `left/top`. For instance, Chrome open such a window with full width/height, so that it occupies the full screen.

Let's add normal positioning options and reasonable `width`, `height`, `left`, `top` coordinates:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Most browsers show the example above as required.

Rules for omitted settings:

- If there is no 3rd argument in the `open` call, or it is empty, then the default window parameters are used.
- If there is a string of params, but some `yes/no` features are omitted, then the omitted features assumed to have `no` value. So if you specify params, make sure you explicitly set all required features to yes.
- If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.
- If there is no `width/height`, then the new window will be the same size as the last opened.

## Accessing a popup

The `open` call returns a reference to the new window. It can be used to manipulate it's properties, change location and even more.

In the example below, the contents of the new window is modified after loading.

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Please note that external `document` content is only accessible for windows from the same origin (the same protocol://domain:port).

For windows with URLs from another sites, we are able to change the location by assigning `newWindow.location=...`, but we can't read the location or access the content. That's for user safety, so that an evil page can't open a popup with `http://gmail.com` and read the data. We'll talk more about it later.

## Accessing the opener window   

A popup may access the "opener" window as well. A JavaScript in it may use `window.opener` to access the window that opened it. It is `null` for all windows except popups.

So both the main window and the popup have a reference to each other. They may modify each other freely assuming that they come from the same origin. If that's not so, then there are still means to communicate, to be covered in the next chapter <info:cross-window-communication>.

## Closing a popup

If we don't need a popup any more, we can call `newWindow.close()` on it.

Technically, the `close()` method is available for any `window`, but `window.close()` is ignored by most browsers if `window` is not created with `window.open()`.

The `newWindow.closed` is `true` if the window is closed. That's useful to check if the popup (or the main window) is still open or not. A user could close it, and our code should take that possibility into account.

This code loads and then closes the window:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## Focus/blur on a popup

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window.  Also there are `focus/blur` events that allow to focus a window and catch the moment when the visitor switches elsewhere.

In the past evil pages abused those. For instance, look at this code:

```js run
window.onblur = () => window.focus();
```

When a user attempts to switch out of the window (`blur`), it brings it back to focus. The intention is to "lock" the user within the `window`.

So, there are limitations that forbid the code like that. There are many limitations to protect the user from ads and evils pages. They depend on the browser.

For instance, a mobile browser usually ignores that call completely. Also focusing doesn't work when a popup opens in a separate tab rather than a new window.

Still, there are some things that can be done.

For instance:

- When we open a popup, it's might be a good idea to run a `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary   

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- By default, browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- The popup may access the opener window using the `window.opener` property, so the two are connected.
- If the main window and the popup come from the same origin, they can freely read and modify each other. Otherwise, they can change location of each other and communicate using messages (to be covered).
- To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.
- Methods `focus()` and `blur()` allow to focus/unfocus a window. Sometimes.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.

Also if we open a popup, a good practice is to notify the user about it. An icon with the opening window can help the visitor to survive the focus shift and keep both windows in mind.
