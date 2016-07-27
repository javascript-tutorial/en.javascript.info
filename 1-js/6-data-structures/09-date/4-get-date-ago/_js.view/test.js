describe("getDateAgo", function() {

  it("1 день до 02.01.2015 -> число 1", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });


  it("2 день до 02.01.2015 -> число 31", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("100 дней от 02.01.2015 -> число 24", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("365 дней от 02.01.2015 -> число 2", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("не меняет переданный объект Date", function() {
    var date = new Date(2015, 0, 2);
    var dateCopy = new Date(date);
    getDateAgo(dateCopy, 100);
    assert.equal(date.getTime(), dateCopy.getTime());
  });

});