function isNumeric(n) { 
  return !isNaN(parseFloat(n)) && isFinite(n)
}

function multiplyNumeric(obj) {
  for(var key in obj) {
    if (isNumeric( obj[key] )) {
      obj[key] *= 2;
    }
  }
}
