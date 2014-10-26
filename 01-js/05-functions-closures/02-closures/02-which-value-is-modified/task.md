# В какую переменную будет присвоено значение?

[importance 5]

Каков будет результат выполнения этого кода?

```js
var value = 0;

function f() {  
  if (1) {
    value = true;
  } else {
    var value = false;
  }

  alert(value);
}

f();
```

Изменится ли внешняя переменная `value` ?

P.S. Какими будут ответы, если из строки `var value = false` убрать `var`?