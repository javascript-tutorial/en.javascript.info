importance: 5

---

# Debounce decorator

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>

The result of `debounce(f, ms)` decorator should be a wrapper that suspends any calls to `f` and invokes `f` once after `ms` of inactivity.

Let's say we had a function `f` and replaced it with `f = debounce(f, 1000)`.

Then if the wrapped function is called at 0ms, 200ms and 500ms, and then there are no calls, then the actual `f` will be only called once, at 1500ms. That is: after the cooldown period of 1000ms from the last call.

![](debounce.svg)

...And it will get the arguments of the very last call, other calls are ignored.

Here's the code (uses the debounce decorator from the [Lodash library](https://lodash.com/docs/4.17.15#debounce):

```js
let f = _.debounce(alert, 1000);

f("a"); 
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500); 
// debounced function waits 1000ms after the last call and then runs: alert("c")
```


Now a practical example. Let's say, the user types something, and we'd like to send a request to the server once they're finished.

There's no point in sending the request for every character typed. Instead we'd like to wait, and then process the whole result. The `debounce` decorator makes this easy.

In a web-browser, we can setup an event handler -- a function that's called on every change of an input field. Normally, an event handler is called very often, for every typed key. But if we `debounce` it by 1000ms, then it will be only called once, after 1000ms after the last input.

```online

In this live example, the handler puts the result into a box below, try it:

[iframe border=1 src="debounce" height=200]

See? The second input calls the debounced function, so its content is processed after 1000ms from the last input.
```

So, `debounce` is a great way to process a sequence of events: be it a sequence of key presses, mouse movements or something else.


It waits the given time after the last call, and then runs its function, that can process the result.

Implement `debounce` decorator. 

Hint: that's just a few lines if you think about it :)