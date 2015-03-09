var buffer;
beforeEach(function() {
  buffer = makeBuffer();
});

it("возвращает пустую строку по умолчанию", function() {
  assert.strictEqual(buffer(), "");
});

it("добавляет аргументы в буффер", function() {
  buffer('Замыкания');
  buffer(' Использовать');
  buffer(' Нужно!');
  assert.equal(buffer(), 'Замыкания Использовать Нужно!');
});

it("приводит всё к строке", function() {
  buffer(null);
  buffer(false);
  assert.equal(buffer(), "nullfalse");
});