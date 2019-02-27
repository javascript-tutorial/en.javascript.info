describe("pseudoRandom", function() {

  it("follows the formula", function() {
    let generator = pseudoRandom(1);

    assert.equal(generator.next().value, 16807);
    assert.equal(generator.next().value, 282475249);
    assert.equal(generator.next().value, 1622650073);
  });


  it("returns same value for the same seed", function() {
    let generator1 = pseudoRandom(123);
    let generator2 = pseudoRandom(123);

    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
  });

});
