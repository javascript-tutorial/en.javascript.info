describe("getWeekDay", function() {
  it("3 January 2014 - friday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'FR');
  });

  it("4 January 2014 - saturday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'SA');
  });

  it("5 January 2014 - sunday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'SU');
  });

  it("6 January 2014 - monday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'MO');
  });

  it("7 January 2014 - tuesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'TU');
  });

  it("8 January 2014 - wednesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'WE');
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'TH');
  });
});
