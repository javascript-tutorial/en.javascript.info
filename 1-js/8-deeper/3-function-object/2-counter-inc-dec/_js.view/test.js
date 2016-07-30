describe("counter", function() {

  it("increases from call to call", function() {

    let counter = makeCounter();

    assert.equal( counter(), 0 ); 
    assert.equal( counter(), 1 ); 
    assert.equal( counter(), 2 ); 
  });

  
  describe("counter.set", function() {
    it("sets the count", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 
      assert.equal( counter(), 11 ); 
    });
  });
  
  describe("counter.decrease", function() {
    it("decreases the count", function() {

      let counter = makeCounter();

      counter.set(10);

      assert.equal( counter(), 10 ); 

      counter.decrease();

      assert.equal( counter(), 10 ); 

    });
  });

});