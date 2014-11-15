describe("checkSpam", function() {
  it('считает спамом "buy ViAgRA now"', function() {
    assert.isTrue( checkSpam('buy ViAgRA now') );
  });

  it('считает спамом "free xxxxx"', function() {
    assert.isTrue( checkSpam('free xxxxx') );
  });

  it('не считает спамом "innocent rabbit"', function() {
    assert.isFalse( checkSpam('innocent rabbit') );
  });
});