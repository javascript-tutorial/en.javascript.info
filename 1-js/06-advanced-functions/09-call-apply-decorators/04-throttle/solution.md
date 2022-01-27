```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

A call to `throttle(func, ms)` returns `wrapper`.

1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.

The 3rd step runs not `func`, but `wrapper`, because we not only need to execute `func`, but once again enter the cooldown state and setup the timeout to reset it.

## Alternative solution:

```javascript
function throttle(func, ms) {
  let nextRun, timeout;

  function wrapper () {
    if (!nextRun || nextRun < Date.now()) {
      func.apply(this, arguments); // (*)
      nextRun = Date.now() + ms;
    } else {
      let tillNextRun = nextRun - Date.now(); // (**)
      clearTimeout(timeout); 
      timeout = setTimeout(() => { 
        func.apply(this, arguments);
        nextRun = Date.now() + ms;
      }, tillNextRun);
    }
  };

  return wrapper;
}
```

1. During the first call, the `nextRun` is `undefined` so the `wrapper` enters `if` block `(*)`, runs `func` and sets the `nextRun` to `ms` milliseconds from that moment ( `nextRun = Date.now() + ms` ).
2. At subsequent calls, the `nextRun` is defined, so comparing its value with the current timestamp ( `nextRun < Date.now()` ) determines whether the call should be passed to `func` immediately `(*)` or it should be scheduled `(**)`. Please note that on the scheduling path `(**)`, the first step is clearing the previously scheduled call so that only the last call during throttling will be passed to `func`. Also, note that `nextRun` value should be updated only when the call is actually passed to `func` (not after `if else` statement).
