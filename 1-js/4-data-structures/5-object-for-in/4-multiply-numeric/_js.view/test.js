describe("multiplyNumeric", function() {
  it("умножает численные свойства на 2", function() {
    var menu = {
      width: 200,
      height: "300",
      title: "Моё меню"
    };
    multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "Моё меню");
  });
});