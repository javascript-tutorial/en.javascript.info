describe("Article.showStats", function() {
  before(function() {
    sinon.stub(window, "alert");
    this.clock = sinon.useFakeTimers();
  });

  after(function() {
    window.alert.restore();
    this.clock.restore();
  });

  it("Выводит число статей и дату создания последней", function() {
    new Article();
    this.clock.tick(100);
    new Article();
    Article.showStats();

    assert(alert.calledWith('Всего: 2, Последняя: ' + new Date()));
  });

  it("и ещё одна статья...", function() {
    this.clock.tick(100);
    new Article();
    Article.showStats();

    assert(alert.calledWith('Всего: 3, Последняя: ' + new Date()));
  });
});