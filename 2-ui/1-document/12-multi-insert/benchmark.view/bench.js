function bench(test, times) {
  var sum = 0;
  for (var i = 0; i < times; i++) {
    if (test.setup) test.setup();
    var t = new Date();
    test.work();
    sum += (new Date() - t);
    if (test.tearDown) test.tearDown();
  }
  return sum;
}