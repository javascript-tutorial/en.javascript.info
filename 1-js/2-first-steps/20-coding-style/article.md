# Coding style

Our code must be as clean and easy to read as possible. 

That is actually an art of programming -- to take a complex task and describe it using a programming language in a way that is both correct and human-readable.

One thing to help is a good code style. In this chapter we cover it's components.

[cut]
## Syntax

A cheatsheep with the rules (more details below):

<img src="code-style.png">
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number, greater than 0`);
} else {
  alert( pow(x, n) );
}
```
-->

Nothing is "carved in stone" here, so let's discuss the rules in detail.

### Figure brackets

In most JavaScript projects figure brackets are written on the same line. A so-called "egyptian" style. There's also a space before an opening bracket.

If the code has only one line, then there are options:

<!--
```js
//+ no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}



if (n < 0) alert(`Power ${n} is not supported`);



if (n < 0) {
  alert(`Power ${n} is not supported`);
}

```
-->
<img src="figure-bracket-style.png">

For a real short code like `if (cond) return null`, one line is acceptable... But still a separate line for each statement is usually easier to read.

### Line length

Line length is limited. No one likes to eye-follow a long horizontal line. Doesn't matter if it's a text or a OR'ed list of `if` conditions. It's better to split it.

Maximal line length is agreed on the team-level. It's usually 80 or 120 characters.

### Indents

There are two types of indents:

<ul>
<li>**A horizontal indent: 2(4) spaces.** 

Usually spaces are used, because they allow more flexible configurations of indents than the "Tab" symbol.

For instance, we can align the arguments with the opening bracket:

```js
//+ no-beautify
show(parameters,
     aligned,
     one,
     after,
     another);
```
</li>
<li>**A vertical indent, line breaks for splitting the code in logical blocks.** 

Even a single function can often be divided in logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:

```js
function pow(x, n) {
  let result = 1;
  //              <--
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  //              <--
  return result;
}
```

Insert an additional line break where it helps to make the code more readable. There should not be more than 9 lines of code without a vertical indentation.
</li>
</ul>

### A semicolon

Semicolons must be after each statement. Even if could possiblty be skipped.

There are languages where a semicolon is truly optional. It's rarely used there.

But in JavaScript a line break is sometimes interpreted as a semicolon and sometimes not. That leaves a place for programming errors, so semicolons must be at place, just as discussed [before](#semicolon).

## The Naming

The general rule:

<ul>
<li>Variable name should be a noun.</li>
<li>Function name should be a verb, or start with a verbal prefix. There can be exceptions if covered by another rule.</li>
</ul>

English language and camel-case notation is used.

Also discussed before -- [function naming](#function-naming) and [variables naming](#variable-naming).

## Nesting levels

There should not be too many nesting levels.

Sometimes it's a good idea to [use the "continue"](#continue) directive in the loop to evade extra nesting in `if(..) { ... }`:

Instead of:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- one more nesting level
  }
}
```

We can write:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- no extra nesting level
}
```

The similar thing can be done with `if/else` and `return`.

For example, two constructs below are identical.

The first one:

```js
function isEven(n) { // returns whether the number is even
  if (n % 2 == 0) {
    return true;
*!*
  } else {
    return false;
  }
*/!*
}
```

The second one:

```js
function isEven(n) { 
  if (n % 2 == 0) {
    return true;
  }

*!*
  return false;
*/!*
}
```

If there's a `return` inside the `if` block, then we need no `else` after it.

...Of course we can write even shorter here:

```js
function isEven(n) { 
  return !(n % 2);
}
```

...But if the code `!(n % 2)` is less obvious for you than the former variant then use the former one.

**The most important for us is not shortness, but simplicity and readability of the code.**

It's quite not always the case that a brief code is simpler to understand.

## Functions = Comments

Functions should be short and do exactly one thing. If that thing is big, maybe it's worth to split the function into parts.

Sometimes following this rule may be not easy, but it's a definitely good thing. So what's with the comments?

A separate function is not only easier to test and debug -- it's very existance is a great comment.

For instance, compare the two functions `showPrimes(n)` below. Each one outputs [prime numbers](https://en.wikipedia.org/wiki/Prime_number) up to `n`.

The first variant uses a label:

```js
function showPrimes(n) {
  nextPrime: for (var i = 2; i < n; i++) {

    for (var j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert( i ); // a prime
  }
}
```

The second variant uses an additional function `isPrime(n)` to test primality:

```js
function showPrimes(n) {
  
  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*
     
    alert(i);  // a prime
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

The second variant is easier to understand isn't it? Instead of the code piece we see a name of the action (`isPrime`). Sometimes people refer to such code as *self-describing*.

## Functions below the code

There are three way to place the "helper" functions used in the code.

<ol>
<li>Above the code that uses them:

```js
// *!*function declarations*/!*
function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}

// *!*the code which uses them*/!*
var elem = createElement();
setHandler(elem);
walkAround();
```

</li>
<li>Code first, then functions

```js
// *!*the code which uses the functions*/!*
var elem = createElement();
setHandler(elem);
walkAround();

// --- *!*helper functions*/!* ---

function createElement() {
  ...
}

function setHandler(elem) {
  ...
}

function walkAround() {
  ...
}
```

</li>
<li>Mixed, a function is described when it's first used.</li>
</ol>

Most of time, the second variant is preferred.

That's because when reading a code, we first want to know "what it does". If the code goes first, then it provides that information. And then maybe we won't need to read functions at all, especially if their names are adequate to what they're doing.

## Bad comments

В коде нужны комментарии. 

Сразу начну с того, каких комментариев быть почти не должно. 

**Должен быть минимум комментариев, которые отвечают на вопрос "что происходит в коде?"**

Что интересно, в коде начинающих разработчиков обычно комментариев либо нет, либо они как раз такого типа: "что делается в этих строках". 

Серьёзно, хороший код и так понятен.

Об этом замечательно выразился Р.Мартин в книге ["Чистый код"](http://www.ozon.ru/context/detail/id/21916535/): "Если вам кажется, что нужно добавить комментарий для улучшения понимания, это значит, что ваш код недостаточно прост, и, может, стоит переписать его".

Если у вас образовалась длинная "простыня", то, возможно, стоит разбить её на отдельные функции, и тогда из их названий будет понятно, что делает тот или иной фрагмент.

Да, конечно, бывают сложные алгоритмы, хитрые решения для оптимизации, поэтому нельзя такие комментарии просто запретить. Но перед тем, как писать подобное -- подумайте: "Нельзя ли сделать код понятным и без них?"

## Хорошие комментарии


А какие комментарии полезны и приветствуются?

<ul>
<li>**Архитектурный комментарий -- "как оно, вообще, устроено".** 

Какие компоненты есть, какие технологии использованы, поток взаимодействия. О чём и зачем этот скрипт. Взгляд с высоты птичьего полёта. Эти комментарии особенно нужны, если вы не один, а проект большой.

Для описания архитектуры, кстати, создан специальный язык [UML](http://ru.wikipedia.org/wiki/Unified_Modeling_Language), красивые диаграммы, но можно и без этого. Главное -- чтобы понятно.
</li>
<li>**Справочный комментарий перед функцией -- о том, что именно она делает, какие параметры принимает и что возвращает.** 

Для таких комментариев существует синтаксис [JSDoc](http://en.wikipedia.org/wiki/JSDoc).

```js
/**
 * Возвращает x в степени n, только для натуральных n
 *
 * @param {number} x Число для возведения в степень.
 * @param {number} n Показатель степени, натуральное число.
 * @return {number} x в степени n.
 */
function pow(x, n) {
  ...
}
```

Такие комментарии позволяют сразу понять, что принимает и что делает функция, не вникая в код.

Кстати, они автоматически обрабатываются многими редакторами, например [Aptana](http://aptana.com) и редакторами от [JetBrains](http://www.jetbrains.com/), которые  учитывают их при автодополнении, а также выводят их в автоподсказках при наборе кода.

Кроме того, есть инструменты, например [JSDoc 3](https://github.com/jsdoc3/jsdoc), которые умеют  генерировать по таким комментариям документацию в формате HTML. Более подробную информацию об этом можно также найти на сайте [](http://usejsdoc.org/).
</li>
</ul>

**...Но куда более важными могут быть комментарии, которые объясняют не *что*, а *почему* в коде происходит именно это!**

Как правило, из кода можно понять, что он делает. Бывает, конечно, всякое, но, в конце концов, вы этот код *видите*. Однако гораздо важнее может быть то, чего вы *не видите*!

*Почему* это сделано именно так? На это сам код ответа не даёт.

Например:

<dl>
<dt>Есть несколько способов решения задачи. Почему выбран именно этот?</dt>
<dd>
Например, пробовали решить задачу по-другому, но не получилось -- напишите об этом. Почему вы выбрали именно этот способ решения? Особенно это важно в тех случаях, когда используется не первый приходящий в голову способ, а какой-то другой.

Без этого возможна, например, такая ситуация:
<ul>
<li>Вы открываете код, который был написан какое-то время назад, и видите, что он "неоптимален".</li>
<li>Думаете: "Какой я был дурак", и переписываете под "более очевидный и правильный" вариант.</li>
<li>...Порыв, конечно, хороший, да только этот вариант вы уже обдумали раньше. И отказались, а почему -- забыли. В процессе переписывания вспомнили, конечно (к счастью), но результат - потеря времени на повторное обдумывание.</li>
</ul>

Комментарии, которые объясняют выбор решения, очень важны. Они помогают понять происходящее и предпринять правильные шаги при развитии кода.
</dd>
<dt>Какие неочевидные возможности обеспечивает этот код? Где ещё они используются?</dt>
<dd>
В хорошем коде должно быть минимум неочевидного. Но там, где это есть -- пожалуйста, комментируйте.
</dd>
</dl>


[smart header="Комментарии -- это важно"]
Один из показателей хорошего разработчика -- качество комментариев, которые позволяют эффективно поддерживать код, возвращаться к нему после любой паузы и легко вносить изменения.
[/smart]

## Руководства по стилю

Когда написанием проекта занимается целая команда, то должен существовать один стандарт кода, описывающий где и когда ставить пробелы, запятые, переносы строк и т.п. 

Сейчас, когда есть столько готовых проектов, нет смысла придумывать целиком своё руководство по стилю. Можно взять уже готовое, и которому, по желанию, всегда можно что-то добавить.

Большинство есть на английском, сообщите мне, если найдёте хороший перевод:

<ul>
<li>[Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)</li>
<li>[JQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines)</li>
<li>[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)</li>
<li>[Idiomatic.JS](https://github.com/rwldrn/idiomatic.js) (есть [перевод](https://github.com/rwldrn/idiomatic.js/tree/master/translations/ru_RU))</li>
<li>[Dojo Style Guide](http://dojotoolkit.org/community/styleGuide)</li>
</ul>

Для того, чтобы начать разработку, вполне хватит элементов стилей, обозначенных в этой главе. В дальнейшем, посмотрев эти руководства, вы можете выработать и свой стиль, но лучше не делать его особенно "уникальным и неповторимым", себе дороже потом будет с людьми сотрудничать.

## Автоматизированные средства проверки

Существуют средства, проверяющие стиль кода.

Самые известные -- это:

<ul>
<li>[JSLint](http://www.jslint.com/) -- проверяет код на соответствие [стилю JSLint](http://www.jslint.com/lint.html), в онлайн-интерфейсе вверху можно ввести код, а внизу различные настройки проверки, чтобы сделать её более мягкой. </li>
<li>[JSHint](http://www.jshint.com/) -- вариант JSLint с большим количеством настроек.</li>
<li>[Closure Linter](https://developers.google.com/closure/utilities/) -- проверка на соответствие [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).</li>
</ul>

В частности, JSLint и JSHint интегрированы с большинством редакторов, они гибко настраиваются под нужный стиль и совершенно незаметно улучшают разработку, подсказывая, где и что поправить.

Побочный эффект -- они видят некоторые ошибки, например необъявленные переменные. У меня это обычно результат опечатки, которые таким образом сразу отлавливаются. Очень рекомендую поставить что-то из этого. Я использую [JSHint](http://www.jshint.com/).

## Итого

Описанные принципы оформления кода уместны в большинстве проектов. Есть и другие полезные соглашения.

Следуя (или не следуя) им, необходимо помнить, что любые советы по стилю хороши лишь тогда, когда делают код читаемее, понятнее, проще в поддержке.

