# Pointer events

Pointer events is a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen and so on.

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there existed only mouse events.

    Then touch devices appeared. For the old code to work, they also generate mouse events. For instance, tapping generates `mousedown`. But mouse events were not good enough, as touch devices are more powerful in many aspects. For example, it's possible to touch multiple points at once, and mouse events don't have any properties for that.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in detail here, because pointer events are even better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing a code that listens both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works. Unless you code for Internet Explorer 10 or Safari 12 and below, there's no point in using mouse or touch events any more. We can switch to pointer events.

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

```smart header="Replacing `mouse<event>` with `pointer<event>` in our code"
We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

The support for touch devices will also "magically" improve, but we'll probably need to add `touch-action: none` rule in CSS. See the details below in the section about `pointercancel`. 
```

## Pointer event properties

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target` etc, plus some extra:

- `pointerId` - the unique identifier of the pointer causing the event.
    
    Allows to handle multiple pointers, such as a touchscreen with stylus and multi-touch (explained below).
- `pointerType` - the pointing device type, must be a string, one of: "mouse", "pen" or "touch". 

    We can use this property to react differently on various pointer types.
- `isPrimary` - `true` for the primary pointer (the first finger in multi-touch).

For pointers that measure a contact area and pressure, e.g. a finger on the touchscreen, the additional properties can be useful:

- `width` - the width of of the area where the pointer touches the device. Where unsupported, e.g. for mouse it's always `1`. 
- `height` - the height of of the area where the pointer touches the device. Where unsupported, always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

These properties aren't very well supported across devices, so they are rarely used. You can find the details in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch them in several places at once at their phone or tablet, perform special gestures.

Pointer Events allow to handle multi-touch with the help of `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a screen at one place, and then puts another finger somewhere else on it:

1. At the first touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and further touches:
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: there `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events with respective coordinates and different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves move and then detouches a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.

```online
Here's the demo that logs `pointerdown` and `pointerup` events:

[iframe src="multitouch" edit height=200]

Please note: you must be using a touchscreen device, such as a phone or a tablet to actually see the difference. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.
```

## Event: pointercancel

We've mentioned the importance of `touch-action: none` before. Now let's explain why, as skipping this may cause our interfaces to malfunction.

The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was disabled.
- The device orientation changed (tablet rotated). 
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We'll demonstrate `pointercancel` on a practical example to see how it affects us.

Let's say we're impelementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.

Here are the flow of user actions and corresponding events:

1) The user presses the mouse button on an image, to start dragging
    - `pointerdown` event fires
2) Then they start dragging the image
    - `pointermove` fires, maybe several times
3) Surprise! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires and no more `pointermove` events are generated.

```online
Here's the demo with pointer events (only `up/down`, `move` and `cancel`) logged in the textarea: 

[iframe src="ball" height=240 edit]
```

We'd like to implement our own drag'n'drop, so let's tell the browser not to take it over.

**Prevent default browser actions to avoid `pointercancel`.**

We need to do two things:

1. Prevent native drag'n'drop from happening:
    - Can do it by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are also touch-related browser actions. We'll have problems with them too.
    - We can prevent them by setting `#ball { touch-action: none }` in CSS. 
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and emit no `pointercancel`.

```online
This demo adds these lines:

[iframe src="ball-2" height=240 edit]

As you can see, there's no `pointercancel` any more.
```

Now we can add the code to actually move the ball, and our drag'n'drop will work for mouse devices and touch devices.

## Pointer capturing

Pointer capturing is a special feature of pointer events.

The idea is that we can "bind" all events with a particular `pointerId` to a given element. Then all subsequent events with the same `pointerId` will be retargeted to the same element. That is: the browser sets that element as the target and trigger associated handlers, no matter where it actually happened.

The related methods are:
- `elem.setPointerCapture(pointerId)` - binds the given `pointerId` to `elem`.
- `elem.releasePointerCapture(pointerId)` - unbinds the given `pointerId` from `elem`.

Such binding doesn't hold long. It's automatically removed after `pointerup` or `pointercancel` events, or when the target `elem` is removed from the document. 

Now when do we need this?

**Pointer capturing is used to simplify drag'n'drop kind of interactions.**

Let's recall the problem we met while making a custom slider in the article <info:mouse-drag-and-drop>.

1) First, the user presses `pointerdown` on the slider thumb to start dragging it.
2) ...But then, as they move the pointer, it may leave the slider: go below or over it.

But we continue tracking track `pointermove` events and move the thumb until `pointerup`, even though the pointer is not on the slider any more.

[Previously](info:mouse-drag-and-drop), to handle `pointermove` events that happen outside of the slider, we listened for `pointermove` events on the whole `document`. 

Pointer capturing provides an alternative solution: we can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler, and then all future pointer events until `pointerup` will be retarteted to `thumb`.

That is: events handlers on `thumb` will be called, and `event.target` will always be `thumb`, even if the user moves their pointer around the whole document. So we can listen at `thumb` for `pointermove`, no matter where it happens.

Here's the essential code:

```js
thumb.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to me
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // move the slider: listen at thumb, as all events are retargeted to it
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// note: no need to call thumb.releasePointerCapture, 
// it happens on pointerup automatically
```

```online
The full demo:

[iframe src="slider" height=100 edit]
```

**As a summary: the code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. That's what pointer capturing does.**

There are two associated pointer events:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## Summary

Pointer events allow to handle mouse, touch and pen events simultaneously.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

Remember to set `touch-events: none` in CSS for elements that we engage, otherwise the browser hijacks many types of touch interactions and pointer events won't be generated.

Additional abilities of Pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height` and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.