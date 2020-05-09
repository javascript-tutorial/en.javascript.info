# Pointer events

Pointer events is a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen and so on.

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there existed only mouse events.

    Then touch devices appeared. For the old code to work, they also generate mouse events. For instance, tapping generates `mousedown`. But mouse events were not good enough, as touch devices are more powerful in many aspects. For example, it's possible to touch multiple points at once, and mouse events don't have any properties for that.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in details here, because pointer events are event better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing a code that listens both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works. Unless you code for Internet Explorer 10- and Safari 12-, there's no point in using mouse or touch events any more. We can switch to pointer events.

That said, there are important peculiarities, one should know them to use them correctly and avoid extra surprises.  We'll pay attention to them in this article.

## Pointer event types

Pointer events are named similar to mouse events:

| Pointer Event | Mouse event |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll soon explain about them. 

## Pointer event properties

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target` etc, plus some extra:

- `pointerId` - the unique identifier of the pointer causing the event.
- `pointerType` - the pointing device type, must be a string, one of: "mouse", "pen" or "touch". Can use this to react differently on these device types.
- `isPrimary` - `true` for the primary pointer, used to handle multi-touch, explained below.

For pointers that have a changing contact area, e.g. a finger on the touchpad, these can be useful:

- `width` - the width of of the area where the pointer touches the device. Where unsupported, e.g. for mouse it's always `1`. 
- `height` - the height of of the area where the pointer touches the device. Where unsupported, always `1`.

Other properties (rarely used):
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

The last set of properties is supported by few special devices, you can find the details in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if ever needed.

Let's see some examples where these properties may be helpful.

## Multi-touch

Phones and tablets, other devices that employ touchscreens, usually support multi-touch: a user can touch them in several places at once.

Pointer Events allow to handle multi-touch with the help of `pointerId` and `isPrimary` properties.

What happens when we touch a screen at one place, and then put another finger somewhere else?

1. At the first touch we get `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and further touches we get `pointerdown` with `isPrimary=false` and a different `pointerId`.

Please note: there's a `pointerId` for each pointer - a touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events with respective coordinates and different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

Whether we move and then detouch a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`. So we can track multiple touching fingers using their `pointerId`. 

```online
Here's the demo that logs `pointerdown` and `pointerup` events:

[iframe src="multitouch" edit height=200]

Please note: you must be using a touchscreen device, such as a phone or a tablet to actually see the difference. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`.
```

## Event: pointercancel

This event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was disabled.
- The device orientation changed (tablet rotated). 
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

The last reason is the most common and important one. So we'll demonstrate it on a practical example.

Let's say we're impelementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.

Here are the user actions and corresponding events:

1) The user presses the mouse button on an image
    - `pointerdown` event fires
2) Then they start dragging the image
    - `pointermove` fires, maybe several times
3) The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop, thus generating `pointercancel` event.
    - The browser now hangles drag'n'drop of the image.
    - No more `pointermove` events. Our code doesn't work any more!

The browser "hijacks" the interaction: `pointercancel` fires and no more `pointermove` events are generated!

```online
Here's the demo with pointer events (only `up/down`, `move` and `cancel`) logged in the textarea: 

[iframe src="ball" height=240 edit]
```

**Prevent default browser actions to avoid `pointercancel`.**

We need to do two things:

1. Prevent drag'n'drop, e.g. by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
2. For touch devices, there are also touch-related browser actions. We'll have problems with them too, so we should prevent them by setting `#ball { touch-action: none }` in CSS. That's required for our code to work on touch devices.

Then the events work as intended, the browser doesn't hijack the process and no `pointercancel` triggers.

```online
This demo adds these lines:

[iframe src="ball-2" height=240 edit]

As you can see, there's no `pointercancel` any more.
```

Now we can add the code to actually move the ball, and our drag'n'drop will work for mouse devices and touch devices.

## Pointer capturing

Pointer capturing is an interesting feature of pointer events.

The idea is that we can "bind" all events with a particular `pointerId` to a given element. Then all subsequent events with the same `pointerId` will be retargeted to the same element.

The related methods are:
- `elem.setPointerCapture(pointerId)` - binds the given `pointerId` to `elem`.
- `elem.releasePointerCapture(pointerId)` - unbinds the given `pointerId` from `elem`.

Such binding doesn't hold long! It's automatically removed after `pointerup` or `pointercancel` events, or when the target `elem` is removed from the document. 

**Pointer capturing is used to simplify drag'n'drop kind of interactions.**

We've already met the problem when making a custom slider in the article <info:mouse-drag-and-drop>.

1) First, the user should press `pointerdown` on the slider thumb to start dragging it.
2) ...But then the pointer may leave the slider and go elsewhere: below or over it, but `pointermove` events should still be tracked, and the thumb moved.

Previously, to handle `pointermove` events that happen outside of the slider, we used `pointermove` events on the whole `document`. 

Pointer capturing provides an alternative solution: we can `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler, and then all future pointer events until `pointerup` will be retarteted to `thumb`.

That is: events handlers on `thumb` will be called, and `event.target` will always be `thumb`, even if the user moves their pointer around the whole document.

Here's the essential code:

```js
thumb.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to me
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // move the slider
  let newLeft = event.clientX - slider.getBoundingClientRect().left;

  thumb.style.left = newLeft + 'px';
};
// no need to call thumb.releasePointerCapture, happens on pointerup automatically
```

```online
The full demo:

[iframe src="slider" height=100 edit]
```

As a summary: the code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more.

There are two associated pointer events:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## Summary

Pointer events allow to handle mouse, touch and pen events simultaneously.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

Remember to set `touch-events: none` in CSS for elements, otherwise the browser hijacks many types of touch interactions and pointer events won't be generated.

Additional abilities of Pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height` and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, if IE10- and Safari 12- is not needed. And even with those browsers, there are polyfills that enable the support of pointer events.