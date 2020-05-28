describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('for one call - runs it after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'not called immediately');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), 'called after 1000ms');
  });

  it('for 3 calls - runs the last one after given ms', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // ignored (too early)
    setTimeout(() => debounced('c'), 500); // runs (1000 ms passed)
    this.clock.tick(1000);

    assert(f.notCalled, 'not called after 1000ms');

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), 'called after 1500ms');
  });

  it('keeps the context of the call', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
  
});
