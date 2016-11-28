describe("Тест", function() {

  before(function() {
    alert("Начало всех тестов");
  });
  after(function() {
    alert("Окончание всех тестов");
  });

  beforeEach(function() {
    alert("Вход в тест");
  });
  afterEach(function() {
    alert("Выход из теста");
  });

  it('тест 1', function() {
    alert('1');
  });
  it('тест 2', function() {
    alert('2');
  });

});