# Алгоритм решения

1. Создайте временный пустой массив `var results = []`.
2. Пройдите по элементам `arr` в цикле и заполните его.
3. Возвратите `results`.

# Решение

```js run
function filterRange(arr, a, b) {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      result.push(arr[i]);
    }
  }

  return result;
}

var arr = [5, 4, 3, 8, 0];

var filtered = filterRange(arr, 3, 5);
alert( filtered );
```

