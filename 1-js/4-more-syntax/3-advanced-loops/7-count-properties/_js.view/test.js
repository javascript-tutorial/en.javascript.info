describe("count", function() {
  it("counts the number of properties", function() {
    assert.equal( count({a: 1, b: 2}), 2 );
  });

  it("returns 0 for an empty object", function() {
    assert.equal( count({}), 0 );
  });

  it("ignores symbolic properties", function() {
    assert.equal( count({ [Symbol('id')]: 1 }), 0 );
  });
});