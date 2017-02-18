The test demonstrates one of temptations a developer meets when writing tests.

What we have here is actually 3 tests, but layed out as a single function with 3 asserts.

Sometimes it's easier to write this way, but if an error occurs, it's much less obvious what went wrong.

If an error happens inside a complex execution flow, then we'll have to figure out what was the data at that point.

TODO

Если в сложном тесте произошла ошибка где-то посередине потока вычислений, то придётся выяснять, какие конкретно были входные и выходные данные на этот момент, то есть по сути -- отлаживать код самого теста.

Гораздо лучше будет разбить тест на несколько блоков `it`, с чётко прописанными входными и выходными данными.

```js
describe("Возводит x в степень n", function() {
  it("5 в степени 1 равно 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 в степени 2 равно 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 в степени 3 равно 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Можно использовать цикл для генерации блоков `it`, в этом случае важно, чтобы сам код такого цикла был достаточно простым. Иногда проще записать несколько блоков `it` вручную, как сделано выше, чем "городить огород" из синтаксических конструкций.
