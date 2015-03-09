var arr;

before(function() {
  arr = [1, 2, 3, 4, 5, 6, 7];
});

describe("inArray", function() {
  var checkInArr;

  before(function() {
    checkInArr = inArray(arr);
  });

  it("возвращает фильтр для значений в массиве", function() {
    assert.isTrue(checkInArr(5));
    assert.isFalse(checkInArr(0));
  });
});


describe("inBetween", function() {
  var checkBetween36;

  before(function() {
    checkBetween36 = inBetween(3, 6);
  });

  it("возвращает фильтрa для значений в промежутке", function() {
    assert.isTrue(checkBetween36(5));
    assert.isFalse(checkBetween36(0));
  });
});


describe("filter", function() {

  it("фильтрует через func", function() {
    assert.deepEqual(filter(arr, function(a) {
      return a % 2 == 0;
    }), [2, 4, 6]);
  });

  it("не модифицирует исходный массив", function() {
    filter(arr, function(a) {
      return a % 2 == 0;
    });
    assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7]);
  });

  it("поддерживает фильтр inBetween", function() {
    assert.deepEqual(filter(arr, inBetween(3, 6)), [3, 4, 5, 6]);
  });

  it("поддерживает фильтр inArray", function() {
    assert.deepEqual(filter(arr, inArray([1, 2, 3])), [1, 2, 3]);
  });

});