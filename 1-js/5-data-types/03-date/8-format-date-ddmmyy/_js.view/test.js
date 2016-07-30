describe("formatDate", function() {
  it("правильно форматирует дату 30.01.14", function() {
    assert.equal(formatDate(new Date(2014, 0, 30)), '30.01.14');
  });

  it("правильно форматирует дату 01.01.01", function() {
    assert.equal(formatDate(new Date(2001, 0, 1)), '01.01.01');
  });

  it("правильно форматирует дату 01.01.00", function() {
    assert.equal(formatDate(new Date(2000, 0, 1)), '01.01.00');
  });
});