describe("truncate", function() {
  it("truncate the long string to the given lenth (including the ellipsis)", function() {
    assert.equal(
      truncate("What I'd like to tell on this topic is:", 20),
      "What I'd like to te…"
    );
  });

  it("doesn't change short strings", function() {
    assert.equal(
      truncate("Hi everyone!", 20),
      "Hi everyone!"
    );
  });

});