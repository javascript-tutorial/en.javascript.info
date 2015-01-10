describe("aclean", function() {
 
  it("удаляет анаграммы", function() {
    var arr = ["воз", "киборг", "корсет", "зов", "гробик", "костер", "сектор"];
    assert.sameMembers(aclean(arr), ["гробик", "зов", "сектор"]);
  });
 
  it("не различает регистр символов", function() {
    var arr = ["воз", "ЗОВ"];
    assert.equal( aclean(arr).length, 1 );
  });

});    
