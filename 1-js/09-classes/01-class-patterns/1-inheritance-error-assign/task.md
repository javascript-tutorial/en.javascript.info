importance: 5

---

# An error in the inheritance

Find an error in the prototypal inheritance below.

What's wrong? What are consequences going to be?

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert(this.name + ' walks');
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = Animal.prototype;

Rabbit.prototype.walk = function() {
  alert(this.name + " bounces!");
};
```
