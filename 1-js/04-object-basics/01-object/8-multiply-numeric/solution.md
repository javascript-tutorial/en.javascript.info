function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2; 
    }
  }
  //If I dont return the obj the result is undefined.
  return obj
}
