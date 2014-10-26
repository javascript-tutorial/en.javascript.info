

```js
//+ run
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  Object.defineProperty(this, "waterAmount", {

    get: function() {
      return waterAmount;
    },

    set: function(amount) {
      if (amount > capacity) {
        throw new Error("Нельзя залить больше, чем " + capacity);
      }

      waterAmount = amount;
    }
  });
}

var coffeeMachine = new CoffeeMachine(1000, 300);
coffeeMachine.waterAmount = 500;
```

