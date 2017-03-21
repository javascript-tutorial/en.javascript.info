Here's the line with the error:

```js
Rabbit.prototype = Animal.prototype;
```

Here `Rabbit.prototype` and `Animal.prototype` become the same object. So methods of both classes become mixed in that object.

As a result, `Rabbit.prototype.walk` overwrites `Animal.prototype.walk`, so all animals start to bounce:

```js run
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

*!*
Rabbit.prototype = Animal.prototype;
*/!*

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};

*!*
let animal = new Animal("pig");
animal.walk(); // pig bounces!
*/!*
```

The correct variant would be:

```js
Rabbit.prototype.__proto__ = Animal.prototype;
// or like this:
Rabbit.prototype = Object.create(Animal.prototype);
```

That makes prototypes separate, each of them stores methods of the corresponding class, but `Rabbit.prototype` inherits from `Animal.prototype`.
