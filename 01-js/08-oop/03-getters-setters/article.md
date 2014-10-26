# Геттеры и сеттеры

Для *управляемого* доступа к состоянию объекта используют специальные функции, так называемые "геттеры" и "сеттеры".
[cut]

## Геттер и сеттер для воды

На текущий момент количество воды в кофеварке является публичным свойством `waterAmount`:

```js
//+ run
function CoffeeMachine(power) {
  // количество воды в кофеварке
  this.waterAmount = 0;

  ...
}
```

Это немного опасно. Ведь в это свойство можно записать произвольное количество воды, хоть весь мировой океан.

```js
// не помещается в кофеварку!
coffeeMachine.waterAmount = 1000000;
```

Это ещё ничего, гораздо хуже, что можно наоборот -- вылить больше, чем есть:

```js
// и не волнует, было ли там столько воды вообще!
coffeeMachine.waterAmount -= 1000000;
```

Так происходит потому, что свойство полностью доступно снаружи.

Чтобы не было таких казусов, нам нужно ограничить контроль над свойством со стороны внешнего кода.

**Для лучшего контроля над свойством его делают приватным, а запись значения осуществляется через специальный метод, который называют *"сеттер"* (setter method).**

Типичное название для сеттера -- `setСвойство`, например, в случае с кофеваркой таким сеттером будет метод `setWaterAmount`:

```js
//+ run
function CoffeeMachine(power, capacity) { // capacity - ёмкость кофеварки
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;
  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

*!*
  // "умная" установка свойства
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };
*/!*

  function onReady() {
    alert('Кофе готов!');
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(600); // упс, ошибка!
```

Теперь `waterAmount` -- внутреннее свойство, его можно записать (через сеттер), но, увы, нельзя прочитать.

**Для того, чтобы дать возможность внешнему коду узнать его значение, создадим специальную функцию -- "геттер" (getter method).** 

Геттеры обычно имеют название вида `getСвойство`, в данном случае `getWaterAmount`:

```js
//+ run
function CoffeeMachine(power, capacity) {
  //...
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

*!*
  this.getWaterAmount = function() {
    return waterAmount;
  };
*/!*
}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(450); 
alert( coffeeMachine.getWaterAmount() ); // 450
```

## Единый геттер-сеттер

**Для большего удобства иногда делают единый метод, который называется так же, как свойство и отвечает *и за запись и за чтение*.**

При вызове без параметров такой метод возвращает свойство, а при передаче параметра -- назначает его. 

Выглядит это так:

```js
//+ run
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

*!*
  this.waterAmount = function(amount) {
*/!*
    // вызов без параметра, значит режим геттера, возвращаем свойство
    if (!arguments.length) return waterAmount;

    // иначе режим сеттера
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);

// пример использования
*!*
coffeeMachine.waterAmount(450); 
alert( coffeeMachine.waterAmount() ); // 450
*/!*
```

Единый геттер-сеттер используется реже, чем две отдельные функции, но в некоторых JavaScript-библиотеках, например [jQuery](http://jquery.com) и [D3](http://d3js.org) подобный подход принят на уровне концепта. 

## Задачи

