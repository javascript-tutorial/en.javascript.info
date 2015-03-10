# Переопределите disable

[importance 5]

Переопределите метод `disable` холодильника, чтобы при наличии в нём еды он выдавал ошибку.


Код для проверки:

```js
var fridge = new Fridge(500);
fridge.enable();
fridge.addFood("кус-кус");
fridge.disable(); // ошибка, в холодильнике есть еда
```

В качестве исходного кода используйте решение [предыдущей задачи](/task/add-methods-fridge).
