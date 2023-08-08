function concat(arrays) {
  // sum of individual array lengths
  let totalLength = arrays.reduce((acc, value) => acc + value.length, 0);

  let result = new Uint8Array(totalLength);
  
  if (!arrays.length) return result;

  // for each array - copy it over result
  // next array is copied right after the previous one
  let length = 0;
  for(let array of arrays) {
    result.set(array, length);
    length += array.length;
  }

  return result;
}
