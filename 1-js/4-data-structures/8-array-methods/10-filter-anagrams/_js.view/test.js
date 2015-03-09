function intersection(arr1, arr2) {
  return arr1.filter(function(item) {
    return arr2.indexOf(item) != -1;
  });
}

describe("aclean", function() {

  it("содержит ровно по 1 слову из каждого набора анаграмм", function() {
    var arr = ["воз", "киборг", "корсет", "зов", "гробик", "костер", "сектор"];

    var result = aclean(arr);
    assert.equal(result.length, 3);

    assert.equal(intersection(result, ["гробик", "киборг"]).length, 1);
    assert.equal(intersection(result, ["воз", "зов"]).length, 1);
    assert.equal(intersection(result, ["корсет", "сектор", "костер"]).length, 1);

  });

  it("не различает регистр символов", function() {
    var arr = ["воз", "ЗОВ"];
    assert.equal(aclean(arr).length, 1);
  });

});