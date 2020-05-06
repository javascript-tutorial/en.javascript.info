describe("debounce", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it("for one call - runs it after given ms", function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000); 
  
    debounced("test");
    assert(f.notCalled);
    this.clock.tick(1000);
    assert(f.calledOnceWith("test"));
  });
  
  it("for 3 calls - runs the last one after given ms", function() {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    f("a")
    setTimeout(() => f("b"), 200);  // ignored (too early)
    setTimeout(() => f("c"), 500); // runs (1000 ms passed)
    this.clock.tick(1000);

    assert(f.notCalled);

    this.clock.tick(500);

    assert(f.calledOnceWith('c'));
  });

  it("keeps the context of the call", function() {
    let obj = {
      f() {
        assert.equal(this, obj);
      }
    };

    obj.f = debounce(obj.f, 1000);
    obj.f("test");
    this.clock.tick(5000);
  });

});
