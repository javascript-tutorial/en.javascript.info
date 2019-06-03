# Scrolling

Scroll events allow to react on a page or element scrolling. There are quite a few good things we can do here.

For instance:
- Show/hide additional controls or information depending on where in the document the user is.
- Load more data when the user scrolls down till the end of the page.

Here's a small function to show the current scroll:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});
```

```online
In action:

Current scroll = <b id="showScroll">scroll the window</b>
```

The `scroll` event works both on the `window` and on scrollable elements.

## Prevent scrolling

How do we make something unscrollable? We can't prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers *after* the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll.

For instance:
- `wheel` event -- a mouse wheel roll (a "scrolling" touchpad action generates it too).
- `keydown` event for `key:pageUp` and `key:pageDown`.

If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won't start.

Sometimes that may help, but it's more reliable to use CSS to make something unscrollable, such as the `overflow` property.

Here are few tasks that you can solve or look through to see the applications on `onscroll`.
