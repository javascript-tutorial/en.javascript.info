importance: 5

---

# Найдите ошибку в наследовании

Найдите ошибку в прототипном наследовании. К чему она приведёт?

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert( "ходит " + this.name );
};

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = Animal.prototype;

Rabbit.prototype.walk = function() {
  alert( "прыгает! и ходит: " + this.name );
};
```

