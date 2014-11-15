# Останавливать кофеварку при выключении

[importance 5]

Когда кофеварку выключают -- текущая варка кофе должна останавливаться.

Например, следующий код кофе не сварит:

```js
var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.enable();
coffeeMachine.run();
coffeeMachine.disable(); // остановит работу, ничего не выведет
```

Реализуйте это на основе решения [предыдущей задачи](/task/coffeemachine-fix-run).
