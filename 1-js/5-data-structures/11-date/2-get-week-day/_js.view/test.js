describe("getWeekDay", function() {
  it("3 января 2014 - пятница", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), 'пт');
  });

  it("4 января 2014 - суббота", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), 'сб');
  });

  it("5 января 2014 - воскресенье", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), 'вс');
  });

  it("6 января 2014 - понедельник", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), 'пн');
  });

  it("7 января 2014 - вторник", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), 'вт');
  });

  it("8 января 2014 - среда", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), 'ср');
  });

  it("9 января 2014 - четверг", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), 'чт');
  });
});