describe("formatDate", function() {
  it("выводит дату 1мс назад как \"только что\"", function() {
    assert.equal( formatDate( new Date(new Date - 1) ), 'только что' );
  });

  it('выводит дату "30 сек назад"', function() {
    assert.equal( formatDate( new Date( new Date - 30*1000) ), "30 сек. назад" );
  });

  it('выводит дату "5 мин назад"', function() {
    assert.equal( formatDate( new Date( new Date- 5*60*1000) ), "5 мин. назад");
  });

  it("выводит старую дату в формате дд.мм.гг чч:мм", function() {
    assert.equal( formatDate( new Date(2014, 2, 1, 11, 22, 33) ), "01.03.14 11:22" ); 
  });

});