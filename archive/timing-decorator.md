

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
let timers = {};

// прибавит время выполнения f к таймеру timers[timer]
function timingDecorator(f, timer) {
  return function() {
    let start = performance.now();

    let result = f.apply(this, arguments); // (*)

    if (!timers[timer]) timers[timer] = 0;
    timers[timer] += performance.now() - start;

    return result;
  }
}

// функция может быть произвольной, например такой:
let fibonacci = function f(n) {
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
let result = f.apply(this, arguments); // (*)
```

Этот приём называется "форвардинг вызова" (от англ. forwarding): текущий контекст и аргументы через `apply` передаются в функцию `f`, так что изнутри `f` всё выглядит так, как была вызвана она напрямую, а не декоратор.
