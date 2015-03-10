

```js
//+ run
function Machine(power) {
  this._power = power;
  this._enabled = false;

  var self = this;

  this.enable = function() {
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };
}

function Fridge(power) {
  Machine.apply(this, arguments);

  var food = []; // приватное свойство food

  this.addFood = function() {
    if (!this._enabled) {
      throw new Error("Холодильник выключен");
    }
    if (food.length + arguments.length >= this._power / 100) {
      throw new Error("Нельзя добавить, не хватает мощности");
    }
    for (var i = 0; i < arguments.length; i++) {
      food.push(arguments[i]); // добавить всё из arguments
    }

  };

  this.getFood = function() {
    // копируем еду в новый массив, чтобы манипуляции с ним не меняли food
    return food.slice();
  };

  this.filterFood = function(filter) {
    return food.filter(filter);
  };

  this.removeFood = function(item) {
    var idx = food.indexOf(item);
    if (idx != -1) food.splice(idx, 1);
  };

*!*
  var parentDisable = this.disable;
  this.disable = function() {
    if (food.length) {
      throw new Error("Нельзя выключить: внутри еда");
    }
    parentDisable();
  };
*/!*
}

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("кус-кус");
fridge.disable(); // ошибка, в холодильнике есть еда
```

