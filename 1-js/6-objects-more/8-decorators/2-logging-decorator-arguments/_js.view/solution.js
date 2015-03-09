function makeLogging(f, log) {

  function wrapper() {
    log.push([].slice.call(arguments));
    return f.apply(this, arguments);
  }

  return wrapper;
}