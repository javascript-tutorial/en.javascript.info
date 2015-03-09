function getIEComputedStyle(elem, prop) {
  var value = elem.currentStyle[prop] || 0;

  // we use 'left' property as a place holder so backup values
  var leftCopy = elem.style.left;
  var runtimeLeftCopy = elem.runtimeStyle.left;

  // assign to runtimeStyle and get pixel value
  elem.runtimeStyle.left = elem.currentStyle.left;
  elem.style.left = (prop === "fontSize") ? "1em" : value;
  value = elem.style.pixelLeft + "px";

  // restore values for left
  elem.style.left = leftCopy;
  elem.runtimeStyle.left = runtimeLeftCopy;

  return value;
}