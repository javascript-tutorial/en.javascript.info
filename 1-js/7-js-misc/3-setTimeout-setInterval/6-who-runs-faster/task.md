# Кто быстрее?

[importance 5]

Есть два бегуна:

```js
var runner1 = new Runner();
var runner2 = new Runner();
```

У каждого есть метод `step()`, который делает шаг, увеличивая свойство `steps`. 

Конкретный код метода `step()` не имеет значения, важно лишь что шаг делается не мгновенно, он требует небольшого времени. 

Если запустить первого бегуна через `setInterval`, а второго -- через вложенный `setTimeout` -- какой сделает больше шагов за 5 секунд?

```js
// первый?
setInterval(function() {
  runner1.step();
}, 15);

// или второй?
setTimeout(function go() {
  runner2.step();
  setTimeout(go, 15);
}, 15);

setTimeout(function() {
  alert( runner1.steps );
  alert( runner2.steps );
}, 5000);
```

