describe("makeLogging", function() {
  it("записывает вызовы в массив log", function() {
    var work = sinon.spy();

    var log = [];
    work = makeLogging(work, log);
    assert.deepEqual(log, []);

    work(1, 2);
    assert.deepEqual(log, [
      [1, 2]
    ]);

    work(3, 4);
    assert.deepEqual(log, [
      [1, 2],
      [3, 4]
    ]);
  });

  it("передаёт вызов функции, возвращает её результат", function() {
    var log = [];

    function sum(a, b) {
      return a + b;
    }

    sum = sinon.spy(sum);
    var spy = sum;
    sum = makeLogging(sum, log);

    assert.equal(sum(1, 2), 3);
    assert(spy.calledWith(1, 2));
  });


  it("сохраняет контекст вызова для методов объекта", function() {
    var log = [];

    var calculator = {
      sum: function(a, b) {
        return a + b;
      }
    }

    calculator.sum = sinon.spy(calculator.sum);
    var spy = calculator.sum;
    calculator.sum = makeLogging(calculator.sum, log);

    assert.equal(calculator.sum(1, 2), 3);
    assert(spy.calledWith(1, 2));
    assert(spy.calledOn(calculator));
  });

});