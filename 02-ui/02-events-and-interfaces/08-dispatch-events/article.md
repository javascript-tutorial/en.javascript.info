# Генерация событий на элементах

Можно не только слушать браузерные события, но и генерировать их самому.

Это нужно довольно редко, преимущественно -- для целей автоматического тестирования.

[cut]

## Конструктор Event

Вначале рассмотрим современный способ генерации событий, по стандарту [DOM 4](http://www.w3.org/TR/dom/#introduction-to-dom-events). Он поддерживается всеми браузерами, кроме IE11-. А далее рассмотрим устаревшие варианты, поддерживаемые IE.

**Объект события создаётся при помощи конструктора [Event](http://www.w3.org/TR/dom/#event).**

Синтаксис:

```js
var event = new Event(тип события[, флаги]);
```

Где:
<ul>
<li>*Тип события* -- может быть как своим, так и встроенным, к примеру `"click"`.</li>
<li>*Флаги* -- объект вида `{ bubbles: true/false, cancelable: true/false }`, где свойство `bubbles` указывает, всплывает ли событие, а `cancelable` -- можно ли отменить действие по умолчанию. 

Не обязателен, по умолчанию `{bubbles: false, cancelable: false}`.</li>
</ul>

### Метод dispatchEvent

Затем, чтобы инициировать событие, запускается `elem.dispatchEvent(event)`. 

Событие обрабатывается "как обычно", передаётся обработчикам, всплывает... Этот метод возвращает `false`, если событие было отменено при помощи `preventDefault()`. Конечно, отмена возможна лишь если событие изначально было создано с флагом `cancelable`.

При просмотре примера ниже кнопка будет нажата скриптом:

```html
<!--+ run -->
<button id="elem" onclick="alert('Клик');">Автоклик</button>

<script>
  var event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

[smart header="Как отличить реальное нажатие от скриптового?"]
В целях безопасности иногда хорошо бы знать -- инициировано ли действие посетителем или это кликнул скрипт. 

Единственный способ, которым код может отличить реальное нажатие от программного, является проверка свойства `event.isTrusted`. 

Оно на момент написания статьи поддерживается IE и Firefox и равно `true`, если посетитель кликнул сам, и всегда `false` -- если событие инициировал скрипт.
[/smart]

Браузер автоматически ставит следующие свойства объекта `event`:

<ul>
<li>`isTrusted: false` -- означает, что событие сгенерировано скриптом,  это свойство изменить невозможно.</li>
<li>`target: null` --  это свойство ставится автоматически позже при `dispatchEvent`.</li>
<li>`type: тип события` -- первый аргумент `new Event`.</li>
<li>`bubbles`, `cancelable` -- по второму аргументу `new Event`.</li>
</ul>

Другие свойства события, если они нужны, например координаты для события мыши -- можно присвоить в объект события позже, например:

```js
var event = new Event("click");
event.clientX = 100;
event.clientY = 100;
```

### Пример с hello

Можно генерировать события с любыми названиями.

Для примера сгенерируем совершенно новое событие `"hello"`:

```html
<!--+ run -->
<h1 id="elem">Привет от скрипта!</h1>

<script>
  document.addEventListener("hello", function(event) { // (1)
    alert("Привет");
    event.preventDefault();  // (2)
  }, false);

  var event = new Event("hello", {bubbles: true, cancelable: true}); // (3)
  if (elem.dispatchEvent(event) === false) {
    alert('Событие было отменено preventDefault');
  }
</script>
```

Обратите внимание:
<ol>
<li>Обработчик события `hello` стоит на `document`. Мы его поймаем на всплытии.</li>
<li>Вызов `event.preventDefault()` приведёт к тому, что `dispatchEvent` вернёт `false`.</li>
<li>Чтобы событие всплывало и его можно было отменить, указан второй аргумент `new Event`.</li>
</ol>

Никакой разницы между встроенными событиями (`click`) и своими (`hello`) здесь нет, они создаются и работают совершенно одинаково.

## Конструкторы MouseEvent, KeyboardEvent и другие

Для конкретных типов событий есть свои конструкторы.

Вот список конструкторов для различных событий интерфейса которые можно найти в спецификации [UI Event](http://www.w3.org/TR/uievents/):
<ul>
<li>`UIEvent`</li>
<li>`FocusEvent`</li>
<li>`MouseEvent`</li>
<li>`WheelEvent`</li>
<li>`KeyboardEvent`</li>
<li>`CompositionEvent`</li>
</ul>

Вместо `new Event("click")` можно вызвать `new MouseEvent("click")`.

**Конкретный конструктор позволяет указать стандартные свойства для данного типа события.**

Например:

```js
//+ run
var e = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(e.clientX); // 100
*/!*
```

Сравните это с обычным `Event`:

```js
//+ run
var e = new Event("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(e.clientX); // undefined
*/!*
```

...То есть, "мышиные" свойства можно сразу же в конструкторе указать только если это `MouseEvent`, а `Event` их игнорирует. 

**Использование конкретного конструктора не является обязательным, можно обойтись `Event`.**

Свойства можно присвоить и явно, после конструктора. Здесь это скорее вопрос удобства и желания следовать правилам. События, которые генерирует браузер, всегда имеют правильный тип.

Полный список свойств по типам событий вы найдёте в спецификации, например для `MouseEvent`: [MouseEvent Constructor](http://www.w3.org/TR/uievents/#constructor-mouseevent).

## Свои события

Для генерации встроенных событий существуют описанные выше конструкторы, а для генерации своих, нестандартных, событий существует конструктор [CustomEvent](http://www.w3.org/TR/dom/#customevent). 

Технически, он абсолютно идентичен `Event`, кроме небольшой детали: у второго аргумента-объекта есть дополнительное свойство `detail`, в котором можно указывать информацию для передачи в событие.

Например:

```html
<!--+ run -->
<h1 id="elem">Привет для Васи!</h1>

<script>
  elem.addEventListener("hello", function(event) { 
    alert( *!*event.detail.name*/!* );
  }, false);

  var event = new CustomEvent("hello", { 
*!*
    detail: { name: "Вася" }
*/!*
  }); 

  elem.dispatchEvent(event);
</script>
```

Надо сказать, что никто не мешает и в обычное `Event` записать любые свойства. Но `CustomEvent` более явно говорит, что событие не встроенное, а своё, и выделяет отдельно "информационное" поле `detail`, в которое можно записать что угодно без конфликта со стандартными свойствами объекта.

## Старое API для IE9+

В предыдущем стандарте [DOM 3 Events](http://www.w3.org/TR/DOM-Level-3-Events) была предусмотрена [иерархия событий](http://www.w3.org/TR/DOM-Level-3-Events/#event-interfaces), с различными методами инициализации.

Она поддерживается как современными браузерами, так и IE9+. Для генерации событий используется немного другой синтаксис, но по возможностям -- всё то же самое, что и в современном стандарте.

Объект события создаётся вызовом `document.createEvent`:

```js
var event = document.createEvent(eventInterface);
```

Аргументы:
<ul>
<li>`eventInterface` -- это тип события, например `MouseEvent`, `FocusEvent`, `KeyboardEvent`. В [секции 5 DOM 3 Events](http://www.w3.org/TR/DOM-Level-3-Events/#events-module) есть подробный список, какое событие к какому интерфейсу относится.
</li>
</ul>

**На практике можно всегда использовать самый общий интерфейс: `document.createEvent("Event")`.**

Далее событие нужно инициализовать:

```js
event.initEvent(type, boolean bubbles, boolean cancelable);
```

Аргументы:
<ul>
<li>`type` -- тип события, например `"click"`.</li>
<li>`bubbles` -- всплывает ли событие.</li>
<li>`cancelable` -- можно ли отменить событие`.</li>
</ul>

Эти два кода аналогичны:

```js
// современный стандарт
var event = new Event("click", { bubbles: true, cancelable: true });

// старый стандарт
var event = document.createEvent("Event");
event.initEvent("click", true, true);
```

Единственная разница -- старый стандарт поддерживается IE9+.

Этот пример с событием `hello` будет работать во всех браузерах, кроме IE8-:

```html
<!--+ run -->
<h1 id="elem">Привет от скрипта!</h1>

<script>
  document.addEventListener("hello", function(event) { 
    alert("Привет");
    event.preventDefault();  
  }, false);

*!*
  var event = document.createEvent("Event");
  event.initEvent("hello", true, true);
*/!*

  if (elem.dispatchEvent(event) === false) {
    alert('Событие было отменено preventDefault');
  }

</script>
```

[smart header="`initMouseEvent`, `initKeyboardEvent` и другие..."]
У конкретных типов событий, например `MouseEvent`, `KeyboardEvent`, есть методы, которые позволяют указать стандартные свойства.

Они называются по аналогии: `initMouseEvent`, `initKeyboardEvent`. 

Их можно использовать вместо базового `initEvent`, если хочется, чтобы свойства событий соответствовали встроенным браузерным.

Выглядят они немного страшновато, например (взято из [спецификации](http://www.w3.org/TR/DOM-Level-3-Events/#idl-interface-MouseEvent-initializers)):

```js
void initMouseEvent ( 
  DOMString typeArg,  // тип
  boolean bubblesArg,  // всплывает?
  boolean cancelableArg,  // можно отменить?
  AbstractView? viewArg, // объект window, null означает текущее окно
  long detailArg,   // свойство detail и другие...
  long screenXArg,   
  long screenYArg,  
  long clientXArg,  
  long clientYArg, 
  boolean ctrlKeyArg, 
  boolean altKeyArg, 
  boolean shiftKeyArg, 
  boolean metaKeyArg, 
  unsigned short buttonArg, 
  EventTarget? relatedTargetArg);
};
```

Для инициализации мышиного события нужно обязательно указать *все* аргументы, например:

```html
<!--+ run -->
<button id="elem">Автоклик</button>

<script>
  elem.onclick = function(e) {
    alert('Клик на координатах ' + e.clientX + ':' + e.clientY);
  };

  var event = document.createEvent("MouseEvent");
*!*
  event.initMouseEvent("click", true, true, null, 0, 0, 0, 100, 100, true, true, true, null, 1, null);
*/!*
  elem.dispatchEvent(event);
</script>
```

Браузер, по стандарту, может сгенерировать отсутствующие свойства самостоятельно, например `pageX`, но это нужно проверять в конкретных случаях, обычно это не работает или работает некорректно.
[/smart]

## Антистандарт: IE8-

В совсем старом IE были "свои" методы `document.createEventObject()` и `elem.fireEvent()`.

Пример с ними для IE8:

```html
<!--+ run -->
<button id="elem">Автоклик</button>

<script>
  document.body.onclick = function() {
    alert("Клик, event.type=" + event.type);
    return false;
  };

*!*
  var event = document.createEventObject();
  if( !elem.fireEvent("onclick", event) ) {
    alert('Событие было отменено');
  } 
*/!*
</script>
```

**При помощи `fireEvent` можно сгенерировать только встроенные события.**

Если указать `"hello"` вместо `"onclick"` в примере выше -- будет ошибка.

Параметры `bubbles` и `cancelable` настраивать нельзя, браузер использует стандартные для данного типа событий.

## Кросс-браузерный пример

Для поддержки IE9+ достаточно использовать методы `document.createEvent` и `event.initEvent`, как показано выше, и всё будет хорошо.

Если же нужен IE8, то подойдёт такой код:

```js
function trigger(elem, type){
  if (document.createEvent) {
    var event = document.createEvent('Event') : 
    event.initEvent(type);
    return elem.dispatchEvent(event);
  } 

  var event = document.createEventObject();
  return elem.fireEvent("on"+type, event);
}

// использование:
trigger(elem, "click");
```

Конечно, надо иметь в виду, что в IE8 события можно использовать только встроенные, а `bubbles` и `cancelable` поставить нельзя.

## Итого

<ul>
<li>Все браузеры, кроме IE, позволяют генерировать любые события, следуя стандарту DOM4.</li>
<li>IE9+ тоже справляется, если использовать вызовы более старого стандарта, и имеет в итоге тот же функционал.</li>
<li>IE8- может генерировать только встроенные события.</li>
</ul>

**Несмотря на техническую возможность генерировать браузерные события -- пользоваться ей стоит с большой осторожностью.**

В 98% случаев, когда разработчик начинающего или среднего уровня хочет сгенерировать *встроенное* событие -- это вызвано "кривой" архитектурой кода, и взаимодействие нужно на уровне выше. 

Как правило события имеет смысл генерировать:
<ul>
<li>Либо как явный и грубый хак, чтобы заставить работать сторонние библиотеки, в которых не предусмотрены другие средства взаимодействия.</li>
<li>Либо для автоматического тестирования, чтобы скриптом "нажать на кнопку" и посмотреть, произошло ли нужное действие.</li>
<li>Либо при создании своих "элементов интерфейса". Например, никто не мешает при помощи JavaScript создать из `<div class="calendar">` красивый календарь и генерировать на нём событие `change` при выборе даты. Эту тему мы разовьём позже.</li>
</ul>
