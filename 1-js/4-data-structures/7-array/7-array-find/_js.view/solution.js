function find(array, value) {
  if (array.indexOf) { // если метод существует
    return array.indexOf(value);
  }

  for(var i=0; i<array.length; i++) {
    if (array[i] === value) return i;
  }
   
  return -1;
}