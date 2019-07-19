describe("getLocalDay returns the \"european\" weekday", function() {
  it("3 January 2014 - friday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
  });

  it("4 January 2014 - saturday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
  });

  it("5 January 2014 - sunday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
  });

  it("6 January 2014 - monday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
  });

  it("7 January 2014 - tuesday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
  });

  it("8 January 2014 - wednesday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
  });
});
