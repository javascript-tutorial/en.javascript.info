
We should use two handlers: `document.onkeydown` and `document.onkeyup`.

Let's create a set `pressed = new Set()` to keep currently pressed keys.

The first handler adds to it, while the second one removes from it. Every time on `keydown` we check if we have enough keys pressed, and run the function if it is so.
