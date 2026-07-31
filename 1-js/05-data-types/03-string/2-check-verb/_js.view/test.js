describe("checkVerb", function() {
  it('finds verb in "You Should Move"', function() {
    assert.isTrue(checkVerb('You Should Move'));
  });

  it('finds verb in "I am going for a swim"', function() {
    assert.isTrue(checkVerb('I am going for a swim'));
  });

  it('no verb in "innocent rabbit"', function() {
    assert.isFalse(checkVerb('innocent rabbit'));
  });
});