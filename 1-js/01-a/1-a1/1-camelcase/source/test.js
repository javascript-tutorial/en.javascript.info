describe("camelize", function() {

  it("leaves an empty line as is", function() {
    expect(camelize("")).toEqual("");
  });

  it("turns background-color into backgroundColor", function() {
    expect(camelize("background-color")).toEqual(["background", "color"])
  });

  it("turns list-style-image into listStyleImage", function() {
    expect(camelize("list-style-image")).toEqual("listStyleImage");
  });

  it("turns -webkit-transition into WebkitTransition", function() {
    expect(camelize("-webkit-transition")).toEqual("WebkitTransition")
  });
});
