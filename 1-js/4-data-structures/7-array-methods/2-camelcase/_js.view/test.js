describe("camelize", function() {

  it("оставляет пустую строку \"как есть\"", function() {
    assert.equal( camelize(""), "");
  });

  describe("делает заглавным первый символ после дефиса", function() {

    it("превращает background-color в backgroundColor", function() {
      assert.equal( camelize("background-color"), "backgroundColor");
    });

    it("превращает list-style-image в listStyleImage", function() {
      assert.equal( camelize("list-style-image"), "listStyleImage");
    });

    it("превращает -webkit-transition в WebkitTransition", function() {
      assert.equal( camelize("-webkit-transition"), "WebkitTransition");
    });
  });

});