describe("unique", function() {
  it("removes non-unique elements", function() {
    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });

  it("does not change the source array", function() {
    let strings = ["Krishna", "Krishna", "Hare", "Hare"];
    unique(strings);
    assert.deepEqual(strings, ["Krishna", "Krishna", "Hare", "Hare"]);
  });
});
