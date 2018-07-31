describe("spy", function() {
  it("records calls into its property", function() {
    function work() {}

    work = spy(work);
    assert.deepEqual(work.calls, []);

    work(1, 2);
    assert.deepEqual(work.calls, [
      [1, 2]
    ]);

    work(3, 4);
    assert.deepEqual(work.calls, [
      [1, 2],
      [3, 4]
    ]);
  });

  it("transparently wraps functions", function() {

    let sum = sinon.spy((a, b) => a + b);

    let wrappedSum = spy(sum);

    assert.equal(wrappedSum(1, 2), 3);
    assert(sum.calledWith(1, 2));
  });


  it("transparently wraps methods", function() {

    let calc = {
      sum: sinon.spy((a, b) => a + b)
    };

    calc.wrappedSum = spy(calc.sum);

    assert.equal(calc.wrappedSum(1, 2), 3);
    assert(calc.sum.calledWith(1, 2));
    assert(calc.sum.calledOn(calc));
  });

});
