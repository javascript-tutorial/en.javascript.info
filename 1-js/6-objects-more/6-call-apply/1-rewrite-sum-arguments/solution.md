# Первый вариант

```js
//+ run
function sumArgs() {
  // скопируем reduce из массива
  arguments.reduce = [].reduce;
  return arguments.reduce(function(a, b) {
    return a + b;
  });
}

alert( sumArgs(4, 5, 6) ); // 15
```

# Второй вариант

Метод `call` здесь вполне подойдёт, так как требуется вызвать `reduce` в контексте `arguments` с одним аргументом.

```js
//+ run
function sumArgs() {
  // запустим reduce из массива напрямую
  return [].reduce.call(arguments, function(a, b) {
    return a + b;
  });
}

alert( sumArgs(4, 5, 6) ); // 15
```

