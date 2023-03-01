describe("army", function() {

  let army;
  
  before(function() {
    army = makeArmy();
    window.alert = sinon.stub(window, "alert");
  });

  it("army[0] 0 ko'rsatadi", function() {
    army[0]();
    assert(alert.calledWith(0));
  });


  it("army[5] 5 ko'rsatadi", function() {
    army[5]();
    assert(alert.calledWith(5));
  });

  after(function() {
    window.alert.restore();
  });

});
