describe('debounce', function () {
  before(function () {
    this.clock = sinon.useFakeTimers();
  });

  after(function () {
    this.clock.restore();
  });

  it('bitta chaqiruv uchun - berilgan msdan keyin uni ishga tushiradi', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('test');
    assert(f.notCalled, 'darhol chaqirilmaydi');
    this.clock.tick(1000);
    assert(f.calledOnceWith('test'), '1000msdan keyin chaqiriladi');
  });

  it('3 ta chaqiruv uchun - berilgan msdan keyin oxirgisini ishga tushiradi', function () {
    const f = sinon.spy();
    const debounced = debounce(f, 1000);

    debounced('a');
    setTimeout(() => debounced('b'), 200); // e'tibor berilmagan (juda erta)
    setTimeout(() => debounced('c'), 500); // ishlaydi (1000 ms o'tdi)
    this.clock.tick(1000);

    assert(f.notCalled, "1000ms dan so'ng chaqirilmaydi");

    this.clock.tick(500);

    assert(f.calledOnceWith('c'), '1500ms dan keyin chaqiriladi');
  });

  it('chaqiruv kontekstini saqlaydi', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = debounce(obj.f, 1000);
    obj.f('test');
    this.clock.tick(5000);
  });
  
});
