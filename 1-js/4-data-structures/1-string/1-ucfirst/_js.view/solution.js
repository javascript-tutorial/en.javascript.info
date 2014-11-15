function ucFirst(str) {
  var newStr = str.charAt(0).toUpperCase();

  for(var i=1; i<str.length; i++) {
    newStr += str.charAt(i);
  }

  return newStr;
}
