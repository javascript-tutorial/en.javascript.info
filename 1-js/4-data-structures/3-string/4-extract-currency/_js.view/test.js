describe("extractCurrencyValue", function() {

  it("выделяет из строки $120 число 120", function() {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });


});