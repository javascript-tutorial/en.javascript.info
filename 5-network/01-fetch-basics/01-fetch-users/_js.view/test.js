describe("getUsers", function() {

  it("gets users from GitHub", async function() {
    let users = getUsers(['iliakan', 'remy', 'no.such.users']);
    assert.equal(users[0].login, 'iliakan');
    assert.equal(users[1].login, 'remy');
    assert.equal(users[2], null);
  });

});
