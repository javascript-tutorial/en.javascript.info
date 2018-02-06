# Recursion, stack

It's ok for a function to rely on other functions for sub-tasks.

We've already been using it when `welcome()` relied on `alert()` call to show the message.

In particular, a function can make a sub-call *itself*. That's called *a recursion*.

We'll fiddle around that advanced case to better learn how functions work.

[smart header="A topic you already know?"]
Recursion is a general programming term. If you are already familiar with it, then you may list the page to the next chapter. Please read on if you are new to functions or just prefer not to skip parts.
[/smart]

## Divide and conquer

Divide and conquer (or "divide and rule") is an ancient strategy attributed to Philip II of Macedon and mentioned by the Roman emperor Julius Caesar, the French emperor Napolen and many other leaders.

They used it to rule, but the similar thing is often done in programming. If we have a complex task, that we're not sure how to solve as a whole, then maybe we can split it and try to solve the smaller parts.

And if smaller parts are still too big, then let's cut them and try to solve even smaller parts. 

Repeat the cutting until the parts are so small that it's obvious how to deal with them.

Sounds good? Now let's explore a case of this approach.

## Eating an elephant

Let's say we have a task "to eat an elephant". But how?

The well-known humorous solution is: "piece by piece". We cut a piece, eat it and repeat the process. Sooner or later, the elephant is eaten.

The algorithm can be reflected in the code:

```
function eat(elephant) {
  cut a piece from the elephant
  eat it
  if (something left) {
*!*
    eat(what's left of the elephant)  // (*)
*/!*
  }
}
```

The recursion occurs at line `(*)`: function `eat` after making things simpler passes the remaining data again to itself.

Of course that's only one variant. For example, we could cut the elephant in 2 halves, then cut the halves in half again etc, until the parts are small enough to eat. Then put them into plates and pass to the guests.

The core idea is the same: splitting the problem into multiple subproblems and doing the same with them if they're still big.

## A power of a number



## Степень pow(x, n) через рекурсию

В качестве первого примера использования рекурсивных вызовов -- рассмотрим задачу возведения числа `x` в натуральную степень `n`.

Её можно представить как совокупность более простого действия и более простой задачи того же типа вот так: 

```js
pow(x, n) = x * pow(x, n - 1)
```

То есть, <code>x<sup>n</sup> = x * x<sup>n-1</sup></code>.

Например, вычислим `pow(2, 4)`, последовательно переходя к более простой задаче:

<ol>
<li>`pow(2, 4) = 2 * pow(2, 3)`</li>
<li>`pow(2, 3) = 2 * pow(2, 2)`</li>
<li>`pow(2, 2) = 2 * pow(2, 1)`</li>
<li>`pow(2, 1) = 2`</li>
</ol>

На шаге 1 нам нужно вычислить `pow(2,3)`, поэтому мы делаем шаг 2, дальше нам нужно `pow(2,2)`, мы делаем шаг 3, затем шаг 4, и на нём уже можно остановиться, ведь очевидно, что результат возведения числа в степень 1 -- равен самому числу.

Далее, имея результат на шаге 4, он подставляется обратно в шаг 3, затем имеем `pow(2,2)` -- подставляем в шаг 2 и на шаге 1 уже получаем результат.

Этот алгоритм на JavaScript:

```js
//+ run
function pow(x, n) {
  if (n != 1) { // пока n != 1, сводить вычисление pow(x,n) к pow(x,n-1)
    return x * pow(x, n - 1);
  } else {
    return x;
  }
}

alert( pow(2, 3) ); // 8
```

Говорят, что "функция `pow` *рекурсивно вызывает сама себя*" до `n == 1`. 

Значение, на котором рекурсия заканчивается называют *базисом рекурсии*. В примере выше базисом является `1`.

Общее количество вложенных вызовов называют *глубиной рекурсии*. В случае со степенью, всего будет `n` вызовов. 

Максимальная глубина рекурсии в браузерах ограничена, точно можно рассчитывать на `10000` вложенных вызовов, но некоторые интерпретаторы допускают и больше.

Итак, рекурсию используют, когда вычисление функции можно свести к её более простому вызову, а его -- ещё к более простому, и так далее, пока значение не станет очевидно.

## Контекст выполнения, стек

Теперь мы посмотрим, как работают рекурсивные вызовы. Для этого мы рассмотрим, как вообще работают функции, что происходит при вызове.

**У каждого вызова функции есть свой "контекст выполнения" (execution context).** 

Контекст выполнения -- это служебная информация, которая соответствует текущему запуску функции. Она включает в себя локальные переменные функции и конкретное место в коде, на котором находится интерпретатор.

Например, для вызова `pow(2, 3)` из примера выше будет создан контекст выполнения, который будет хранить переменные `x = 2, n = 3`. Мы схематично обозначим его так:

<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 1 }</li>
</ul>

Далее функция `pow` начинает выполняться. Вычисляется выражение `n != 1` -- оно равно `true`, ведь в текущем контексте `n=3`. Поэтому задействуется первая ветвь `if` :

```js
function pow(x, n) {
  if (n != 1) { // пока n != 1 сводить вычисление pow(x,n) к pow(x,n-1)
*!*
    return x * pow(x, n - 1);
*/!*
  } else {
    return x;
  }
}
```

Чтобы вычислить выражение `x * pow(x, n-1)`, требуется произвести запуск `pow` с новыми аргументами.

**При любом вложенном вызове JavaScript запоминает текущий контекст выполнения в специальной внутренней структуре данных -- "стеке контекстов".**

Затем интерпретатор приступает к выполнению вложенного вызова.

В данном случае вызывается та же `pow`, однако это абсолютно неважно. Для любых функций процесс одинаков.

Для нового вызова создаётся свой контекст выполнения, и управление переходит в него, а когда он завершён -- старый контекст достаётся из стека и выполнение внешней функции возобновляется.

Разберём происходящее с контекстами более подробно, начиная с вызова `(*)`:

```js
//+ run
function pow(x, n) {
  if (n != 1) { // пока n!=1 сводить вычисление pow(..n) к pow(..n-1)
    return x * pow(x, n - 1);
  } else {
    return x;
  }
}

*!*
alert( pow(2, 3) ); // (*)
*/!*
```

<dl>
<dt>`pow(2, 3)`</dt>
<dd>Запускается функция `pow`, с аргументами `x=2`, `n=3`. Эти переменные хранятся в контексте выполнения, схематично изображённом ниже:

<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 1 }</li>
</ul>
Выполнение в этом контексте продолжается, пока не встретит вложенный вызов в строке 3.
</dd>
<dt>`pow(2, 2)`</dt>
<dd>В строке `3` происходит вложенный вызов `pow` с аргументами `x=2`, `n=2`. Текущий контекст сохраняется в стеке, а для вложеннного вызова создаётся новый контекст (выделен жирным ниже):

<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 3 }</li>
  <li>Контекст: { x: 2, n: 2, строка 1 }</li>
</ul>
Обратим внимание, что контекст включает в себя не только переменные, но и место в коде, так что когда вложенный вызов завершится -- можно будет легко вернуться назад.

Слово "строка" здесь условно, на самом деле, конечно, запомнено более точное место в цепочке команд.
</dd>
<dt>`pow(2, 1)`</dt>
<dd>Опять вложенный вызов в строке `3`, на этот раз -- с аргументами `x=2`, `n=1`. Создаётся новый текущий контекст, предыдущий добавляется в стек:
<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 3 }</li>
  <li>Контекст: { x: 2, n: 2, строка 3 }</li>
  <li>Контекст: { x: 2, n: 1, строка 1 }</li>
</ul>
На текущий момент в стеке уже два старых контекста.
</dd>
<dt>Выход из `pow(2, 1)`.</dt>
<dd>При выполнении `pow(2, 1)`, в отличие от предыдущих запусков, выражение `n != 1` будет равно `false`, поэтому  сработает вторая ветка `if..else`:

```js
function pow(x, n) {
  if (n != 1) {
    return x * pow(x, n - 1);
  } else {
*!*
    return x; // первая степень числа равна самому числу
*/!*
  }
}
```

Здесь вложенных вызовов нет, так что функция заканчивает свою работу, возвращая `2`. Текущий контекст больше не нужен и удаляется из памяти, из стека восстанавливается предыдущий:

<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 3 }</li>
  <li>Контекст: { x: 2, n: 2, строка 3 }</li>
</ul>
Возобновляется обработка внешнего вызова `pow(2, 2)`.
</dd>
<dt>Выход из `pow(2, 2)`.</dt>
<dd>...И теперь уже `pow(2, 2)` может закончить свою работу, вернув `4`. Восстанавливается контекст предыдущего вызова:
<ul class="function-execution-context">
  <li>Контекст: { x: 2, n: 3, строка 3 }</li>
</ul>
Возобновляется обработка внешнего вызова `pow(2, 3)`.
</dd>
<dt>Выход из `pow(2, 3)`.</dt>
<dd>Самый внешний вызов заканчивает свою работу, его результат: `pow(2, 3) = 8`.</dd>
</dl>

Глубина рекурсии в данном случае составила: **3**.

Как видно из иллюстраций выше, глубина рекурсии равна максимальному числу контекстов, одновременно хранимых в стеке.

Обратим внимание на требования к памяти. Рекурсия приводит к хранению всех данных для неоконченных внешних вызовов в стеке, в данном случае это приводит к тому, что возведение в степень `n` хранит в памяти `n` различных контекстов.

Реализация возведения в степень через цикл гораздо более экономна:

```js
function pow(x, n) {
  let result = x;
  for let i = 1; i < n; i++) {
    result *= x;
  }
  return result;
}
```

У такой функции `pow` будет один контекст, в котором будут последовательно меняться значения `i` и `result`.

**Любая рекурсия может быть переделана в цикл. Как правило, вариант с циклом будет эффективнее.**

Но переделка рекурсии в цикл может быть нетривиальной, особенно когда в функции, в зависимости от условий, используются различные рекурсивные подвызовы, когда ветвление более сложное.

## Итого

Рекурсия -- это когда функция вызывает сама себя, как правило, с другими аргументами.

Существуют много областей применения рекурсивных вызовов. Здесь мы посмотрели на один из них -- решение задачи путём сведения её к более простой (с меньшими аргументами), но также рекурсия используется для работы с "естественно рекурсивными" структурами данных, такими как HTML-документы, для "глубокого" копирования сложных объектов. 

Есть и другие применения, с которыми мы встретимся по мере изучения JavaScript.

Здесь мы постарались рассмотреть происходящее достаточно подробно, однако, если пожелаете, допустимо временно забежать вперёд и открыть главу [](/debugging-chrome), с тем чтобы при помощи отладчика построчно пробежаться по коду и посмотреть стек на каждом шаге. Отладчик даёт к нему доступ.



[head]
<style>
.function-execution-context {
  margin: 0;
  padding: 0;
  overflow: auto;
}

.function-execution-context li {
  float: left;
  clear: both;
  border: 1px solid black;
  font-family: "Consolas", monospace;
  padding: 3px 5px;
}


.function-execution-context li:last-child {
  font-weight: bold;
}
</style>
[/head]

