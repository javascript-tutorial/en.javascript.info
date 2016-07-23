Задача -- с небольшим "нюансом".

Есть браузеры, в которых на время работы JavaScript таймер "застывает", например таков IE. В них количество шагов будет почти одинаковым, +-1.

В других браузерах (Chrome) первый бегун будет быстрее.

Создадим реальные объекты `Runner` и запустим их для проверки:

```js run
function Runner() {
  this.steps = 0;

  this.step = function() {
    this.doSomethingHeavy();
    this.steps++;
  };

  function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }

  this.doSomethingHeavy = function() {
    for (var i = 0; i < 25; i++) {
      this[i] = fib(i);
    }
  };

}

var runner1 = new Runner();
var runner2 = new Runner();

// запускаем бегунов
var t1 = setInterval(function() {
  runner1.step();
}, 15);

var t2 = setTimeout(function go() {
  runner2.step();
  t2 = setTimeout(go, 15);
}, 15);

// кто сделает больше шагов?
setTimeout(function() {
  clearInterval(t1);
  clearTimeout(t2);
  alert( runner1.steps );
  alert( runner2.steps );
}, 5000);
```

Если бы в шаге `step()` не было вызова `doSomethingHeavy()`, то есть он бы не требовал времени, то количество шагов было бы почти равным.

Но так как у нас шаг, всё же, что-то делает, и функция `doSomethingHeavy()` специально написана таким образом, что она требует (небольшого) времени, то первый бегун успеет сделать больше шагов. Ведь в `setTimeout` пауза `15` мс будет *между* шагами, а `setInterval` шагает равномерно, каждые `15` мс. Получается чаще.