describe("topSalary", function() {
  it("returns top-paid person", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( topSalary(salaries), "Pete" );
  });

  it("returns null for the empty object", function() {
    assert.isNull( topSalary({}) );
  });
});