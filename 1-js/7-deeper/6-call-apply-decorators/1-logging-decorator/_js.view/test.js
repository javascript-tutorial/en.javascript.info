describe("makeLogging", function() {
  it("записывает вызовы в массив log", function() {
    var work = sinon.spy();

    var log = [];
    work = makeLogging(work, log);
    assert.deepEqual(log, []);

    work(1);
    assert.deepEqual(log, [1]);

    work(2);
    assert.deepEqual(log, [1, 2]);
  });

  it("передаёт вызов функции, возвращает её результат", function() {
    var log = [];

    function work(x) {
      return x * 2;
    }

    work = sinon.spy(work);
    var spy = work;
    work = makeLogging(work, log);

    assert.equal(work(1), 2);
    assert(spy.calledWith(1));
  });


  it("сохраняет контекст вызова для методов объекта", function() {
    var log = [];

    var calculator = {
      double: function(x) {
        return x * 2;
      }
    }

    calculator.double = sinon.spy(calculator.double);
    var spy = calculator.double;
    calculator.double = makeLogging(calculator.double, log);

    assert.equal(calculator.double(1), 2);
    assert(spy.calledWith(1));
    assert(spy.calledOn(calculator));
  });

});