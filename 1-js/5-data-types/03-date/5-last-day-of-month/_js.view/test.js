describe("getLastDayOfMonth", function() {
  it("last day of 01.01.2012 - 31", function() {
    assert.equal(getLastDayOfMonth(2012, 0), 31);
  });

  it("last day of 01.02.2012 - 29 (leap year)", function() {
    assert.equal(getLastDayOfMonth(2012, 1), 29);
  });

  it("last day of 01.02.2013 - 28", function() {
    assert.equal(getLastDayOfMonth(2013, 1), 28);
  });
});
