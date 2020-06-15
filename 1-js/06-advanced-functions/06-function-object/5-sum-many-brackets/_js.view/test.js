describe("sum", function(){
  
  it("sum(1)(2) == 3", function(){
    assert.equal(3, sum(1)(2));
  });

  it("sum(5)(-1)(2) == 6", function(){
    assert.equal(6, sum(5)(-1)(2));
  });
  
  it("sum(6)(-1)(-2)(-3) == 0", function(){
    assert.equal(0, sum(6)(-1)(-2)(-3));
  });

  it("sum(0)(1)(2)(3)(4)(5) == 15", function(){
    assert.equal(15, sum(0)(1)(2)(3)(4)(5));
  });
});

