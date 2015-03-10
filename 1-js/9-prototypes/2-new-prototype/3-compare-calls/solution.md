# Разница между вызовами

Первый вызов ставит `this == rabbit`, остальные ставят `this` равным `Rabbit.prototype`, следуя правилу "`this` -- объект перед точкой". 

Так что только первый вызов выведет `Rabbit`, в остальных он будет `undefined`.

Код для проверки:

```js
//+ run
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
}

var rabbit = new Rabbit("Rabbit");

rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```

# Совместимость 

<ol>
<li>Первый вызов работает везде.</li>
<li>Второй вызов работает везде.</li>
<li>Третий вызов не будет работать в IE8-, там нет метода `getPrototypeOf`</li>
<li>Четвёртый вызов -- самый "несовместимый", он не будет работать в IE10-, ввиду отсутствия свойства  `__proto__`.</li>
</ol>