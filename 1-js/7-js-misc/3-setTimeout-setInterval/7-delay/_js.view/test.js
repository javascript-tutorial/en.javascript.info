describe("delay", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it("вызывает функцию через указанный таймаут", function() {
    var start = Date.now();
    function f(x) {
      assert.equal(Date.now() - start, 1000);
    }
    f = sinon.spy(f);
    
    var f1000 = delay(f, 1000);
    f1000("test");
    this.clock.tick(2000);
    assert(f.calledOnce, 'calledOnce check fails');
  });

  it("передаёт аргументы и контекст", function() {
    var start = Date.now();
    var user = {
      sayHi: function(phrase, who) {
        assert.equal(this, user);
        assert.equal(phrase, "Привет");
        assert.equal(who, "Вася");
        assert.equal(Date.now() - start, 1500);
      }
    };
    
    user.sayHi = sinon.spy(user.sayHi);
    
    var spy = user.sayHi;
    user.sayHi = delay(user.sayHi, 1500);
    
    user.sayHi("Привет", "Вася");
    
    this.clock.tick(2000);
    
    assert(spy.calledOnce, 'проверка calledOnce не сработала');
  });
});