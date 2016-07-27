describe("unique", function() {
  it("убирает неуникальные элементы из массива", function() {
    var strings = ["кришна", "кришна", "харе", "харе",
      "харе", "харе", "кришна", "кришна", "8-()"
    ];

    assert.deepEqual(unique(strings), ["кришна", "харе", "8-()"]);
  });

  it("не изменяет исходный массив", function() {
    var strings = ["кришна", "кришна", "харе", "харе"];
    unique(strings);
    assert.deepEqual(strings, ["кришна", "кришна", "харе", "харе"]);
  });
});