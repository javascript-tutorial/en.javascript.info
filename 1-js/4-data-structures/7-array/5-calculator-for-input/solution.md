В решение ниже обратите внимание: мы не приводим `value` к числу сразу после `prompt`, так как если сделать `value = +value`, то после этого отличить пустую строку от нуля уже никак нельзя. А нам здесь нужно при пустой строке прекращать ввод, а при нуле -- продолжать.

```js run demo
var numbers = [];

while (true) {

  var value = prompt("Введите число", 0);

  if (value === "" || value === null || isNaN(value)) break;

  numbers.push(+value);
}

var sum = 0;
for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

alert( sum );
```

