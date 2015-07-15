
# Промисифицировать setTimeout

Напишите функцию `delay(ms)`, которая возвращает промис, переходящий в состояние `"resolved"` через `ms` миллисекунд.

Пример использования:
```js
delay(1000)
  .then(() => alert("Hello!"))
```

Такая полезна для использования в других промис-цепочках.

Вот такой вызов:
```js
return new Promise((resolve, reject) => {
  setTimeout(() => {
    doSomeThing();
    resolve();
  }, ms)
});
```

Станет возможным переписать так:
```js
return delay(ms).then(doSomething);
```
