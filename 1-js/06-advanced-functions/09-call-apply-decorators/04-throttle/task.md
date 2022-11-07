importance: 5

---

# Throttle decorator

Create a "throttling" decorator `throttle(f, ms)` -- that returns a wrapper.

When it's called multiple times, it passes the call to `f` at maximum once per `ms` milliseconds.

Compared to the debounce decorator, the behavior is completely different:
- `debounce` runs the function once after the "cooldown" period. Good for processing the final result.
- `throttle` runs it not more often than given `ms` time. Good for regular updates that shouldn't be very often.

In other words, `throttle` is like a secretary that accepts phone calls, but bothers the boss (calls the actual `f`) not more often than once per `ms` milliseconds.

Let's check the real-life application to better understand that requirement and to see where it comes from.

**For instance, we want to track mouse movements.**

In a browser we can setup a function to run at every mouse movement and get the pointer location as it moves. During an active mouse usage, this function usually runs very frequently, can be something like 100 times per second (every 10 ms).
**We'd like to update some information on the web-page when the pointer moves.**

...But updating function `update()` is too heavy to do it on every micro-movement. There is also no sense in updating more often than once per 100ms.

So we'll wrap it into the decorator: use `throttle(update, 100)` as the function to run on each mouse move instead of the original `update()`. The decorator will be called often, but forward the call to `update()` at maximum once per 100ms.

Visually, it will look like this:

1. For the first mouse movement the decorated variant immediately passes the call to `update`. That's important, the user sees our reaction to their move immediately.
2. Then as the mouse moves on, until `100ms` nothing happens. The decorated variant ignores calls.
3. At the end of `100ms` -- one more `update` happens with the last coordinates.
4. Then, finally, the mouse stops somewhere. The decorated variant waits until `100ms` expire and then runs `update` with last coordinates. So, quite important, the final mouse coordinates are processed.

A code example:

```js
function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
```

P.S. Arguments and the context `this` passed to `f1000` should be passed to the original `f`.
