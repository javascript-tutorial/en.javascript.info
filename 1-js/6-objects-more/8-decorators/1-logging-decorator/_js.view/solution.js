function makeLogging(f, log) {

  function wrapper(a) {
    log.push(a);
    return f.call(this, a);
  }

  return wrapper;
}