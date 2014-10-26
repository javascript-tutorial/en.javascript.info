# Что не так в тесте? 

[importance 5]

Что не так в этом тесте функции `pow`?

```js
it("Возводит x в степень n", function() {
  var x = 5;

  var result = x;
  assert.equal( pow(x, 1), result );

  var result *= x;
  assert.equal( pow(x, 2), result );

  var result *= x;
  assert.equal( pow(x, 3), result );
});
```

P.S. Синтаксически он верен и работает, но спроектирован неправильно.