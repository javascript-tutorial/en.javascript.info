# Custom events

We can not only assign handlers, but also generate events form JavaScript.

Custom events can be used to create "graphical components". For instance, a root element of the menu may trigger events telling what happens with the menu: `open` (menu open),  `select` (an item is selected) and so on.

Also we can generate built-in events like `click`, `mousedown` etc, that may be good for testing.

[cut]

## Event constructor

Events form a hierarchy, just like DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.

We can create `Event` objects like this:

```js
let event = new Event(event type[, flags]);
```

Arguments:

- *event type* -- may be any string, like `"click"` or our own like `"hey-ho!"`.
- *flags* -- the object with two optional properties:
  - `bubbles: true/false` -- if `true`, then the event bubbles.
  - `cancelable: true/false` -- if `true`, then the "default action"  may be prevented. Later we'll see what it means for custom events.

  By default both flags are false: `{bubbles: false, cancelable: false}`.

## The method dispatchEvent

After an event object is created, we should "run" it on an element using the call  `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular built-in event. If the event was created with the `bubbles` flag, then it bubbles.

In the example below the `click` event is initiated in JavaScript. The handler works same way as if the button was clicked:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
There is a way to tell a "real" user event from a script-generated one.

The property `event.isTrusted` is `true` for events that come from real user actions and `false` for script-generated events.
```

## Bubbling example

We can create a bubbling event with the name `"hello"` and catch it on `document`.

All we need is to set `bubbles` to `true`:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // catch on document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...dispatch on elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);
</script>
```

Notes:

1. We must use `addEventListener` for our custom events, because `on<event>` only exists for built-in events.
2. Must set `bubbles`, otherwise the event won't bubble up.

The bubbling mechanics is the same for built-in (`click`) and custom (`hello`) events. There are also capturing and bubbling stages.

## MouseEvent, KeyboardEvent and others

Here's a short list of classes for UI Events from the [UI Event specification](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

We should use them instead of `new Event` if we want to create such events. For instance, `new MouseEvent("click")`.

The right constructor allows to specify standard properties for that type of event.

Like `clientX/clientY` for a mouse event:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Please note: the generic `Event` constructor does not allow that.

Let's try:

```js run
let event = new Event("click", {
  bubbles: true, // only bubbles and cancelable
  cancelable: true, // work in the Event constructor
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, the unknown property is ignored!
*/!*
```

Technically, we can work around that by assigning directly `event.clientX=100` after creation. So that's a matter of convenience and following the rules. Browser-generated events always have the right type.

The full list of properties for different UI events is in the specification, for instance  [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).

## Custom events

For our own, custom events like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.

In the second argument (object) we can add an additional property `detail` for any custom information that we want to pass with the event.

For instance:

```html run
<h1 id="elem">Hello for John!</h1>

<script>
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  let event = new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  });

  elem.dispatchEvent(event);
</script>
```

The `detail` can be anything. Once again, technically we can assign any properties into a regular `Event` object after its creation. But `CustomEvent` clearly states that the event is not built-in, but our own. And reserves the special `detail` field, so that we can write to it safely, without conflicts with standard event properties.







## Отмена действия по умолчанию

На сгенерированном событии, как и на встроенном браузерном, обработчик может вызвать метод `event.preventDefault()`. Тогда `dispatchEvent` возвратит `false`.

Остановимся здесь подробнее. Обычно `preventDefault()` вызов предотвращает действие браузера. В случае, если событие придумано нами, имеет нестандартное имя -- никакого действия браузера, конечно, нет.

Но код, который генерирует событие, может предусматривать какие-то ещё действия после `dispatchEvent`.

Вызов `event.preventDefault()` является возможностью для обработчика события сообщить в сгенерировавший событие код, что эти действия продолжать не надо.

В примере ниже есть функция `hide()`, которая при вызове генерирует событие `hide` на элементе `#rabbit`, уведомляя всех интересующихся, что кролик собирается спрятаться.

Любой обработчик может узнать об этом, подписавшись на событие через `rabbit.addEventListener('hide',...)` и, при желании, отменить действие по умолчанию через `event.preventDefault()`. Тогда кролик не исчезнет:

```html run
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>

<script>

  function hide() {
    var event = new Event("hide", {
      cancelable: true
    });
    if (!rabbit.dispatchEvent(event)) {
      alert( 'действие отменено обработчиком' );
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Вызвать preventDefault?")) {
      event.preventDefault();
    }
  });

  // прячемся через 2 секунды
  setTimeout(hide, 2000);

</script>
```





## Итого

- Все браузеры, кроме IE9-11, позволяют генерировать любые события, следуя стандарту DOM4.
- В IE9+ поддерживается более старый стандарт, можно легко сделать полифилл, например для `CustomEvent` он рассмотрен в этой главе.
- IE8- может генерировать только встроенные события.

Несмотря на техническую возможность генерировать встроенные браузерные события типа `click` или `keydown` -- пользоваться ей стоит с большой осторожностью.

В 98% случаев, когда разработчик начинающего или среднего уровня хочет сгенерировать *встроенное* событие -- это вызвано "кривой" архитектурой кода, и взаимодействие нужно на уровне выше.

Как правило события имеет смысл генерировать:

- Либо как явный и грубый хак, чтобы заставить работать сторонние библиотеки, в которых не предусмотрены другие средства взаимодействия.
- Либо для автоматического тестирования, чтобы скриптом "нажать на кнопку" и посмотреть, произошло ли нужное действие.
- Либо при создании своих "элементов интерфейса". Например, никто не мешает при помощи JavaScript создать из `<div class="calendar">` красивый календарь и генерировать на нём событие `change` при выборе даты. Эту тему мы разовьём позже.
