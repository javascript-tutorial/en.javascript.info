describe("checkSpam", function() {
  it('finds spam in "buy ViAgRA now"', function() {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('finds spam in "free xxxxx"', function() {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('no spam in "innocent rabbit"', function() {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});