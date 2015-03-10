# Есть ли разница между вызовами?

[importance 5]

Создадим новый объект, вот такой:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

var rabbit = new Rabbit("Rabbit");
```

Одинаково ли сработают эти вызовы?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```

Все ли они являются кросс-браузерными? Если нет -- в каких браузерах сработает каждый?