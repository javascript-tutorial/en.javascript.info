# Хомяки с __proto__

[importance 5]

Вы -- руководитель команды, которая разрабатывает игру, хомяковую ферму. Один из программистов получил задание создать класс "хомяк" (англ - `"Hamster"`).

Объекты-хомяки должны иметь массив `food` для хранения еды и метод `found`, который добавляет к нему.

Ниже -- его решение. При создании двух хомяков, если поел один -- почему-то сытым становится и второй тоже. 

В чём дело? Как поправить?

```js
//+ run
function Hamster() {}

Hamster.prototype.food = []; // пустой "живот"

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого
speedy = new Hamster();
lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

alert( speedy.food.length ); // 2
alert( lazy.food.length ); // 2 (!??)
```

