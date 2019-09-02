The test demonstrates one of the temptations a developer meets when writing tests.

What we have here is actually 3 tests, but layed out as a single function with 3 asserts.

Sometimes it's easier to write this way, but if an error occurs, it's much less obvious what went wrong.

If an error happens in the middle of a complex execution flow, then we'll have to figure out the data at that point. We'll actually have to *debug the test*.

It would be much better to break the test into multiple `it` blocks with clearly written inputs and outputs.

Like this:
```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

We replaced the single `it` with `describe` and a group of `it` blocks. Now if something fails we would see clearly what the data was.

Also we can isolate a single test and run it in standalone mode by writing `it.only` instead of `it`:


```js
describe("Raises x to power n", function() {
  it("5 in the power of 1 equals 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha will run only this block
  it.only("5 in the power of 2 equals 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 in the power of 3 equals 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
