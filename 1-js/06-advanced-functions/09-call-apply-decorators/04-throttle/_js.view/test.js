describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    f1000 = throttle(f, 1000);
    this.clock = sinon.useFakeTimers();
  });

  it("the first call runs now", function() {
    f1000(1); // runs now
    assert.equal(log, "1");
  });

  it("then calls are ignored till 1000ms when the last call works", function() {
    f1000(2); // (throttling - less than 1000ms since the last run)
    f1000(3); // (throttling - less than 1000ms since the last run)
    // after 1000 ms f(3) call is scheduled

    assert.equal(log, "1"); // right now only the 1st call done

    this.clock.tick(1000); // after 1000ms...
    assert.equal(log, "13"); // log==13, the call to f1000(3) is made
  });

  it("the third call waits 1000ms after the second call", function() {
    this.clock.tick(100);
    f1000(4); // (throttling - less than 1000ms since the last run)
    this.clock.tick(100);
    f1000(5); // (throttling - less than 1000ms since the last run)
    this.clock.tick(700);
    f1000(6); // (throttling - less than 1000ms since the last run)

    this.clock.tick(100); // now 100 + 100 + 700 + 100 = 1000ms passed

    assert.equal(log, "136"); // the last call was f(6)
  });

  after(function() {
    this.clock.restore();
  });

});

describe('throttle', () => {

  it('runs a forwarded call once', done => {
    let log = '';
    const f = str => log += str;
    const f10 = throttle(f, 10);
    f10('once');

    setTimeout(() => {
      assert.equal(log, 'once');
      done();
    }, 20);
  });

});
