function extractCurrencyValue(value) {
  let x = "";

  for (let char of value) {
    let c = Number(char);
    
    if (isNaN(c)) {
      continue;
    } else {
      x += c;
    }
  }
  
  return +x;
}
