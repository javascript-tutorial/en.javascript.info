

```js
//+ run
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

  function onReady() {
    alert( 'Кофе готов!' );
  }

*!*
  this.setOnReady = function(newOnReady) {
    onReady = newOnReady;
  };
*/!*

  this.run = function() {
*!*
    setTimeout(function() {
      onReady();
    }, getTimeToBoil());
*/!*
  };

}

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(150);

coffeeMachine.run();

*!*
coffeeMachine.setOnReady(function() {
  var amount = coffeeMachine.getWaterAmount();
  alert( 'Готов кофе: ' + amount + 'мл' ); // Готов кофе: 150 мл
});
*/!*
```

Обратите внимание на два момента в решении:
<ol>
<li>В сеттере `setOnReady` параметр называется `newOnReady`. Мы не можем назвать его `onReady`, так как тогда изнутри сеттера мы никак не доберёмся до внешнего (старого значения):

```js
// нерабочий вариант
this.setOnReady = function(onReady) {
  onReady = onReady; // ??? внешняя переменная onReady недоступна
};
```

</li>
<li>Чтобы `setOnReady` можно было вызывать в любое время, в `setTimeout` передаётся не `onReady`, а анонимная функция `function() { onReady() }`, которая возьмёт текущий (установленный последним) `onReady` из замыкания.</li>
</ol>