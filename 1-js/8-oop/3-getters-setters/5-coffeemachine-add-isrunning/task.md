# Добавить метод isRunning

[importance 5]

Из внешнего кода мы хотели бы иметь возможность понять -- запущена кофеварка или нет.

Для этого добавьте кофеварке публичный метод `isRunning()`, который будет возвращать `true`, если она запущена и `false`, если нет.

Нужно, чтобы такой код работал:

```js
var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(100);

alert( 'До: ' + coffeeMachine.isRunning() ); // До: false

coffeeMachine.run();
alert( 'В процессе: ' + coffeeMachine.isRunning() ); // В процессе: true

coffeeMachine.setOnReady(function() {
  alert( "После: " + coffeeMachine.isRunning() ); // После: false
});
```

Исходный код возьмите из решения [предыдущей задачи](/task/setter-onReady).