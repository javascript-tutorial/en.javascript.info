describe("groupById", function () {
  it("id bo'yicha guruhlangan ob'ektni yaratadi", function () {
    let users = [
      { id: "john", name: "John Smith", age: 20 },
      { id: "ann", name: "Ann Smith", age: 24 },
      { id: "pete", name: "Pete Peterson", age: 31 },
    ];

    assert.deepEqual(groupById(users), {
      john: { id: "john", name: "John Smith", age: 20 },
      ann: { id: "ann", name: "Ann Smith", age: 24 },
      pete: { id: "pete", name: "Pete Peterson", age: 31 },
    });
  });

  it("bo'sh massiv bilan ishlaydi", function () {
    users = [];
    assert.deepEqual(groupById(users), {});
  });
});
