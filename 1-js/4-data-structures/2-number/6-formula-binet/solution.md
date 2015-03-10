

```js
//+ run
function fibBinet(n) {
  var phi = (1 + Math.sqrt(5)) / 2;
  // используем Math.round для округления до ближайшего целого
  return Math.round(Math.pow(phi, n) / Math.sqrt(5));
}

function fib(n) {
  var a = 1,
    b = 0,
    x;
  for (i = 0; i < n; i++) {
    x = a + b;
    a = b
    b = x;
  }
  return b;
}

alert( fibBinet(2) ); // 1, равно fib(2) 
alert( fibBinet(8) ); // 21, равно fib(8)
*!*
alert( fibBinet(77) ); // 5527939700884755
alert( fib(77) ); // 5527939700884757, не совпадает!
*/!*
```

**Результат вычисления <code>F<sub>77</sub></code> получился неверным!** 

Причина -- в ошибках округления, ведь √5 -- бесконечная дробь. 

Ошибки округления при вычислениях множатся и, в итоге, дают расхождение.