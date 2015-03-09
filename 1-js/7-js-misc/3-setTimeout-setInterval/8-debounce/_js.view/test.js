describe("debounce", function() {
  before(function() {
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    this.clock.restore();
  });

  it("вызывает функцию не чаще чем раз в ms миллисекунд", function() {
    var log = '';

    function f(a) {
      log += a;
    }

    f = debounce(f, 1000);

    f(1); // выполнится сразу же
    f(2); // игнор

    setTimeout(function() {
      f(3)
    }, 100); // игнор (рановато)
    setTimeout(function() {
      f(4)
    }, 1100); // выполнится (таймаут прошёл)
    setTimeout(function() {
      f(5)
    }, 1500); // игнор

    this.clock.tick(5000);
    assert.equal(log, "14");
  });

  it("сохраняет контекст вызова", function() {
    var obj = {
      f: function() {
        assert.equal(this, obj);
      }
    };

    obj.f = debounce(obj.f, 1000);
    obj.f("test");
  });

});