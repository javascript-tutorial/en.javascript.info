# Открытие окон и методы window

A popup window is one of the oldest methods to show additional document to user.

Basically, you just run:
```js
window.open('http://javascript.info/')
```

... And it will open a new window with given URL. Most modern browsers are configured to open new tabs instead of separate windows.

[cut]

# The modern use   

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: Javascript is able to send requests for server, so popups are rarely used. But sometimes they are still handy.

In the past evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.

**Most browsers block popups if they are called outside of user-triggered event handlers like `onclick`.**

Despite of this problem, there are situations when a popup works best.

For instance, many shops use online chats for consulting people. A visitor clicks on the button, it runs `window.open` and opens the popup with the chat.

Why a popup is good here?

1. A popup is a separate window with its own independent Javascript environment. So a chat service doesn't need to integrate with scripts of the main shop site.
2. The popup is very simple to add to site and needs no overhead. It's only a small button, without additional scripts.
3. The popup may persist even if the user left the page. For example, a consult advices the user to visit the page of a new "Super-Cooler" goodie. The user goes there in the main window without leaving the chat.

# window.open

The syntax is: `window.open(url, name, params)`, where:

url
: An URL to load into the new window.

name
: A name of the new window. Each window has a `window.name`, and here we can specify which window to use for the popup. If there's a window with such name -- it opens the given URL, otherwise a new window is opened.

params
: The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: `width:200,height=100`.

Parameters:

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


# Example: a minimalistic window   

Let's open a window with minimal set of features just to see which of them browser allows to disable:

[js run]
var p1 = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no'
var p2 = 'width=0,height=0,left=-1000,top=-1000'
open('/', 'test', p1+p2)
[/js]

Here most parameters are disabled and window is positioned offscreen. Run it and see what really happens.

Let's add normal positioning options, a reasonable width, height, left and top coordinates:

[js run]
var p1 = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no'
var p2 = 'width=100,height=100,left=100,top=100'
open('/', 'test', p1+p2)
[/js]

The browser shows the example above as it is meant.

If there is no 3rd argument in the `open` call or it is empty, then the default window parameters are used.

If there is a string of params, but some yes/no features are omitted, then the omitted features are disabled, if the browser allows that. So if you specify params, make sure you set all required features to yes.

If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.

If there is no `width/height`, then the new window will be the same size as the last opened.



# Accessing the new window   

The `open` call returns a reference to the new window. It can be used to manipulate it's properties, change location and even more.

In the example below, the contents of the new window is modified after loading.

[js run]
var win = open('/', 'example', 'width=300,height=300')
win.focus()
win.onload = function() {
  var div = win.document.createElement('div')
  div.innerHTML = 'Welcome into the future!'
  div.style.fontSize = '30px'
  win.document.body.insertBefore( div, win.document.body.firstChild )
}
[/js]

Note that the `document` object of the new window is used. That won't work otherwise.

It is always possible to change the location by assigning `win.location=...`. Most other actions, especially modifying or accessing the new window content are only available if the URL of new window comes from the same protocol://domain:port (or, shortly, from the same origin). More about it in the section [](#142).


# Accessing the opener window   

There is a `window.opener` property which references the window which opened this one. It is `null` for all windows except popups.

So it is possible to manipulate the opener window, change it's location etc. The popup can do with the opener window all that the window can do with it's popup.



# Summary   

The popup is opened by the `win = open(url, name, params)` call. It returns the reference to the newly opened window.

The popup may access the opener window using the `window.opener` property.

Also, if you use a popup, inform the visitor about it. The same applies to opening a new window by a link or form with `target="_blank"`.

An icon with the opening window can help the visitor to survive the focus shift and keep both windows in mind. That's especially true if the new window opens in another tab.
