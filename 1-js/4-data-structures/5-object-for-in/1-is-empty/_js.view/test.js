describe("isEmpty", function() {
  it("если объект пустой - возвращает true", function() {
    assert.isTrue(isEmpty({}));
  });

  it("если у объекта есть любое свойство, не важно какое - возвращает false", function() {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});