describe("delay", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it("belgilangan vaqt tugashidan keyin funktsiyani chaqiradi", function() {
    let start = Date.now();

    function f(x) {
      assert.equal(Date.now() - start, 1000);
    }
    f = sinon.spy(f);

    let f1000 = delay(f, 1000);
    f1000("test");
    this.clock.tick(2000);
    assert(f.calledOnce, 'calledOnce tekshirish muvaffaqiyatsiz tugadi');
  });

  it("argumentlarni va this uzatadi", function() {
    let start = Date.now();
    let user = {
      sayHi: function(phrase, who) {
        assert.equal(this, user);
        assert.equal(phrase, "Hello");
        assert.equal(who, "John");
        assert.equal(Date.now() - start, 1500);
      }
    };

    user.sayHi = sinon.spy(user.sayHi);

    let spy = user.sayHi;
    user.sayHi = delay(user.sayHi, 1500);

    user.sayHi("Hello", "John");

    this.clock.tick(2000);

    assert(spy.calledOnce, 'calledOnce tekshirish amalga oshmadi');
  });
});
