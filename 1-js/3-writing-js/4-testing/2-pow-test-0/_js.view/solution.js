function pow(x, n) {
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
  if (n == 0 && x == 0) return NaN;

  var result = 1;
  for (var i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}