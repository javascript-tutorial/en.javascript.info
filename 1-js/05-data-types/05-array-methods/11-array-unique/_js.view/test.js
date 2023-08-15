describe("unique", function () {
  it("noyob bo'lmagan elementlarni olib tashlaydi", function () {
    let strings = [
      "Hare",
      "Krishna",
      "Hare",
      "Krishna",
      "Krishna",
      "Krishna",
      "Hare",
      "Hare",
      ":-O",
    ];

    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });

  it("manba massivini o'zgartirmaydi", function () {
    let strings = ["Krishna", "Krishna", "Hare", "Hare"];
    unique(strings);
    assert.deepEqual(strings, ["Krishna", "Krishna", "Hare", "Hare"]);
  });
});
