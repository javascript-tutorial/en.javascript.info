# Mouse events basics

Mouse events come not only from "mouse manipulators", but are also emulated on touch devices, to make them compatible.

In this chapter we'll get into more details about mouse events and their properties.

## Mouse event types

We can split mouse events into two categories: "simple" and "complex"

### Simple events

The most used simple events are:

`mousedown/mouseup`
: Mouse button is clicked/released over an element.

`mouseover/mouseout`
: Mouse pointer comes over/out from an element.

`mousemove`
: Every mouse move over an element triggers that event.

...There are several other event types too, we'll cover them later.

### Complex events

`click`
: Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`contextmenu`
: Triggers after `mousedown` if the right mouse button was used.

`dblclick`
: Triggers after a double click over an element.

Complex events are made of simple ones, so in theory we could live without them. But they exist, and that's good, because they are convenient.

### Events order

An action may trigger multiple events.

For instance, a click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`. Events are handled in the same sequence:  `onmouseup` finishes before `onclick` runs.

```online
Click the button below and you'll see the events. Try double-click too.

On the teststand below all mouse events are logged, and if there are more than 1 second delay between them, then they are separated by a horizontal ruler.

Also we can see the `which` property that allows to detect the mouse button.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## Getting the button: which

Click-related events always have the `which` property, which allows to get the exact mouse button.

It is not used for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

But if we track `mousedown` and `mouseup`, then we need it, because these events trigger on any button, so `which` allows to distinguish between "right-mousedown" and "left-mousedown".

There are the three possible values:

- `event.which == 1` -- the left button
- `event.which == 2` - the middle button
- `event.which == 3` - the right button

The middle button is somewhat exotic right now and is very rarely used.

## Modifiers: shift, alt, ctrl and meta

All mouse events include the information about pressed modifier keys.

The properties are:

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (`key:Cmd` for Mac)

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
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, it corresponds to the property `metaKey`.

In most cases when Windows/Linux uses `key:Ctrl`, on Mac people use `key:Cmd`. So where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on, most apps use `key:Cmd` instead of `key:Ctrl`.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use  `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on Mac, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operational systems to feel comfortable, then together with `ctrlKey` we should use `metaKey`.

For JS-code it means that we should check `if (event.ctrlKey || event.metaKey)`.
```

```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor has a
 keyboard -- it works. And if their device doesn't have it -- then there should be another way to do the same.
```

## Coordinates: clientX/Y, pageX/Y

All mouse events have coordinates in two flavours:

1. Window-relative: `clientX` and `clientY`.
2. Document-relative: `pageX` and `pageY`.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`. And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is, how far the document was scrolled. They are similar to `position:fixed`.

````online
Move the mouse over the input field to see `clientX/clientY` (it's in the `iframe`, so coordinates are relative to that `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

Document-relative coordinates are counted from the left-upper corner of the document, not the window.
Coordinates `pageX`, `pageY` are similar to `position:absolute` on the document level.

You can read more about coordinates in the chapter <info:coordinates>.

## Disabling selection on mousedown

Mouse clicks have a side-effect that may be disturbing in some interfaces: a double click selects the text.

If we want to handle click events ourselves, then the "extra" selection doesn't look good.

For instance, a double-click on the text below selects it in addition to our handler:

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

There's a CSS way to stop the selection: the `user-select` property from [CSS UI Draft](https://www.w3.org/TR/css-ui-4/).

Most browsers support it with prefixes:

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

Now if you double-click on "Unselectable", it doesn't get selected. Seems to work.

...But there is a potential problem! The text became truly unselectable. Even if a user starts the selection from "Before" and ends with "After", the selection skips "Unselectable" part. Do we really want to make our text unselectable?

Most of time, we don't. A user may have valid reasons to select the text, for copying or other needs. That may be inconvenient if we don't allow them to do it. So this solution is not that good.

What we want is to prevent the selection on double-click, that's it.

A text selection is the default browser action on `mousedown` event. So the alternative solution would be to handle `mousedown` and prevent it, like this:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

Now the bold element is not selected on double clicks.

The text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

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

If you double-click on the bold element, then the selection appears and then is immediately removed. That doesn't look nice though.
````

````smart header="Preventing copying"
If we want to disable selection to protect our content from copy-pasting, then we can use another event: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
If you try to copy a piece of text in the `<div>`, that won't work, because the default action `oncopy` is prevented.

Surely that can't stop the user from opening HTML-source, but not everyone knows how to do it.
````

## Summary

Mouse events have the following properties:

- Button: `which`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

It's also important to deal with text selection, it may be an unwanted side-effect of clicks.

There are several ways to do this, for instance:
1. The CSS-property `user-select:none` (with browser prefixes) completely disables text-selection.
2. Cancel the selection post-factum using `getSelection().removeAllRanges()`.
3. Handle `mousedown` and prevent the default action (usually the best).

The selection is a separate topic, covered in another chapter <info:selection-range>.
