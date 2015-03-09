describe("makeCaching", function() {

  it("запоминает предыдущее значение функции с таким аргументом", function() {
    function f(x) {
      return Math.random() * x;
    }

    f = makeCaching(f);

    var a = f(1);
    var b = f(1);
    assert.equal(a, b);

    var anotherValue = f(2);
    // почти наверняка другое значение
    assert.notEqual(a, anotherValue);
  });

  it("сохраняет контекст вызова", function() {
    var obj = {
      spy: sinon.spy()
    };

    var spy = obj.spy;
    obj.spy = makeCaching(obj.spy);
    obj.spy(123);
    assert(spy.calledWith(123));
    assert(spy.calledOn(obj));
  });

});