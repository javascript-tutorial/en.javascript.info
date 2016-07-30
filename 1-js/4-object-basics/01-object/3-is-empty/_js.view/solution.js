function isEmpty(obj) {
  for (let key in obj) {
    // if the loop has started, there is a prorty
    return false;
  }
  return true;
}