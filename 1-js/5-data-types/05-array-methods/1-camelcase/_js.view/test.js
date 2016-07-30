describe("camelize", function() {

  it("leaves an empty line as is", function() {
    assert.equal(camelize(""), "");
  });

  it("turns background-color into backgroundColor", function() {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("turns list-style-image into listStyleImage", function() {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("turns -webkit-transition into WebkitTransition", function() {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });

});