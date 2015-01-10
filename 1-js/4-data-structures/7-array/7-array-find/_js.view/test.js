describe("find", function() {

  describe("возвращает позицию, на которой найден элемент", function() {
    it("в массиве [1,2,3] находит 1 на позиции 0", function() {
      assert.equal( find([1, 2, 3], 1), 0);
    });
    it("в массиве [1,2,3] находит 2 на позиции 1", function() {
      assert.equal( find([1, 2, 3], 2), 1);
    }); 
    it("в массиве [1,2,3] находит 3 на позиции 2", function() {
      assert.equal( find([1, 2, 3], 3), 2);
    });
  });

  it("если элемент не найден, возвращает -1", function() {
    assert.equal( find([1,2,3], 0), -1);
  });

  it("отличает false или null от 0", function() {
    assert.equal( find([false, true, null], 0), -1);
  });

  it("отличает 1 от true", function() {
    assert.equal( find([1, 2, 3], true), -1);
  });
});