
describe("inArray", function() {
  let arr = [1, 2, 3, 4, 5, 6, 7];

  it("massivdagi qiymatlar uchun filtrni qaytaradi", function() {

    let filter = inArray(arr);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});


describe("inBetween", function() {

  it("orasidagi qiymatlar uchun filtrni qaytaradi", function() {
    let filter = inBetween(3, 6);
    assert.isTrue(filter(5));
    assert.isFalse(filter(0));
  });
});
