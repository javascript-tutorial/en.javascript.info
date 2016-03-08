describe("ucFirst", function() {
  it('Uppercases the first symbol', function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Doesn't die on an empty string", function() {
    assert.strictEqual(ucFirst(""), "");
  });
});