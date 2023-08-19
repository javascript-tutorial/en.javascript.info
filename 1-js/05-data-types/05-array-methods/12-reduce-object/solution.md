function groupById(arr) {
  return arr.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {})
}
