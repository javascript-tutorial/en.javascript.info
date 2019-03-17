describe("concat", function() {
  let chunks = [
    new Uint8Array([0, 1, 2]),
    new Uint8Array([3, 4, 5]),
    new Uint8Array([6, 7, 8])
  ];

  it("result has the same array type", function() {

    let result = concat(chunks);

    assert.equal(result.constructor, Uint8Array);
  });

  it("concatenates arrays", function() {

    let result = concat(chunks);

    assert.deepEqual(result, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));

  });

  it("returns empty array on empty input", function() {

    let result = concat([]);

    assert.equal(result.length, 0);

  });

});
