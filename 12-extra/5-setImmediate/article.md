# Асинхронное выполнение: setImmediate

Функция, отложенная через `setTimeout(..0)` выполнится не ранее следующего "тика" таймера, минимальная частота которого может составлять от 4 до 1000мс. И, конечно же, это произойдёт после того, как все текущие изменения будут перерисованы.

Но нужна ли нам эта дополнительная задержка? Как правило, используя `setTimeout(func, 0)`, мы хотим перенести выполнение `func` на "ближайшее время после текущего кода", и какая-то дополнительная задержка нам не нужна. Если бы была нужна -- мы бы её указали вторым аргументом вместо `0`.

[cut]
## Метод setImmediate(func)

Для того, чтобы поставить функцию в очередь на выполнение без задержки, в Microsoft предложили метод [setImmediate(func)](http://msdn.microsoft.com/en-us/library/ie/hh773176.aspx). Он реализован в IE10+ и на платформе Node.JS.

У `setImmediate` единственный аргумент -- это функция, выполнение которой нужно запланировать.

В других браузерах `setImmediate` нет, но его можно эмулировать, используя, к примеру, метод [postMessage](https://developer.mozilla.org/en-US/docs/DOM/window.postMessage), предназначенный для пересылки сообщений от одного окна другому. Детали работы с `postMessage` вы найдёте в статье [](/cross-window-messaging-with-postmessage). Желательно читать её после освоения темы "События".

Полифилл для `setImmediate` через `postMessage`:

```js
if (!window.setImmediate) window.setImmediate = (function() {
  var head = { }, tail = head; // очередь вызовов, 1-связный список

  var ID = Math.random(); // уникальный идентификатор

  function onmessage(e) {
    if(e.data != ID) return; // не наше сообщение
    head = head.next;
    var func = head.func;
    delete head.func;
    func();      
  }

  if(window.addEventListener) { // IE9+, другие браузеры
    window.addEventListener('message', onmessage);
  } else { // IE8
    window.attachEvent( 'onmessage', onmessage ); 
  }

  return function(func) {
    tail = tail.next = { func: func };
    window.postMessage(ID, "*");
  };
}());
```

Есть и более сложные эмуляции, включая [MessageChannel](http://www.w3.org/TR/webmessaging/#channel-messaging) для работы с [Web Workers](http://www.w3.org/TR/workers/) и хитрый метод для поддержки IE8-: [](https://github.com/NobleJS/setImmediate). Все они по существу являются "хаками", направленными на то, чтобы обеспечить поддержку `setImmediate` в тех браузерах, где его нет.

## Тест производительности

Чтобы сравнить реальную частоту срабатывания -- измерим время на 100 последовательных вызовов при `setTimeout(..0)` по сравнению с `setImmediate`:

[codetabs src="setImmediate"]

Запустите пример выше -- и вы увидите реальную разницу во времени между `setTimeout(.., 0)` и `setImmediate`. Да, она может быть более в 50, 100 и более раз.