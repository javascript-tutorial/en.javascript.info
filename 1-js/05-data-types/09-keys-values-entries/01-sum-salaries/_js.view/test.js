describe("sumSalaries", function() {
  it("returns sum of salaries", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( sumSalaries(salaries), 650 );
  });

  it("returns 0 for the empty object", function() {
    assert.strictEqual( sumSalaries({}), 0);
  });
});