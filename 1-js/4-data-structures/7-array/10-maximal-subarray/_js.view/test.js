describe("getMaxSubSum", function() {
  it("максимальная подсумма [1, 2, 3] равна 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("максимальная подсумма [-1, 2, 3, -9] равна 5", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("максимальная подсумма [-1, 2, 3, -9, 11] равна 11", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("максимальная подсумма [-2, -1, 1, 2] равна 3", function() {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("максимальная подсумма [100, -9, 2, -3, 5] равна 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("максимальная подсумма [] равна 0", function() {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("максимальная подсумма [-1] равна 0", function() {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("максимальная подсумма [-1, -2] равна 0", function() {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });
});