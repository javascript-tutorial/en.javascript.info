describe("throttle(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.clock = sinon.useFakeTimers();
    f1000 = throttle(f, 1000);
  });

  it("the first call runs now", function() {
    f1000(1); // endi ishga tushiriladi
    assert.equal(log, "1");
  });

  it("then calls are ignored till 1000ms when the last call works", function() {
    f1000(2); // (trottling - oxirgi ishga tushurilgandan beri 1000 ms dan kamroq)
    f1000(3); // (trottling - oxirgi ishga tushurilgandan beri 1000 ms dan kamroq)
    // 1000 ms dan keyin f(3) chaqiruv rejalashtirilgan

    assert.equal(log, "1"); // hozir faqat birinchi chaqiruv amalga oshirildi

    this.clock.tick(1000); // 1000ms dan keyin...
    assert.equal(log, "13"); // log==13, f1000(3) raqamiga chaqiruv qilinadi
  });

  it("the third call waits 1000ms after the second call", function() {
    this.clock.tick(100);
    f1000(4); // (trottling - oxirgi ishga tushurilgandan beri 1000 ms dan kamroq)
    this.clock.tick(100);
    f1000(5); // (trottling - oxirgi ishga tushurilgandan beri 1000 ms dan kamroq)
    this.clock.tick(700);
    f1000(6); // (trottling - oxirgi ishga tushurilgandan beri 1000 ms dan kamroq)

    this.clock.tick(100); // endi 100 + 100 + 700 + 100 = 1000ms o'tadi

    assert.equal(log, "136"); // oxirgi chaqiruv f(6) edi
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
