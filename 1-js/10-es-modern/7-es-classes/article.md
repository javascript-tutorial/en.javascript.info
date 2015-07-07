
# Классы 

В современном JavaScript появился новый, "более красивый" синтаксис для классов. Он естественным образом продолжает синтаксис для объектов и методов, который мы рассмотрели раньше.

## Class

Новая конструкция `class` -- удобный "синтаксический сахар" для задания конструктора вместе с прототипом.

Например:

```js
//+ run
'use strict';

class User {
  
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("Вася");
user.sayHi(); // Вася
```

Это объявление примерно аналогично такому:

```js
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
};
```

В обоих случаях `new User` будет создавать объекты. Метод `sayHi` -- также в обоих случаях находится в прототипе.

Но есть и отличия при объявлении через `class`:

<ul>
<li>`User`, объявленный как класс, нельзя вызывать без `new`, будет ошибка.</li>
<li>Объявление класса с точки зрения области видимости ведёт себя как `let`.</li>
</ul>

Методы, объявленные внутри `class`, также имеют ряд особенностей:

<ul>
<li>Метод `sayHi` является именно методом, то есть имеет доступ к `super`.</li>
<li>Все методы класса работают в `use strict`, даже если он не указан.</li>
<li>Все методы класса не перечислимы, то есть в `for..in` по объекту их не будет.</li>
</ul>

## Class Expression

Так же, как и Function Expression, классы можно задавать "инлайн" в выражении.

Это называется Class Expression:

```js
//+ run
'use strict';

let User = class {
  sayHi() { alert('Привет!'); }
};

new User().sayHi();
```

В примере выше у класса нет имени, что один-в-один соответствует синтаксису функций. Но имя можно дать. Тогда оно, как и в Named Function Expression, будет доступно только внутри класса:


```js
//+ run
'use strict';

let SiteGuest = class User {
  sayHi() { alert('Привет!'); }
};

new SiteGuest().sayHi(); // Привет
*!*
new User(); // ошибка
*/!*
```

В примере выше имя `User` будет доступно только внутри класса и может быть использовано, например для создания новых объектов данного типа.

## Геттеры, сеттеры и вычисляемые свойства

В классах, как и в обычных объектах, можно объявлять геттеры и сеттеры через `get/set`, а также использовать `[…]` для свойств с вычисляемыми именами:

```js
//+ run
'use strict';

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // геттер
*!*
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
*/!*

  // сеттер
*!*
  set fullName(newValue) {
    [this.firstName, this.lastName] = newValue.split(' ');
  }
*/!*

  ["test".toUpperCase()]: true

};

let user = new User("Вася", "Пупков");
alert( user.fullName ); // Вася Пупков
user.fullName = "Иван Петров";
alert( user.fullName ); // Иван Петров
alert( user.TEST ); // true
```

При чтении `fullName` будет вызван метод `get fullName()`, при присвоении -- метод `set fullName` с новым значением.

## Статические свойства

Статические свойства класса -- это свойства непосредственно класса `User`.

Например:

```js
//+ run
'use strict';

class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

*!*
  static createGuest() {
    return new User("Гость", "Сайта");
  }
*/!*
};

let user = User.createGuest();

alert( user.firstName ); // Гость

alert( User.createGuest ); // createGuest ... (функция)
```

Как правило, они используются для операций, не требующих наличия объекта, например -- для фабричных, как в примере выше, то есть как альтернативные варианты конструктора.

Или же, можно добавить метод `User.compare`, который будет сравнивать двух пользователей для целей сортировки.

## Наследование

Синтаксис:
```js
class Child extends Parent { 
  ...
}
```

В примере ниже объявлено два класса: `Animal` и наследующий от него `Rabbit`:

```js
//+ run
'use strict';

class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    alert("I walk: " + this.name);
  }
}

*!*
class Rabbit extends Animal {
*/!*
  walk() {
    super.walk();
    alert("...and jump!");
  }
}

new Rabbit("Вася").walk(); 
// I walk: Вася
// and jump!
```

[smart header="Обычные прототипы"]
При наследовании формируется стандартная цепочка прототипов: методы `Rabbit` находятся в `Rabbit.prototype`, методы `Animal` -- в `Animal.prototype`, и они связаны через `__proto__`:

```js
//+ run
'use strict';

class Animal { }
class Rabbit extends Animal { }

alert( Rabbit.prototype.__proto__ == Animal.prototype ); // true
```
[/smart]

Как видно из примера выше, методы родителя можно переопределить в наследнике. При этом для обращения к родительскому методу используют `super.method()`.

Немного особая история -- с конструктором.

Конструктор `constructor` родителя наследуется автоматически. То есть, если в потомке не указан свой `constructor`, то используется родительский.

Если его переопределить, то родительский конструктор вызывается через `super()`, а не через `super.constructor()`.

Например, вызовем конструктор `Animal` в `Rabbit`:

```js
//+ run
'use strict';

class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    alert("I walk: " + this.name);
  }
}

class Rabbit extends Animal {
*!*
  constructor() {
    // вызвать конструктор Animal с аргументом "Кроль"
    super("Кроль"); // то же, что и Animal.apply(this, arguments)
  }
*/!*
}

new Rabbit().walk(); // I walk: Кроль
```

...Однако, здесь есть небольшие ограничения:
<ul>
<li>Вызвать конструктор родителя можно только изнутри конструктора потомка. В частности, `super()` нельзя вызвать из произвольного метода.</li>
<li>В конструкторе потомка мы обязаны вызвать `super()` до обращения к `this`. До вызова `super` не существует `this`, так как по спецификации в этом случае именно `super` инициализует `this`.</li>
</ul>

Второе ограничение выглядит несколько странно, поэтому проиллюстрируем его примером:

```js
//+ run
'use strict';

class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Rabbit extends Animal {
*!*
  constructor() {
    alert(this); // ошибка, this не определён!
    // обязаны вызвать super() до обращения к this
  }
*/!*
}

new Rabbit();
```


## Итого

<ul>
<li>Классы можно объявлять как в основном потоке кода, так и "инлайн", по аналогии с Function Declaration и Expression.</li>
<li>В объявлении классов можно использовать методы, геттеры/сеттеры и вычислимые названия методов.</li>
<li>При наследовании вызов конструктора родителя осуществлятся через `super(...args)`, вызов родительских методов -- через `super.method(...args)`.</li>
</ul>

Концепция классов, которая после долгих обсуждений получилась в стандарте EcmaScript, носит название "максимально минимальной". То есть, в неё вошли только те возможности, которые уж точно необходимы.

В частности, не вошли "приватные" и "защищённые" свойства. То есть, все свойства и методы класса технически доступны снаружи. Возможно, они появятся в будущих редакциях стандарта.




