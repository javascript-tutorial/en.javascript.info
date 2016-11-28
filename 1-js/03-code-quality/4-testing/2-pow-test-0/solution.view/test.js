describe("pow", function() {

  describe("возводит x в степень n", function() {

    function makeTest(x) {
      var expected = x * x * x;
      it("при возведении " + x + " в степень 3 результат: " + expected, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (var x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  it("при возведении в отрицательную степень результат NaN", function() {
    assert(isNaN(pow(2, -1)), "pow(2, -1) не NaN");
  });

  it("при возведении в дробную степень результат NaN", function() {
    assert(isNaN(pow(2, 1.5)), "pow(2, -1.5) не NaN");
  });

  describe("любое число, кроме нуля, в степени 0 равно 1", function() {

    function makeTest(x) {
      it("при возведении " + x + " в степень 0 результат: 1", function() {
        assert.equal(pow(x, 0), 1);
      });
    }

    for (var x = -5; x <= 5; x += 2) {
      makeTest(x);
    }

  });

  it("ноль в нулевой степени даёт NaN", function() {
    assert(isNaN(pow(0, 0)), "0 в степени 0 не NaN");
  });

});