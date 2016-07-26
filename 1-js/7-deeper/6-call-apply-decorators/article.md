# Decorators and forwarding, call/apply

Javascript has exceptionally flexible functions. They can be passed around, used as objects, and now we will see how one function can pass its call to another one transparently. We'll use it to wrap new functionality around existing functions.

[cut]

## Transparent caching

Let's say we have a function `slow(x)` which is CPU-heavy, but for same `x` it always returns the same value.

Naturally, we'd want to cache (remember) the result, so that on the same future call we can return it without executing the function. 

But caching is something orthogonal to the function itself. So instead of mixing it into the function itself, we'll write a *caching decorator*.

A working example is better than thousand words here:

```js run
function slow(x) {
  return Math.random(); // actually, there is a scary CPU-heavy task here
}

function makeCaching(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }

    let result = func(x); // (*)
    
    cache.set(x, result);
    return result;
  };
}

slow = makeCaching(slow);

alert( slow(1) ); // slow(1) is cached
alert( slow(1) ); // the same 

alert( slow(2) ); // slow(2) is cached
alert( slow(2) ); // the same as the previous line
```

In the code above `makeCaching` is a *decorator*: a special function that takes another function and alters its behavior.

Here it returns a "wrapper": `function(x)` that "wraps" the call of `func(x)` `(*)`. As you can see from t





## Instrumentation: timing decorator

Let's say we have a function and want to measure time it takes to run.

Of course, we could modify it. Add something like `timerStart()` to the start and `timerEnd()` to all exit points. Then later we may want to log which arguments it receives and results. That requires additional code as well. 

That is called [instrumentation](https://en.wikipedia.org/wiki/Instrumentation) of the code -- adding stuff to measure times, log what's happening and do other watching/measuring without interfering with the main functionality.

Putting instrumentation inside the function manually is not pretty at all. It takes space, shadows the core functionality and makes it harder to debug.

There are tools that analyze javascript code and add instrumentation calls to it automatically. But here we'll take a "median" approach. We will "wrap" instrumentation over function without touching its code.

What we going to do is a special function `timingDecorator(func)`, that takes a function `func` and returns a "wrapper" around it, that transfers all calls to `func` and measures time they take.

For simplicity let's assume that `func` has only one argument. 

The code with `timingDecorator` and example function:




```js run
function fibo(n) { // a function to measure, here we count fibonacci number
  return (n > 2) ? fibo(n - 1) + fibo(n - 2) : 1; 
}

let timers = {}; // timers to store data

function timingDecorator(func) {
  return function(x) {
    let start = performance.now();

    let result = func(x);

    let time = performance.now() - start;

    if (!timers[func.name]) timers[func.name] = 0;
    timers[func.name] += time;

    return result;
  };  
}

// decorate it
fibo = timingDecorator(fibo);

// run
alert( fibo(10) ); // 55
alert( fibo(20) ); // 6765
alert( fibo(30) ); // 832040

alert( `Total time: ${timers.fibo.toFixed(3)}ms` ); // total count of fibo calls
```

При помощи декоратора `timingDecorator` мы сможем взять произвольную функцию и одним движением руки прикрутить к ней измеритель времени.

Его реализация:

```js run
var timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
  return function() {
    var start = performance.now();

    var result = f.apply(this, arguments); // (*)

    if (!timers[timer]) timers[timer] = 0;
    timers[timer] += performance.now() - start;

    return result;
  }
}

// функция может быть произвольной, например такой:
var fibonacci = function f(n) {
  return (n > 2) ? f(n - 1) + f(n - 2) : 1;
}

*!*
// использование: завернём fibonacci в декоратор
fibonacci = timingDecorator(fibonacci, "fibo");
*/!*

// неоднократные вызовы...
alert( fibonacci(10) ); // 55
alert( fibonacci(20) ); // 6765
// ...

*!*
// в любой момент можно получить общее количество времени на вызовы
alert( timers.fibo + 'мс' );
*/!*
```

Обратим внимание на строку `(*)` внутри декоратора, которая и осуществляет передачу вызова:

```js
var result = f.apply(this, arguments); // (*)
```

Этот приём называется "форвардинг вызова" (от англ. forwarding): текущий контекст и аргументы через `apply` передаются в функцию `f`, так что изнутри `f` всё выглядит так, как была вызвана она напрямую, а не декоратор.

## Декоратор для проверки типа

В JavaScript, как правило, пренебрегают проверками типа. В функцию, которая должна получать число, может быть передана строка, булево значение или даже объект.

Например:

```js no-beautify
function sum(a, b) {
  return a + b;
}

// передадим в функцию для сложения чисел нечисловые значения
alert( sum(true, { name: "Вася", age: 35 }) ); // true[Object object]
```

Функция "как-то" отработала, но в реальной жизни передача в `sum` подобных значений, скорее всего, будет следствием программной ошибки. Всё-таки `sum` предназначена для суммирования чисел, а не объектов.

Многие языки программирования позволяют прямо в объявлении функции указать, какие типы данных имеют параметры. И это удобно, поскольку повышает надёжность кода.

В JavaScript же проверку типов приходится делать дополнительным кодом в начале функции, который во-первых обычно  лень писать, а во-вторых он увеличивает общий объем текста, тем самым ухудшая читаемость.

**Декораторы способны упростить рутинные, повторяющиеся задачи, вынести их из кода функции.**

Например, создадим декоратор, который принимает функцию и массив, который описывает для какого аргумента какую проверку типа применять:

```js run
// вспомогательная функция для проверки на число
function checkNumber(value) {
  return typeof value == 'number';
}

// декоратор, проверяющий типы для f
// второй аргумент checks - массив с функциями для проверки
function typeCheck(f, checks) {
  return function() {
    for (var i = 0; i < arguments.length; i++) {
      if (!checks[i](arguments[i])) {
        alert( "Некорректный тип аргумента номер " + i );
        return;
      }
    }
    return f.apply(this, arguments);
  }
}

function sum(a, b) {
  return a + b;
}

*!*
// обернём декоратор для проверки
sum = typeCheck(sum, [checkNumber, checkNumber]); // оба аргумента - числа
*/!*

// пользуемся функцией как обычно
alert( sum(1, 2) ); // 3, все хорошо

*!*
// а вот так - будет ошибка
sum(true, null); // некорректный аргумент номер 0
sum(1, ["array", "in", "sum?!?"]); // некорректный аргумент номер 1
*/!*
```

Конечно, этот декоратор можно ещё расширять, улучшать, дописывать проверки, но... Вы уже поняли принцип, не правда ли?

**Один раз пишем декоратор и дальше просто применяем этот функционал везде, где нужно.**

## Декоратор проверки доступа

И наконец посмотрим ещё один, последний пример.

Предположим, у нас есть функция `isAdmin()`, которая возвращает `true`, если у посетителя есть права администратора.

Можно создать декоратор `checkPermissionDecorator`, который добавляет в любую функцию проверку прав:

Например, создадим декоратор `checkPermissionDecorator(f)`. Он будет возвращать обертку, которая передает вызов `f` в том случае, если у посетителя достаточно прав:

```js
function checkPermissionDecorator(f) {
  return function() {
    if (isAdmin()) {
      return f.apply(this, arguments);
    }
    alert( 'Недостаточно прав' );
  }
}
```

Использование декоратора:

```js no-beautify
function save() { ... }

save = checkPermissionDecorator(save);
// Теперь вызов функции save() проверяет права
```

## Итого

Декоратор -- это обёртка над функцией, которая модифицирует её поведение. При этом основную работу по-прежнему выполняет функция.

**Декораторы можно не только повторно использовать, но и комбинировать!**

Это кардинально повышает их выразительную силу. Декораторы можно рассматривать как своего рода "фичи" или возможности, которые можно "нацепить" на любую функцию. Можно один, а можно несколько.

Скажем, используя декораторы, описанные выше, можно добавить к функции возможности по проверке типов данных, замеру времени и проверке доступа буквально одной строкой, не залезая при этом в её код, то есть (!) не увеличивая его сложность.

Предлагаю вашему вниманию задачи, которые помогут выяснить, насколько вы разобрались в декораторах. Далее в учебнике мы ещё встретимся с ними.

