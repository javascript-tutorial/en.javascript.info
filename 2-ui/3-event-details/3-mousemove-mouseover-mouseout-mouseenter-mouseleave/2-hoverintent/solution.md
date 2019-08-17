
The algorithm looks simple:
1. Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won't work if we introduce delegation.
2. When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3. If the speed is slow, then run `over`.
4. When we're going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it's small, then the speed is small.

Unfortunately, there's no way to get "current mouse coordinates" in JavaScript. There's no function like `getCurrentMouseCoordinates()`.

The only way to get coordinates is to listen to mouse events, like `mousemove`, and take coordinates from the event object.

So let's set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.

P.S. Please note: the solution tests use `dispatchEvent` to see if the tooltip works right.
