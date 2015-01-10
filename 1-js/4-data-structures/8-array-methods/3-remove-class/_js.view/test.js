describe("removeClass", function() {

  it("ничего не делает, если класса нет", function() {
    var obj = { className: 'open menu' };
    removeClass(obj, 'new');
    assert.deepEqual(obj, {
      className: 'open menu'
    });
  });

  it("не меняет пустое свойство", function() {
    var obj = { className: '' };
    removeClass(obj, 'new');
    assert.deepEqual(obj, {
      className: ""
    });
  });

  it("удаляет класс, не оставляя лишних пробелов", function() {
    var obj = { className: 'open menu' };
    removeClass(obj, 'open');
    assert.deepEqual(obj, {
      className: "menu"
    });
  });

  it("если класс один и он удалён, то результат - пустая строка", function() {
    var obj = { className: "menu" };
    removeClass(obj, 'menu');
    assert.deepEqual(obj, {
      className: ""
    });
  });

});
