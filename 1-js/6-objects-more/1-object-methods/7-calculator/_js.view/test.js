sinon.stub(window, "prompt");

prompt.onCall(0).returns("2");
prompt.onCall(1).returns("3");

describe("calculator", function() {
  before(function() {
    calculator.read();
  });

  it("при вводе 2 и 3 сумма равна 5", function() {
    assert.equal( calculator.sum(), 5 );
  });

  it("при вводе 2 и 3 произведение равно 6", function() {
    assert.equal( calculator.mul(), 6 );
  });
});

after(function() {
  prompt.restore();
});