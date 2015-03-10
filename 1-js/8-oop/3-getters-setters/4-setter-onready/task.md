# Создать сеттер для onReady 

[importance 5]

Обычно когда кофе готов, мы хотим что-то сделать, например выпить его.

Сейчас при готовности срабатывает функция `onReady`, но она жёстко задана в коде:

```js
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    // ... проверки пропущены для краткости
    waterAmount = amount;
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };

*!*
  function onReady() {
      alert( 'Кофе готов!' );
    }
*/!*

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}
```

Создайте сеттер `setOnReady`, чтобы код снаружи мог назначить свой `onReady`, вот так:

```js
var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(150);

*!*
coffeeMachine.setOnReady(function() {
  var amount = coffeeMachine.getWaterAmount();
  alert( 'Готов кофе: ' + amount + 'мл' ); // Кофе готов: 150 мл
});
*/!*

coffeeMachine.run();
```

P.S. Значение `onReady` по умолчанию должно быть таким же, как и раньше.

P.P.S. Постарайтесь сделать так, чтобы `setOnReady` можно было вызвать не только до, но и *после* запуска кофеварки, то есть чтобы функцию `onReady` можно было изменить в любой момент до её срабатывания. 