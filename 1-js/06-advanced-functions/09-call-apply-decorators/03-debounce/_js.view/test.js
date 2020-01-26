describe("debounce", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it("trigger the fuction execution immediately", function () {
    let mode;
    const f = () => mode='leading';
    
    debounce(f, 1000)(); // runs without a delay
  
    assert.equal(mode, 'leading');
  });
  
  it("calls the function at maximum once in ms milliseconds", function() {
    let log = '';

    function f(a) {
      log += a;
    }

    f = debounce(f, 1000);

    f(1); // runs at once
    f(2); // ignored

    setTimeout(() => f(3), 100);  // ignored (too early)
    setTimeout(() => f(4), 1100); // runs (1000 ms passed)
    setTimeout(() => f(5), 1500); // ignored (less than 1000 ms from the last run)

    this.clock.tick(5000);
    assert.equal(log, "14");
  });

  it("keeps the context of the call", function() {
    let obj = {
      f() {
        assert.equal(this, obj);
      }
    };

    obj.f = debounce(obj.f, 1000);
    obj.f("test");
  });

});
