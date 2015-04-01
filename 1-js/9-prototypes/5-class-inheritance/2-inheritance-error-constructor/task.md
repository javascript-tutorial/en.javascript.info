# В чём ошибка в наследовании

[importance 5]

Найдите ошибку в пототипном наследовании. К чему она приведёт?

```js
//+ run
function Animal(name) {
  this.name = name;

  this.walk = function() {
    alert( "ходит " + this.name );
  };

}

function Rabbit(name) {
  Animal.apply(this, arguments);
}
Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.walk = function() {
  alert( "прыгает " + this.name );
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();
```

