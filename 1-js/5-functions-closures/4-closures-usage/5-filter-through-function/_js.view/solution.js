function filter(arr, func) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    var val = arr[i];
    if (func(val)) {
      result.push(val);
    }
  }

  return result;
}

function inArray(arr) {
  return function(x) {
    return arr.indexOf(x) != -1;
  };
}

function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}