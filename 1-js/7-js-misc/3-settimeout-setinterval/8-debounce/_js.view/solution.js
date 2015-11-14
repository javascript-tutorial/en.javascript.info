function debounce(f, ms) {

  var state = null;

  var COOLDOWN = 1;

  return function() {
    if (state) return;

    f.apply(this, arguments);

    state = COOLDOWN;

    setTimeout(function() {
      state = null
    }, ms);
  }

}