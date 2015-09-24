# Functions

Quite often we need to perform a similar action in many places of the script.

For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.

Functions are the main "building blocks" of the program. They allow the code to be called many times without repetition.

[cut]

We've already seen examples of built-in functions, like `alert(message)`, `prompt(message, default)` and `confirm(question)`. But we can create functions of our own as well.

## Definition

An example of a function definition:

```js
function showMessage() {
  alert( 'Hello everyone!' );
}
```

The `function` keyword goes first, then follows the *name of the function*, then a list of *parameters* in the brackets (empty in the example above) and finally the code of the function, also named "the function body".

<img src="function_basics.png">

Once defined, the function can be called by it's name.

For instance:

```js
//+ run
function showMessage() {
  alert( 'Hello everyone!' );
}

*!*
showMessage();
showMessage();
*/!*
```

The call executes the code of the function. Here we will see the message shown two times.

In this example we can see one of the main purposes of the functions: to evade code duplication.

If we ever need to change the message or the way it is shown -- it's enough to modify the code in one place: the function which outputs it.

## Local variables

A variable declared inside a function is only visible inside that function.

For example:

```js
//+ run
function showMessage() {
*!*
  var message = "Hello, I'm JavaScript!"; // local variable
*/!*

  alert( message );
}

showMessage(); // Hello, I'm JavaScript!

alert( message ); // <-- Error! The variable is local to the function
```

## Outer variables

A function can access an outer variable as well, for example:

```js
//+ run no-beautify
var *!*userName*/!* = 'John';

function showMessage() {
  var message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

showMessage(); // Hello, my name is John
```

The function can not only read but also modify an outer variable.

For instance:

```js
//+ run
var *!*userName*/!* = 'John';

function showMessage() {
  userName = "Bob"; // (1) changed the outer variable

  var message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

alert( userName ); // John before the function call

showMessage();

*!*
alert( userName ); // Bob, the value was modified by the function
*/!*
```

Of course if we had `var userName = ...` in the line (1) then the function would have a local variable `userName` and use it instead of the outer one:

```js
//+ run
var *!*userName*/!* = 'John';

function showMessage() {
*!*
  var userName = "Bob"; // declare a local variable 
*/!*

  var message = 'Hello, my name is ' + *!*userName*/!*;
  alert(message);
}

// the function will create and use it's own userName
showMessage();

*!*
alert( userName ); // John, the outer variable is not modified
*/!*
```

**Variables declared on the most outer level, not in any function, are called *global*.**

Please only declare global the variables which have a project-wide importance. Variables needed by specific tasks should reside in the corresponding functions. So to say, global variables are rare in modern projects.

[warn header="Attention: implicit global declaration!"]
In the old JavaScript it was possible to omit variable declaration:

```js
//+ run
function showMessage() {
  message = 'Hello'; // pure assignment, no declaration
}

showMessage();

alert( message ); // Hello
```

In the code above `message` was not declared. Most probably, the programmer simply forgot to write `var`.

With `"use strict"` there will be an error. But without it, the variable will be created automatically. And not in the function, but globally, in the whole script.

Modern editors and tools for code quality checking like [jshint](http://jshint.com/) allow to see and fix "missed declarations" early while coding.
[/warn]

In the future, after we deal with the basics and data structures, in the chapter [](/closures) we will go deeper in the internals of functions and variables.

## Параметры 

При вызове функции ей можно передать данные, которые та использует по своему усмотрению.

Например, этот код выводит два сообщения:

```js
//+ run no-beautify
function showMessage(*!*from, text*/!*) { // параметры from, text
  
  from = "** " + from + " **"; // здесь может быть сложный код оформления

  alert(from + ': ' + text);
}

*!*
showMessage('Маша', 'Привет!');
showMessage('Маша', 'Как дела?');
*/!*
```

**Параметры копируются в локальные переменные функции**.

Например, в коде ниже есть внешняя переменная `from`, значение которой при запуске функции копируется в параметр функции с тем же именем. Далее функция работает уже с параметром:

```js
//+ run
function showMessage(from, text) {
*!*
  from = '**' + from + '**'; // меняем локальную переменную from 
*/!*
  alert( from + ': ' + text );
}

var from = "Маша";

showMessage(from, "Привет");

alert( from ); // старое значение from без изменений, в функции была изменена копия
```

## Аргументы по умолчанию

Функцию можно вызвать с любым количеством аргументов.

Если параметр не передан при вызове -- он считается равным `undefined`.

Например, функцию показа сообщения `showMessage(from, text)` можно вызвать с одним аргументом:

```js
showMessage("Маша");
```

При этом можно проверить, и если параметр не передан -- присвоить ему значение "по умолчанию":

```js
//+ run
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'текст не передан';
  }
*/!*

  alert( from + ": " + text );
}

showMessage("Маша", "Привет!"); // Маша: Привет!
*!*
showMessage("Маша"); // Маша: текст не передан
*/!*
```

**При объявлении функции необязательные аргументы, как правило, располагают в конце списка.**

Для указания значения "по умолчанию", то есть, такого, которое используется, если аргумент не указан, используется два способа:

<ol>
<li>Можно проверить, равен ли аргумент `undefined`, и если да -- то записать в него значение по умолчанию. Этот способ продемонстрирован в примере выше.</li>
<li>Использовать оператор `||`:

```js
//+ run
function showMessage(from, text) {
  text = text || 'текст не передан';

  ...
}
```

Второй способ считает, что аргумент отсутствует, если передана пустая строка, `0`, или вообще любое значение, которое в логическом контексте является `false`. 
</li>
</ol>

Если аргументов передано больше, чем надо, например `showMessage("Маша", "привет", 1, 2, 3)`, то ошибки не будет. Но, чтобы получить такие "лишние" аргументы, нужно будет прочитать их из специального объекта `arguments`, который мы рассмотрим в главе [](/arguments-pseudoarray).

## Возврат значения 

Функция может возвратить результат, который будет передан в вызвавший её код.

Например, создадим функцию `calcD`, которая будет возвращать дискриминант квадратного уравнения по формуле <code>b<sup>2</sup> - 4ac</code>:

```js
//+ run no-beautify
function calcD(a, b, c) {
   *!*return*/!* b*b - 4*a*c;
}

var test = calcD(-4, 2, 1);
alert(test); // 20
```

**Для возврата значения используется директива `return`.** 

Она может находиться в любом месте функции. Как только до неё доходит управление -- функция  завершается и значение передается обратно.

Вызовов `return` может быть и несколько, например:

```js
//+ run
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Родители разрешили?');
  }
}

var age = prompt('Ваш возраст?');

if (checkAge(age)) {
  alert( 'Доступ разрешен' );
} else {
  alert( 'В доступе отказано' );
}
```

Директива `return` может также использоваться без значения, чтобы прекратить выполнение и выйти из функции.

Например:

```js
function showMovie(age) {
  if (!checkAge(age)) {
*!*
    return;
*/!*
  }

  alert( "Фильм не для всех" ); // (*)  
  // ...
}
```

В коде выше, если сработал `if`, то строка `(*)` и весь код под ней никогда не выполнится, так как `return` завершает выполнение функции. 

[smart header="Значение функции без `return` и с пустым `return`"]
В случае, когда функция не вернула значение или `return` был без аргументов, считается что она вернула `undefined`:

```js
//+ run
function doNothing() { /* пусто */ }

alert( doNothing() ); // undefined
```

Обратите внимание, никакой ошибки нет. Просто возвращается `undefined`.

Ещё пример, на этот раз с `return` без аргумента:

```js
//+ run
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

[/smart]

## Выбор имени функции [#function-naming]

Имя функции следует тем же правилам, что и имя переменной. Основное отличие -- оно должно быть глаголом, т.к. функция -- это действие.

Как правило, используются глагольные префиксы, обозначающие общий характер действия, после которых следует уточнение.

Функции, которые начинаются с `"show"` -- что-то показывают:

```js
//+ no-beautify
showMessage(..)     // префикс show, "показать" сообщение
```

Функции, начинающиеся с `"get"` -- получают, и т.п.:

```js
//+ no-beautify
getAge(..)          // get, "получает" возраст
calcD(..)           // calc, "вычисляет" дискриминант
createForm(..)      // create, "создает" форму
checkPermission(..) // check, "проверяет" разрешение, возвращает true/false
```

Это очень удобно, поскольку взглянув на функцию -- мы уже примерно представляем, что она делает, даже если функцию написал совсем другой человек, а в отдельных случаях -- и какого вида значение она возвращает. 

[smart header="Одна функция -- одно действие"]

Функция должна делать только то, что явно подразумевается её названием. И это должно быть одно действие. 

Если оно сложное и подразумевает поддействия -- может быть имеет смысл выделить их в отдельные функции? Зачастую это имеет смысл, чтобы лучше структурировать код.

**...Но самое главное -- в функции не должно быть ничего, кроме самого действия и поддействий, неразрывно связанных с ним.**

Например, функция проверки данных (скажем, `"validate"`) не должна показывать сообщение об ошибке. Её действие -- проверить.
[/smart]


[smart header="Сверхкороткие имена функций"]
Имена функций, которые используются *очень часто*, иногда делают сверхкороткими. 

Например, во фреймворке [jQuery](http://jquery.com) есть функция `$`, во фреймворке [Prototype](http://prototypejs.com) -- функция `$$`, а в библиотеке [LoDash](http://lodash.com/) очень активно используется функция с названием из одного символа подчеркивания `_`.
[/smart]

## Итого

Объявление функции имеет вид:

```js
function имя(параметры, через, запятую) {
  код функции
}
```

<ul>
<li>Передаваемые значения копируются в параметры функции и становятся локальными переменными.</li>
<li>Параметры функции копируются в её локальные переменные.</li>
<li>Можно объявить новые локальные переменые при помощи `var`.</li>
<li>Значение возвращается оператором `return ...`.</li>
<li>Вызов `return` тут же прекращает функцию.</li>
<li>Если `return;` вызван без значения, или функция завершилась без `return`, то её результат равен `undefined`.</li>
</ul>

При обращении к необъявленной переменной функция будет искать внешнюю переменную с таким именем, но лучше, если функция использует только локальные переменные:

<ul>
<li>Это делает очевидным общий поток выполнения -- что передаётся в функцию и какой получаем результат.</li>
<li>Это предотвращает возможные конфликты доступа, когда две функции, возможно написанные в разное время или разными людьми, неожиданно друг для друга меняют одну и ту же внешнюю переменную.</li> 
</ul>
</li>
</ul>

Именование функций:

<ul>
<li>Имя функции должно понятно и чётко отражать, что она делает. Увидев её вызов в коде, вы должны тут же понимать, что она делает.</li>
<li>Функция -- это действие, поэтому для имён функций, как правило, используются глаголы.</li>
</ul>

Функции являются основными строительными блоками скриптов. Мы будем неоднократно возвращаться к ним и изучать все более и более глубоко.


