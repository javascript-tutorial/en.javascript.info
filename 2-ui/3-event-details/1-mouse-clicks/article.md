# Mouse: clicks, coordinates

In this chapter we'll get into more details of mouse events and their properties.

[cut]

## Mouse event types

We can split mouse events into two categories: "simple" and "complex"

### Simple events

The most used simple events are:

`mousedown/mouseup`
: Mouse button is clicked/released over an element.

`mouseover/mouseout`
: Mouse pointer comes over/out an element.

`mousemove`
: Every mouse move over an element triggers that event.

There are several other event types too, we'll cover them later.

### Complex events

`click`
: Triggers after `mousedown` and then `mouseup` over the same element.

`contextmenu`
: Triggers after `mousedown` if the right mouse button was used.

`dblclick`
: Triggers after a double click over an element.

Complex events are made of simple ones, so in theory we could live without them. But they exist, and that's good, because they are convenient.

For touchscreen devices mouse events also happen, because they are emulated.

### Events order

An action may trigger multiple events.

For instance, a click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiated multiple events, their order is fixed. That is, the handlers are be called in the order `mousedown` -> `mouseup` -> `click`. Events are handled in sequence:  `onmouseup` finishes before `onclick` runs.

```online
Click the button below and you'll see which events happen. Try double-click too.

On the teststand below all mouse events are logged, and if there are more than 1 second delay between them, then they are separated by a horizontal ruler.

Also we can see the `which` property that allows to detect the mouse button. We'll cover it a bit later.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Getting the button: which

Click-related events always have the `which` property that allows to see the button.

It is not used for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

But if we track `mousedown` and `mouseup`, then we need it, because they trigger on any button.

There are the three possible values:

- `event.which == 1` -- the left button
- `event.which == 2` - the middle button
- `event.which == 3` - the right button

The middle button is somewhat exotic right now.

## Modifiers: shift, alt, ctrl and meta

All mouse events include the information about pressed modifier keys.

The properties are:

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (for Mac)

For instance, the button below only works on `key:Alt+Shift`+click:

```html autorun height=60
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```

```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, that corresponds to the property `metaKey`.

In most cases when Windows/Linux uses `key:Ctrl`, on Mac people use `key:Cmd`. So where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on, most apps use `key:Cmd` instead of `key:Ctrl`.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use  `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a regular click with `key:Ctrl` is interpreted as a *right click* on Mac, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operational systems to feel comfortable, then together with `ctrlKey` we should use `metaKey`.

For JS-code it means that we should check `if (event.ctrlKey || event.metaKey)`.
```

```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if you have keyboard -- it works. And if your device doesn't have it -- then there's another way to do the same.
```

## Coordinates: clientX/Y, pageX/Y

All mouse events have coordinates in two flavours:

1. Window-relative: `clientX` and `clientY`.
2. Document-relative: `pageX` and `pageY`.

See more about coordinates the chapter <info:coordinates>.

For instance, if we have a window of the size 500x500, and the mouse is in the center, then `clientX` and `clientY` are `250`.

If we scroll the page, but the mouse is still in the center, then `clientX/Y` don't change, because they are window-relative.

````online
Move the mouse over the input field to see `clientX/clientY`:

```html autorun height=50
<input onmousemove="this.value = event.clientX+':'+event.clientY">
```
````

That's like `elem.getBoundingClientRect()` and `position:fixed`.

Document-relative coordinates are counted from the left-upper corner of the document, not the window. In case of a scrolled page, they also include the scrolled out left-upper part.

These coordinates are connected by the formulas:

```js
// for an arbitrary mouse event
event.pageX = pageXOffset + event.clientX
event.pageY = pageYOffset + event.clientY
```

So technically we don't need `pageX/Y`, because we can always calculate them using the formulas. But it's good that we have them, as a matter of convenience.

## No selection on mousedown

Mouse clicks have a side-effect that may be disturbing. A double click or an occasional cursor move with a pressed button select the text.

If we want to handle click events ourselves, then the "extra" selection doesn't look good.

For instance, a double-click on the text below selects it in addition to our handler:

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

There's a CSS way to stop the selection: the `user-select` property from [CSS UI Draft](https://www.w3.org/TR/css-ui-4/).

It's yet in the draft, so browser support it with prefixes:

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Before...
<b ondblclick="alert('Test')">
  Unselectable
</b>
...After
```

Now if you double-click on `"Unselectable"`, it doesn't get selected. Seems to work.

...But there is a side-effect! The text became truly unselectable. Even if a user starts the selection from `"Before"` and ends with `"After"`, the selection skips `"Unselectable"` part. Do we really want to make our text unselectable?

Most of time, not really. A user may want to select it, for copying or other needs. That may be disturbing if we don't allow him to do it. So the solution is not that good.

What we want is to "fix" our interface. We don't want the selection to occur on double-click, that's it.

An alternative solution would be to handle `mousedown`, like this:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

The selection is started on `mousedown` as a default browser action. So if we prevent it, then the bold element is not selected any more on clicks. That's as intended.

From the other hand, the text inside it is still selectable. The only limitation: the selection should start not on the text itself, but from "before" or "after" it. Usually that's not a problem.

````smart header="Canceling the selection"
Instead of *preventing* the selection, we can cancel it "post-factum" in the event handler.

Here's how:

```html autorun height=50
Before...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Double-click me
</b>
...After
```

If you double-click on the bold element, then the selection appears and then is immediately removed. That doesn't look nice, and is not fully reliable though.
````

````smart header="Preventing copying"
If we want to disable selection to protect our content from copy-pasting, then we can use another event: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then that's not a problem of course,
  otherwise we're sorry.
</div>
```
If you try to copy a piece of text in the `<div>`, that won't work, because the default action `oncopy` is prevented.

Surely that doesn't stop from opening HTML-source and doing things manually, but not everyone knows how to do it.
````

## Summary

Mouse events have following properties:

- Button: `which`
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`
- Document-relative coordinates: `pageX/clientX`

In the tasks below it's also important to deal with the selection as an unwanted side-effect of clicks.

There are several ways, for instance:
1. CSS-property `user-select:none` (with browser prefixes) completely disables it.
2. Cancel the selection post-factum using `getSelection().removeAllRanges()`.
3. Handle `mousedown` and prevent the default action.

The third way is preferred most of the time.
