describe("filterRangeInPlace", function() {

  it("returns the filtered values", function() {

    let arr = [5, 3, 8, 1];

    filterRangeInPlace(arr, 1, 4); 

    assert.deepEqual(arr, [3, 1]);
  });

  it("doesn't return anything", function() {
    assert.isUndefined(filterRangeInPlace([1,2,3], 1, 4)); 
  });

});