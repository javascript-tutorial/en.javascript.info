function applyAll(func) {
  return func.apply(this, [].slice.call(arguments, 1));
}