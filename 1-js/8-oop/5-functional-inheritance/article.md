# Функциональное наследование

Наследование -- это создание новых "классов" на основе существующих.

В JavaScript его можно реализовать несколькими путями, один из которых -- с использованием наложения конструкторов, мы рассмотрим в этой главе.
[cut]

## Зачем наследование?

Ранее мы обсуждали различные реализации кофеварки. Продолжим эту тему далее.

Хватит ли нам только кофеварки для удобной жизни? Вряд ли... Скорее всего, ещё понадобятся как минимум холодильник, микроволновка, а возможно и другие *машины*.

В реальной жизни у этих *машин* есть базовые правила пользования. Например, большая кнопка <i class="fa fa-power-off"></i> -- включение, шнур с розеткой нужно воткнуть в питание и т.п.

Можно сказать, что "у всех машин есть общие свойства, а конкретные машины могут их дополнять". 

Именно поэтому, увидев новую технику, мы уже можем что-то с ней сделать, даже не читая инструкцию.

Механизм наследования позволяет определить базовый класс `Машина`, в нём описать то, что свойственно всем машинам, а затем на его основе построить другие, более конкретные: `Кофеварка`, `Холодильник` и т.п.

[smart header="В веб-разработке всё так же"]
В веб-разработке нам могут понадобиться классы `Меню`, `Табы`, `Диалог` и другие компоненты интерфейса. В них всех обычно есть что-то общее.

Можно выделить такой общий функционал в класс `Компонент` и наследовать их от него, чтобы не дублировать код. 
[/smart]

## Наследование от Machine

Базовый класс "машина" `Machine` будет реализовывать общего вида методы "включить" `enable()` и "выключить" `disable()`:

```js
function Machine() {
  var enabled = false;

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };
}
```

Унаследуем от него кофеварку. При этом она получит эти методы автоматически:

```js
function CoffeeMachine(power) {
*!*
  Machine.call(this); // отнаследовать
*/!*

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(10000);

*!*
coffeeMachine.enable();
coffeeMachine.setWaterAmount(100);
coffeeMachine.disable();
*/!*
```

Наследование реализовано вызовом `Machine.call(this)` в начале конструктора `CoffeeMachine`.

Он вызывает функцию `Machine`, передавая ей в качестве контекста `this` текущий объект. `Machine`, в процессе выполнения, записывает в `this` различные полезные свойства и методы, в нашем случае `this.enable` и `this.disable`.

Далее конструктор `CoffeeMachine` продолжает выполнение и может добавить свои свойства и методы.

В результате мы получаем объект `coffeeMachine`, который включает в себя методы из `Machine` и `CoffeeMachine`.

## Защищённые свойства

В коде выше есть одна проблема.

**Наследник не имеет доступа к приватным свойствам родителя.**

Иначе говоря, если кофеварка захочет обратиться к `enabled`, то её ждёт разочарование:

```js
//+ run
function Machine() {
  var enabled = false;

  this.enable = function() {
    enabled = true;
  };

  this.disable = function() {
    enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.call(this);

  this.enable();

*!*
  // ошибка, переменная не определена!
  alert(enabled);
*/!*
}

var coffeeMachine = new CoffeeMachine(10000);
```

Это естественно, ведь `enabled` -- локальная переменная функции `Machine`. Она находится в другой области видимости.

**Чтобы наследник имел доступ к свойству, оно должно быть записано в `this`.**

При этом, чтобы обозначить, что свойство является внутренним, его имя начинают с подчёркивания `_`.

```js
//+ run
function Machine() {
*!*
  this._enabled = false; // вместо var enabled
*/!*

  this.enable = function() {
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };
}

function CoffeeMachine(power) {
  Machine.call(this);

  this.enable();

*!*
  alert(this._enabled); // true
*/!*
}

var coffeeMachine = new CoffeeMachine(10000);
```

Подчёркивание в начале свойства -- общепринятый знак, что свойство является внутренним, предназначенным лишь для доступа из самого объекта и его наследников. Такие свойства называют *защищёнными*.

Технически, залезть в него из внешнего кода, конечно, возможно, но приличный программист так делать не будет.

## Перенос свойства в защищённые

У `CoffeeMachine` есть приватное свойство `power`. Сейчас мы его тоже сделаем защищённым и перенесём в `Machine`, поскольку "мощность" свойственна всем машинам, а не только кофеварке.

```js
//+ run
function Machine(power) {
*!*
  this._power = power; // (1)
*/!*

  this._enabled = false;

  this.enable = function() {
    this._enabled = true;
  };

  this.disable = function() {
    this._enabled = false;
  };
}

function CoffeeMachine(power) {
*!*
  Machine.apply(this, arguments); // (2)
*/!*

  alert(this._enabled); // false
  alert(this._power); // 10000
}

var coffeeMachine = new CoffeeMachine(10000);
```

Теперь все машины `Machine` имеют мощность `power`. Обратим внимание, что мы из параметра конструктора сразу скопировали её в объект в строке `(1)`. Иначе она была бы недоступна из наследников.

В строке `(2)` мы теперь вызываем не просто `Machine.call(this)`, а расширенный вариант: `Machine.apply(this, arguments)`, который вызывает `Machine` в текущем контексте вместе с передачей текущих аргументов.

Можно было бы использовать и более простой вызов `Machine.call(this, power)`, но использование `apply` гарантирует передачу всех аргументов, вдруг их количество увеличится -- не надо будет переписывать.

## Переопределение методов

Итак, мы получили класс `CoffeeMachine`, который наследует от `Machine`.

Аналогичным образом мы можем унаследовать от `Machine` холодильник `Fridge`, микроволновку `MicroOven` и другие классы, которые разделяют общий "машинный" функционал, то есть имеют мощность и их можно включать/выключать.

Для этого достаточно вызвать `Machine` текущем контексте, а затем добавить свои методы.

```js
// Fridge может добавить и свои аргументы, 
// которые в Machine не будут использованы
function Fridge(power, temperature) {
  Machine.apply(this, arguments);
 
   // ...
}
```

Бывает так, что реализация конкретного метода машины в наследнике имеет свои особенности.

Можно, конечно, объявить в `CoffeeMachine` свой `enable`:

```js
function CoffeeMachine(power, capacity) {
  Machine.apply(this, arguments);
 
   // переопределить this.enable
   this.enable = function() { 
     /* enable для кофеварки */ 
   };
}
```

...Однако, как правило, мы хотим не заменить, а *расширить* метод родителя, добавить к нему что-то. Например, сделать так, чтобы при включении кофеварка тут же запускалась.

Для этого метод родителя предварительно копируют в переменную, и затем вызывают внутри нового `enable` -- там, где считают нужным:

```js
function CoffeeMachine(power) {
  Machine.apply(this, arguments);

*!*
  var parentEnable = this.enable; // (1)
  this.enable = function() {  // (2)
    parentEnable.call(this); // (3)
    this.run(); // (4)
  }
*/!*

  ...
}
```

**Общая схема переопределения метода (по строкам выделенного фрагмента кода):**

<ol>
<li>Копируем доставшийся от родителя метод `this.enable` в переменную, например `parentEnable`.</li>
<li>Заменяем `this.enable` на свою функцию...</li>
<li>...Которая по-прежнему реализует старый функционал через вызов `parentEnable`.</li>
<li>...И в дополнение к нему делает что-то своё, например запускает приготовление кофе.</li>
</ol>

Обратим внимание на строку `(3)`. 

В ней родительский метод вызывается так: `parentEnable.call(this)`. Если бы вызов был таким: `parentEnable()`, то ему бы не передался текущий `this` и возникла бы ошибка.

Технически, можно сделать возможность вызывать его и как `parentEnable()`, но тогда надо гарантировать, что контекст будет правильным, например привязать его при помощи `bind` или при объявлении, в родителе, вообще не использовать `this`, а получать контекст через замыкание, вот так:

```js
//+ run
function Machine(power) {
  this._enabled = false;

*!*
  var self = this; 
*/!*

  this.enable = function() {
*!*
    // используем внешнюю переменную вместо this
    self._enabled = true;  
*/!*
  };

  this.disable = function() {
    self._enabled = false;
  };

}

function CoffeeMachine(power) {
  Machine.apply(this, arguments);

  var waterAmount = 0;

  this.setWaterAmount = function(amount) {
    waterAmount = amount;
  };

*!*
  var parentEnable = this.enable;
  this.enable = function() {
    parentEnable();  // теперь можно вызывать как угодно, this не важен
    this.run();
  }
*/!*

  function onReady() {
    alert('Кофе готово!');
  }

  this.run = function() {
    setTimeout(onReady, 1000);
  };

}

var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.enable();
```

В коде выше родительский метод `parentEnable = this.enable` успешно продолжает работать даже при вызове без контекста. А всё потому, что использует `self` внутри.

## Итого

Организация наследования, которая описана в этой главе, называется "функциональным паттерном наследования".

Её общая схема (кратко):

<ol>
<li>Объявляется конструктор родителя `Machine`. В нём могут быть приватные (private), публичные (public) и защищённые (protected) свойства:

```js
function Machine(params) {
  // локальные переменные и функции доступны только внутри Machine
  var privateProperty; 

  // публичные доступны снаружи
  this.publicProperty = ...;

  // защищённые доступны внутри Machine и для потомков
  // мы договариваемся не трогать их снаружи
  this._protectedProperty = ...
}

var machine = new Machine(...)
machine.public();
```

</li>
<li>Для наследования конструктор потомка вызывает родителя в своём контексте через `apply`. После чего может добавить свои переменные и методы:

```js
function CoffeeMachine(params) {
  // универсальный вызов с передачей любых аргументов
*!*
  Machine.apply(this, arguments); 
*/!*

  this.coffeePublicProperty = ...
}

var coffeeMachine = new CoffeeMachine(...);
coffeeMachine.publicProperty();
coffeeMachine.coffeePublicProperty();
```

</li>
<li>В `CoffeeMachine` свойства, полученные от родителя, можно перезаписать своими. Но обычно требуется не заменить, а расширить метод родителя. Для этого он предварительно копируется в переменную:

```js
function CoffeeMachine(params) {
  Machine.apply(this, arguments); 

*!*
  var parentProtected = this._protectedProperty;
  this._protectedProperty = function(args) {
    parentProtected.apply(this, args); // (*)
    // ...
  };
*/!*
}
```

Строку `(*)` можно упростить до `parentProtected(args)`, если метод родителя не использует `this`, а, например, привязан к `var self = this`:

```js
function Machine(params) {
  var self = this;

  this._protected = function() {
    self.property = "value"; 
  };
}
```

</li>
</ol>

Надо сказать, что способ наследования, описанный в этой главе, используется нечасто.

В следующих главах мы будем изучать прототипный подход, который обладаем рядом преимуществ.

Но знать и понимать его необходимо, поскольку во многих существующих библиотеках классы написаны в функциональном стиле, и расширять/наследовать от них можно только так.





