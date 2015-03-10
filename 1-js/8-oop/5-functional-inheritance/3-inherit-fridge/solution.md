Решение:

```js
function Fridge(power) {
  // унаследовать
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

}
```

