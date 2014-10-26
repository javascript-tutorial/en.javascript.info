# Заменить свойство на встроенные геттеры/сеттеры

[importance 5]

Вам попал в руки код кофеварки, который использует свойство `this.waterAmount` для хранения количества воды:

```js
function CoffeeMachine(power, capacity) {
  // количество воды в кофеварке
  this.waterAmount = 0;
}

// создать кофеварку
var coffeeMachine = new CoffeeMachine(1000, 300);

// залить воды
coffeeMachine.waterAmount = 500;
```

Задача -- сделать так, чтобы при присвоении `coffeeMachine.waterAmount = 500` выдавалась ошибка, если значение больше `capacity` (в примере выше `300`).

Для этого реализуйте `waterAmount` через геттер и сеттер, который будет проверять корректность установки. Используйте для этого `Object.defineProperty`.