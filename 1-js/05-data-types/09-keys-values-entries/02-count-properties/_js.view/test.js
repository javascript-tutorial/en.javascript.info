describe("count", function () {
  it("mulklar sonini hisoblaydi", function () {
    assert.equal(count({ a: 1, b: 2 }), 2);
  });

  it("bo'sh ob'ekt uchun 0 qaytaradi", function () {
    assert.equal(count({}), 0);
  });

  it("ramziy xususiyatlarni e'tiborsiz qoldiradi", function () {
    assert.equal(count({ [Symbol("id")]: 1 }), 0);
  });
});
