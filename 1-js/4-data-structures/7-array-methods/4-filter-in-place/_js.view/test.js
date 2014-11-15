describe("filterRangeInPlace", function() {

  it("меняет массив, оставляя только значения из диапазона", function() {
    var arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 1, 4);
    assert.deepEqual(arr, [3, 1]);
  });

});