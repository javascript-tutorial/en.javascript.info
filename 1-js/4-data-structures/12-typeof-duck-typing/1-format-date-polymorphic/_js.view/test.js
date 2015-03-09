describe("formatDate", function() {
  it("читает дату вида гггг-мм-дд из строки", function() {
    assert.equal(formatDate('2011-10-02'), "02.10.11");
  });

  it("читает дату из числа 1234567890 (миллисекунды)", function() {
    assert.equal(formatDate(1234567890), "14.02.09");
  });

  it("читает дату из массива вида [гггг, м, д]", function() {
    assert.equal(formatDate([2014, 0, 1]), "01.01.14");
  });

  it("читает дату из объекта Date", function() {
    assert.equal(formatDate(new Date(2014, 0, 1)), "01.01.14");
  });

});