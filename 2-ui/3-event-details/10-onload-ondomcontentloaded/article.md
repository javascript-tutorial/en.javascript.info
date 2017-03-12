# Page loading: DOMContentLoaded, load, beforeunload, unload [todo: where put async defer scripts? in DOM?]

The process of loading an HTML document may be split into three stages:

- `DOMContentLoaded` -- the browser fully loaded HTML and built DOM.
- `load` -- the browser loaded all resources (images, styles etc).
- `beforeunload/unload` -- leaving the page.

We can set a handler on every stage:

- `DOMContentLoaded` event -- DOM is ready, we can lookup DOM nodes, initialize the interface. But images and styles may be not yet loaded.
- `load` event -- the page and additional resources are loaded, it's rarely used, because usually we don't want to wait for that moment.
- `beforeunload/unload` event -- we can check if the user saved changes he did in the page, ask him whether he's sure.

Let's explore the details of these events.

[cut]

## DOMContentLoaded

The `DOMContentLoaded` event happens on the `document` object.

We must use `addEventListener` to catch it:

```js
document.addEventListener("DOMContentLoaded", ready);
```

For instance:

```html run height=150
<script>
  function ready() {
    alert('DOM is ready');
    alert(`Image sizes: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/hedgehog.jpg?speed=1&cache=0">
```

In the example the `DOMContentLoaded` handler runs when the document is loaded, not waits for the page load. So `alert` shows zero sizes.

At the first sight `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. But there are few pecularities.

### DOMContentLoaded and scripts

If there are `<script>...</script>` tags in the document, then the browser must execute them "at place" while building DOM.

External scripts `<script src="...">` also put "DOM building" to pause while the script is loading and executing.

The exceptions are external scripts with `async` or `defer` attributes.

- An async external script `<script async src="...">` is loaded and executed fully asynchronously, it doesn't pause anything.
- A deferred external script `<script defer src="...">` is loaded and executed fully asynchronously, it doesn't pause anything, with two differences from `async`:
  1. If there are many external scripts with `defer`
  2. lba





Если в документе есть теги `<script>`, то браузер обязан их выполнить до того, как построит DOM. Поэтому событие `DOMContentLoaded` ждёт загрузки и выполнения таких скриптов.

Исключением являются скрипты с атрибутами `async` и `defer`, которые подгружаются асинхронно.

**Побочный эффект: если на странице подключается скрипт с внешнего ресурса (к примеру, реклама), и он тормозит, то событие `DOMContentLoaded` и связанные с ним действия могут сильно задержаться.**

Современные системы рекламы используют атрибут `async`, либо вставляют скрипты через DOM: `document.createElement('script')...`, что работает так же как `async`: такой скрипт выполняется полностью независимо от страницы и от других скриптов -- сам ничего не ждёт и ничего не блокирует.

### DOMContentLoaded и стили

Внешние стили никак не влияют на событие `DOMContentLoaded`. Но есть один нюанс.

**Если после стиля идёт скрипт, то этот скрипт обязан дождаться, пока стиль загрузится:**

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // сработает после загрузки style.css
</script>
```

Такое поведение прописано в стандарте. Его причина -- скрипт может захотеть получить информацию со страницы, зависящую от стилей, например, ширину элемента, и поэтому обязан дождаться загрузки `style.css`.

**Побочный эффект -- так как событие `DOMContentLoaded` будет ждать выполнения скрипта, то оно подождёт и загрузки стилей, которые идут перед `<script>`.**

### Автозаполнение

Firefox/Chrome/Opera автозаполняют формы по `DOMContentLoaded`.

Это означает, что если на странице есть форма для ввода логина-пароля, то браузер введёт в неё запомненные значения только по `DOMContentLoaded`.

**Побочный эффект: если `DOMContentLoaded` ожидает множества скриптов и стилей, то автозаполнение не сработает до полной их загрузки.**

Конечно, это довод в пользу того, чтобы не задерживать `DOMContentLoaded`, в частности -- использовать у скриптов атрибуты `async` и `defer`.

## window.onload [#window-onload]

Событие `onload` на `window` срабатывает, когда загружается *вся* страница, включая ресурсы на ней -- стили, картинки, ифреймы и т.п.

Пример ниже выведет `alert` лишь после полной загрузки окна, включая `IFRAME` и картинку:

```html run
<script>
*!*
  window.onload = function() {
    alert( 'Документ и все ресурсы загружены' );
  };
*/!*
</script>
<iframe src="https://example.com/" style="height:60px"></iframe>
<img src="https://js.cx/clipart/yozhik.jpg?speed=1">
```

## window.onunload

Когда человек уходит со страницы или закрывает окно, на `window` срабатывает событие `unload`. В нём можно сделать что-то, не требующее ожидания, например, закрыть вспомогательные popup-окна, но отменить сам переход нельзя.

Это позволяет другое событие -- `onbeforeunload`, которое поэтому используется гораздо чаще.

## window.onbeforeunload [#window.onbeforeunload]

Если посетитель инициировал переход на другую страницу или нажал "закрыть окно", то обработчик `onbeforeunload` может приостановить процесс и спросить подтверждение.

Для этого ему нужно вернуть строку, которую браузеры покажут посетителю, спрашивая -- нужно ли переходить.

Например:

```js
window.onbeforeunload = function() {
  return "Данные не сохранены. Точно перейти?";
};
```

```warn header="Firefox игнорирует текст, он показывает своё сообщение"
Firefox игнорирует текст, а всегда показывает своё сообщение. Это сделано в целях большей безопасности посетителя, чтобы его нельзя было ввести в заблуждение сообщением.
```

```online
Кликните на кнопку в `IFRAME'е` ниже, чтобы поставить обработчик, а затем по ссылке, чтобы увидеть его в действии:

[iframe src="window-onbeforeunload" border="1" height="80" link]
```

## Эмуляция DOMContentLoaded для IE8-

Прежде чем что-то эмулировать, заметим, что альтернативой событию `onDOMContentLoaded` является вызов функции `init` из скрипта в самом конце `BODY`, когда основная часть DOM уже готова:

```html
<body>
  ...
  <script>
    init();
  </script>
</body>
```

Причина, по которой обычно предпочитают именно событие -- одна: удобство. Вешается обработчик и не надо ничего писать в конец `BODY`.

### Мини-скрипт documentReady
Если вы всё же хотите использовать `onDOMContentLoaded` кросс-браузерно, то нужно либо подключить какой-нибудь фреймворк -- почти все предоставляют такой функционал, либо использовать функцию из мини-библиотеки [jquery.documentReady.js](https://github.com/Couto/jquery.parts/blob/master/jquery.documentReady.js).

Несмотря на то, что в названии содержится слово "jquery", эта библиотечка не требует [jQuery](http://jquery.com). Наоборот, она представляет собой единственную функцию с названием `$`, вызов которой `$(callback)` добавляет обработчик `callback` на `DOMContentLoaded` (можно вызывать много раз), либо, если документ уже загружен -- выполняет его тут же.

Пример использования:

```html run
<script src="https://js.cx/script/jquery.documentReady.js"></script>

<script>
*!*
  $(function() {
    alert( "DOMContentLoaded" );
  });
*/!*
</script>

<img src="https://js.cx/clipart/yozhik.jpg?speed=1">
<div>Текст страницы</div>
```

Здесь `alert` сработает до загрузки картинки, но после создания DOM, в частности, после появления текста. И так будет для всех браузеров, включая даже очень старые IE.

````smart header="Как именно эмулируется `DOMContentLoaded`?"
Технически, эмуляция `DOMContentLoaded` для старых IE осуществляется очень забавно.

Основной приём -- это попытка прокрутить документ вызовом:

```js
document.documentElement.doScroll("left");
```

Метод `doScroll` работает только в IE и "методом тыка" было обнаружено, что он бросает исключение, если DOM не полностью создан.

Поэтому библиотека пытается вызвать прокрутку, если не получается -- через `setTimeout(.., 1)` пытается прокрутить его ещё раз, и так до тех пор, пока действие не перестанет вызывать ошибку. На этом этапе документ считается загрузившимся.

Внутри фреймов и в очень старых браузерах такой подход может ошибаться, поэтому дополнительно ставится резервный обработчик на `onload`, чтобы уж точно сработал.
````

## Итого

- Самое востребованное событие из описанных -- без сомнения, `DOMContentLoaded`. Многие страницы сделаны так, что инициализуют интерфейсы именно по этому событию.

    Это удобно, ведь можно в `<head>` написать скрипт, который будет запущен в момент, когда все DOM-элементы доступны.

    С другой стороны, следует иметь в виду, что событие `DOMContentLoaded` будет ждать не только, собственно, HTML-страницу, но и внешние скрипты, подключенные тегом `<script>` без атрибутов `defer/async`, а также стили перед такими скриптами.

    Событие `DOMContentLoaded` не поддерживается в IE8-, но почти все фреймворки умеют его эмулировать. Если нужна отдельная функция только для кросс-браузерного аналога `DOMContentLoaded` -- можно использовать [jquery.documentReady.js](https://github.com/Couto/jquery.parts/blob/master/jquery.documentReady.js).
- Событие `window.onload` используют редко, поскольку обычно нет нужды ждать подгрузки *всех* ресурсов. Если же нужен конкретный ресурс (картинка или ифрейм), то можно поставить событие `onload` непосредственно на нём, мы посмотрим, как это сделать, далее.
- Событие `window.onunload` почти не используется, как правило, оно бесполезно -- мало что можно сделать, зная, что окно браузера прямо сейчас закроется.
- Гораздо чаще применяется `window.onbeforeunload` -- это де-факто стандарт для того, чтобы проверить, сохранил ли посетитель данные, действительно ли он хочет покинуть страницу. В системах редактирования документов оно используется повсеместно.
