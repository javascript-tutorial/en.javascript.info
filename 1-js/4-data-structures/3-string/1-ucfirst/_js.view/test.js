describe("ucFirst", function() {
  it('делает первый символ заглавным', function() {
    assert.strictEqual( ucFirst("вася"), "Вася" );
  });
 
  it('для пустой строки возвращает пустую строку', function() {
    assert.strictEqual( ucFirst(""), "" );
  });
});
