function extractCurrencyValue(str) {
  return parseFloat(str.slice(str.indexOf("$")+1));
}
