
function filterRangeInPlace(arr, a, b) {

  arr
    .filter(value => value < a || value > b)
    .forEach(value => arr.splice(arr.indexOf(value), 1));

}
