describe("getSums", function() {

  it("частичные суммы [1,2,3,4,5] равны [1,3,6,10,15]", function() {
    assert.deepEqual(getSums([1, 2, 3, 4, 5]), [1, 3, 6, 10, 15]);
  });

  it("частичные суммы [-2,-1,0,1] равны [-2,-3,-3,-2]", function() {
    assert.deepEqual(getSums([-2, -1, 0, 1]), [-2, -3, -3, -2]);
  });

  it("частичные суммы [] равны []", function() {
    assert.deepEqual(getSums([]), []);
  });

  it("частичные суммы [1] равны [1]", function() {
    assert.deepEqual(getSums([1]), [1]);
  });
});