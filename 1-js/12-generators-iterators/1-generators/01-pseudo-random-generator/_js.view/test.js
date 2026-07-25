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

    let generator3 = pseudoRandom(1234);
    let generator4 = pseudoRandom(12345);

    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
    assert.notDeepEqual(generator3.next(), generator4.next());
  });

});
