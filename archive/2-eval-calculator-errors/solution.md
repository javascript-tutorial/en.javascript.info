Вычислить любое выражение нам поможет `eval`:

```js run
alert( eval("2+2") ); // 4
```

Считываем выражение в цикле `while(true)`. Если при вычислении возникает ошибка -- ловим её в `try..catch`.

Ошибкой считается, в том числе, получение `NaN` из `eval`, хотя при этом исключение не возникает. Можно бросить своё исключение в этом случае.

Код решения:

```js run demo
let expr, res;

while (true) {
  expr = prompt("Введите выражение?", '2-');
  if (expr == null) break;

  try {
    res = eval(expr);
    if (isNaN(res)) {
      throw new Error("Результат неопределён");
    }

    break;
  } catch (e) {
    alert( "Ошибка: " + e.message + ", повторите ввод" );
  }
}

alert( res );
```

