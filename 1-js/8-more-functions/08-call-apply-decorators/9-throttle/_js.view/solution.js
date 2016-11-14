function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memo last arguments to call after the cooldown
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // otherwise go to cooldown state
    func.apply(this, arguments);

    isThrottled = true;

    // plan to reset isThrottled after the delay
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // if there were calls, savedThis/savedArgs have the last one
        // recursive call runs the function and sets cooldown again
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}