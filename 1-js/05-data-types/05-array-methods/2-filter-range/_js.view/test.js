describe("filterRange", function() {

  it("returns the filtered values", function() {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4); 

    assert.deepEqual(filtered, [3, 1]);
  });

  it("doesn't change the array", function() {

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4); 

    assert.deepEqual(arr, [5,3,8,1]);
  });

});