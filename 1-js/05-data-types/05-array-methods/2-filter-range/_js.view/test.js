describe("filterRange", function () {
  it("filtrlangan qiymatlarni qaytaradi", function () {
    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(filtered, [3, 1]);
  });

  it("massivni o'zgartirmaydi", function () {
    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    assert.deepEqual(arr, [5, 3, 8, 1]);
  });
});
