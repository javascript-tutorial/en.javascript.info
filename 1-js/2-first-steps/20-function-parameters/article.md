# Function parameters

The syntax of function parameters is very versatile.

It allows:

- To specify values if the parameter if missing.
- To gather parameters into an array and deal with it instead of variables.
- To destructurize the object into parameters.
- And more.

All these features aim to help us in writing good-looking and concise code.

## Default values

A function can be called with any number of arguments. If a parameter is not provided, but listed in the declaration, then its value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```js
showMessage("Ann");
```

That's not an error. Such call would output `"Ann: undefined"`, because `text === undefined`.

If we want to track when the function is called with a single argument and use a "default" value in this case, then we can check if `text` is defined, like here:

```js run
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}

showMessage("Ann", "Hello!"); // Ann: Hello!
*!*
showMessage("Ann"); // Ann: no text given
*/!*
```

There are also other ways to supply "default values" for missing arguments:

- Use operator `||`:

    ```js
    function showMessage(from, text) {
      text = text || 'no text given';
      ...
    }
    ```

    This way is shorter, but the argument is considered missing even if it exists, but is falsy, like an empty line, `0` or `null`.

- Specify the default value after `=`:

    ```js run
    function showMessage(from, *!*text = 'no text given'*/!*) {
      alert( from + ": " + text );
    }

    showMessage("Ann"); // Ann: no text given
    ```

    Here `'no text given'` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

    ```js run
    function showMessage(from, text = anotherFunction()) {
      // anotherFunction() is executed if no text given
    }
    ```

## Arbitrary number of arguments

To support any number of arguments, we can use the rest operator `...`, similar to [destructuring](info:destructuring):

```js run
function sumAll(...args) {
  let sum = 0;

  for(let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

We also can put few first arguments into variables and gather only the rest:

```js run
function showName(firstName, lastName, ...rest) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest = ["Consul", "of the Roman Republic"]
  alert( rest[0] ); // Consul
  alert( rest[1] ); // of the Roman Republic
}

showName("Julius", "Caesar", "Consul", "of the Roman Republic");
```

````warn header="The rest operator … must be at the end"
The rest operator `…` gathers all remaining arguments, so the following has no sense:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

The `...rest` must always be the last.
````

````smart header="The `arguments` variable"

In old times, there were no rest operator. But there was a special variable named `arguments` that contained all arguments by their index. It is still supported and can be used like this:

```js run
function showName() {
  alert( arguments[0] ); 
  alert( arguments[1] ); 
  alert( arguments.length ); 
}

// shows: Julius, Caesar, 2
showName("Julius", "Caesar");

// shows: Ilya, undefined, 1
showName("Ilya"); 
```

The downside is that `arguments` looks like an array, but it's not. It does not support many useful array features. It only exists for backwards compatibility. The rest operator is better.
````

## Destructuring in parameters

There are times when a function may have many parameters. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

Here's a bad way to write such function:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

The real-life problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default. 

Like this?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

That's ugly. And becomes unreadable if we have not 4 but 10 parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
*/!*
  alert( title + ' ' + width + ' ' + height ); // My Menu 100 200
  alert( items ); // Item1, Item2
}

showMenu(options);
```

We can also use the more complex destructuring with nestings and colon mappings:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled", 
  width:w = 100,  // width goes to w
  height:h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( title + ' ' + w + ' ' + h ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options); 
```

The syntax is the same as for a destructuring assignment:
```js
function({
  incoming property: parameterName = defaultValue
  ...
})
```

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

```js
showMenu({});

// that would give an error
showMenu();
```

We can fix this of course, by making an empty object a value by default for the whole destructuring thing:


```js run
// simplified parameters a bit for clarity
function showMenu(*!*{ title="Menu", width=100, height=200 } = {}*/!*) {
  alert( title + ' ' + width + ' ' + height ); 
}

showMenu(); // Menu 100 200
```

In the code above, the whole arguments object is `{}` by default, so there's always something to destructurize.

## The spread operator

// TODO!!!

Выше мы увидели использование `...` для чтения параметров в объявлении функции. Но этот же оператор можно использовать и при вызове функции, для передачи массива параметров как списка, например:

```js run
'use strict';

let numbers = [2, 3, 15];

// Оператор ... в вызове передаст массив как список аргументов
// Этот вызов аналогичен Math.max(2, 3, 15)
let max = Math.max(*!*...numbers*/!*);

alert( max ); // 15
```

Формально говоря, эти два вызова делают одно и то же:

```js
Math.max(...numbers);
Math.max.apply(Math, numbers);
```

Похоже, что первый -- короче и красивее.

## Деструктуризация в параметрах


## Имя "name"

В свойстве `name` у функции находится её имя.

Например:

```js run
'use strict';

function f() {} // f.name == "f"

let g = function g() {}; // g.name == "g"

alert(f.name + ' ' + g.name) // f g
```

В примере выше показаны Function Declaration и Named Function Expression. В синтаксисе выше довольно очевидно, что у этих функций есть имя `name`. В конце концов, оно указано в объявлении.

Но современный JavaScript идёт дальше, он старается даже анонимным функциям дать разумные имена.

Например, при создании анонимной функции с одновременной записью в переменную или свойство -- её имя равно названию переменной (или свойства).

Например:

```js
'use strict';

// свойство g.name = "g"
let g = function() {};

let user = {
  // свойство user.sayHi.name == "sayHi"
  sayHi: function() {}
};
```

## Функции в блоке

Объявление функции Function Declaration, сделанное в блоке, видно только в этом блоке.

Например:

```js run
'use strict';

if (true) {

  sayHi(); // работает

  function sayHi() {
    alert("Привет!");
  }

}
sayHi(); // ошибка, функции не существует
```

То есть, иными словами, такое объявление -- ведёт себя в точности как если бы `let sayHi = function() {…}` было сделано в начале блока.

## Функции через =>

Появился новый синтаксис для задания функций через "стрелку" `=>`.

Его простейший вариант выглядит так:
```js run
'use strict';

*!*
let inc = x => x+1;
*/!*

alert( inc(1) ); // 2
```

Эти две записи -- примерно аналогичны:

```js
let inc = x => x+1;

let inc = function(x) { return x + 1; };
```

Как видно, `"x => x+1"` -- это уже готовая функция. Слева от `=>` находится аргумент, а справа -- выражение, которое нужно вернуть.

Если аргументов несколько, то нужно обернуть их в скобки, вот так:

```js run
'use strict';

*!*
let sum = (a,b) => a + b;
*/!*

// аналог с function
// let inc = function(a, b) { return a + b; };

alert( sum(1, 2) ); // 3
```

Если нужно задать функцию без аргументов, то также используются скобки, в этом случае -- пустые:

```js run
'use strict';

*!*
// вызов getTime() будет возвращать текущее время
let getTime = () => new Date().getHours() + ':' + new Date().getMinutes();
*/!*

alert( getTime() ); // текущее время
```

Когда тело функции достаточно большое, то можно его обернуть в фигурные скобки `{…}`:

```js run
'use strict';

*!*
let getTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return hourse + ':' + minutes;
};
*/!*

alert( getTime() ); // текущее время
```

Заметим, что как только тело функции оборачивается в `{…}`, то её результат уже не возвращается автоматически. Такая функция должна делать явный `return`, как в примере выше, если конечно хочет что-либо возвратить.

Функции-стрелки очень удобны в качестве коллбеков, например:

```js run
`use strict`;

let arr = [5, 8, 3];

*!*
let sorted = arr.sort( (a,b) => a - b );
*/!*

alert(sorted); // 3, 5, 8
```

Такая запись -- коротка и понятна. Далее мы познакомимся с дополнительными преимуществами использования функций-стрелок для этой цели.

## Функции-стрелки не имеют своего this

Внутри функций-стрелок -- тот же `this`, что и снаружи.

Это очень удобно в обработчиках событий и коллбэках, например:

```js run
'use strict';

let group = {
  title: "Наш курс",
  students: ["Вася", "Петя", "Даша"],

  showList: function() {
*!*
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    )
*/!*
  }
}

group.showList();
// Наш курс: Вася
// Наш курс: Петя
// Наш курс: Даша
```

Здесь в `forEach` была использована функция-стрелка, поэтому `this.title` в коллбэке -- тот же, что и во внешней функции `showList`. То есть, в данном случае -- `group.title`.

Если бы в `forEach` вместо функции-стрелки была обычная функция, то была бы ошибка:

```js run
'use strict';

let group = {
  title: "Наш курс",
  students: ["Вася", "Петя", "Даша"],

  showList: function() {
*!*
    this.students.forEach(function(student) {
      alert(this.title + ': ' + student); // будет ошибка
    })
*/!*
  }
}

group.showList();
```

При запуске будет "попытка прочитать свойство `title` у `undefined`", так как `.forEach(f)` при запуске `f` не ставит `this`. То есть, `this` внутри `forEach` будет `undefined`.

```warn header="Функции стрелки нельзя запускать с `new`"
Отсутствие у функции-стрелки "своего `this`" влечёт за собой естественное ограничение: такие функции нельзя использовать в качестве конструктора, то есть нельзя вызывать через `new`.
```

```smart header="=> это не то же самое, что `.bind(this)`"
Есть тонкое различие между функцией стрелкой `=>` и обычной функцией, у которой вызван `.bind(this)`:

- Вызовом `.bind(this)` мы передаём текущий `this`, привязывая его к функции.
- При `=>` привязки не происходит, так как функция стрелка вообще не имеет контекста `this`. Поиск `this` в ней осуществляется так же, как и поиск обычной переменной, то есть, выше в замыкании. До появления стандарта ES-2015 такое было невозможно.
```

## Функции-стрелки не имеют своего arguments

В качестве `arguments` используются аргументы внешней "обычной" функции.

Например:

```js run
'use strict';

function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Вызов `showArg()` выведет `1`, получив его из аргументов функции `f`. Функция-стрелка здесь вызвана без параметров, но это не важно: `arguments` всегда берутся из внешней "обычной" функции.

Сохранение внешнего `this` и `arguments` удобно использовать для форвардинга вызовов и создания декораторов.

Например, декоратор `defer(f, ms)` ниже получает функцию `f` и возвращает обёртку вокруг неё, откладывающую вызов на `ms` миллисекунд:

```js run
'use strict';

*!*
function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms)
  }
}
*/!*

function sayHi(who) {
  alert('Привет, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("Вася"); // Привет, Вася через 2 секунды
```

Аналогичная реализация без функции-стрелки выглядела бы так:

```js
function defer(f, ms) {
  return function() {
*!*
    let args = arguments;
    let ctx = this;
*/!*
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  }
}
```

В этом коде пришлось создавать дополнительные переменные `args` и `ctx` для передачи внешних аргументов и контекста через замыкание.

## Итого

Основные улучшения в функциях:

- Можно задавать параметры по умолчанию, а также использовать деструктуризацию для чтения приходящего объекта.
- Оператор spread (троеточие) в объявлении позволяет функции получать оставшиеся аргументы в массив: `function f(arg1, arg2, ...rest)`.
- Тот же оператор spread в вызове функции позволяет передать её массив как список аргументов (вместо `apply`).
- У функции есть свойство `name`, оно содержит имя, указанное при объявлении функции, либо, если его нет, то имя свойства или переменную, в которую она записана. Есть и некоторые другие ситуации, в которых интерпретатор подставляет "самое подходящее" имя.
- Объявление Function Declaration в блоке `{...}` видно только в этом блоке.
- Появились функции-стрелки:
    - Без фигурных скобок возвращают выражение `expr`: `(args) => expr`.
    - С фигурными скобками требуют явного `return`.
    - Не имеют своих `this` и `arguments`, при обращении получают их из окружающего контекста.
    - Не могут быть использованы как конструкторы, с `new`.



