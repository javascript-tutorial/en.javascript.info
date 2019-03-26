# Custom Elements

"Custom Elements" is a way to create new HTML elements and describe their properties, methods and constructor with JavaScript.

After we define a custom element, we can use it freely both in scripts or in generated HTML, on par with built-in HTML elements. The browser becomes responsible for calling proper methods when the element is created, added or removed from DOM, and that's very convenient.



## "tel" example



For ins, we'd like to show a date in visitor's time zone.

The time zone is

A critical reader may wonder: "Do we need custom HTML elements? We can create interfaces from existing ones".



Критично настроенный читатель скажет: "Зачем ещё стандарт для своих типов элементов? Я могу создать любой элемент и прямо сейчас! В любом из современных браузеров можно писать любой HTML, используя свои теги: `<mytag>`. Или создавать элементы из JavaScript при помощи `document.createElement('mytag')`."

Однако, по умолчанию элемент с нестандартным названием (например `<mytag>`) воспринимается браузером, как нечто неопределённо-непонятное. Ему соответствует класс [HTMLUnknownElement](http://www.w3.org/TR/html5/dom.html#htmlunknownelement), и у него нет каких-либо особых методов.

**Стандарт Custom Elements позволяет описывать для новых элементов свои свойства, методы, объявлять свой DOM, подобие конструктора и многое другое.**

Давайте посмотрим это на примерах.

```warn header="Для примеров рекомендуется Chrome"
Так как спецификация не окончательна, то для запуска примеров рекомендуется использовать Google Chrome, лучше -- последнюю сборку [Chrome Canary](https://www.google.ru/chrome/browser/canary.html), в которой, как правило, отражены последние изменения.
```

## Новый элемент

Для описания нового элемента используется вызов `document.registerElement(имя, { prototype: прототип })`.

Здесь:

- `имя` -- имя нового тега, например `"mega-select"`. Оно обязано содержать дефис `"-"`. Спецификация требует дефис, чтобы избежать в будущем конфликтов со стандартными элементами HTML. Нельзя создать элемент `timer` или `myTimer` -- будет ошибка.
- `прототип` -- объект-прототип для нового элемента, он должен наследовать от `HTMLElement`, чтобы у элемента были стандартные свойства и методы.

Вот, к примеру, новый элемент `<my-timer>`:

```html run
<script>
*!*
  // прототип с методами для нового элемента
*/!*
  var MyTimerProto = Object.create(HTMLElement.prototype);
  MyTimerProto.tick = function() { // *!*свой метод tick*/!*
    this.innerHTML++;
  };

*!*
  // регистрируем новый элемент в браузере
*/!*
  document.registerElement("my-timer", {
    prototype: MyTimerProto
  });
</script>

*!*
<!-- теперь используем новый элемент -->
*/!*
<my-timer id="timer">0</my-timer>

<script>
*!*
  // вызовем метод tick() на элементе
*/!*
  setInterval(function() {
    timer.tick();
  }, 1000);
</script>
```

Использовать новый элемент в HTML можно и до его объявления через `registerElement`.

Для этого в браузере предусмотрен специальный режим "обновления" существующих элементов.

Если браузер видит элемент с неизвестным именем, в котором есть дефис `-` (такие элементы называются "unresolved"), то:

- Он ставит такому элементу специальный CSS-псевдокласс `:unresolved`, для того, чтобы через CSS можно было показать, что он ещё "не подгрузился".
- При вызове `registerElement` такие элементы автоматически обновятся до нужного класса.

В примере ниже регистрация элемента происходит через 2 секунды после его появления в разметке:

```html run no-beautify
<style>
*!*
  /* стиль для :unresolved элемента (до регистрации) */
*/!*
  hello-world:unresolved {
    color: white;
  }

  hello-world {
    transition: color 3s;
  }
</style>

<hello-world id="hello">Hello, world!</hello-world>

<script>
*!*
  // регистрация произойдёт через 2 сек
*/!*
  setTimeout(function() {
    document.registerElement("hello-world", {
      prototype: {
        __proto__: HTMLElement.prototype,
        sayHi: function() { alert('Привет!'); }
      }
    });

*!*
    // у нового типа элементов есть метод sayHi
*/!*
    hello.sayHi();
  }, 2000);
</script>
```

Можно создавать такие элементы и в JavaScript -- обычным вызовом `createElement`:

```js
var timer = document.createElement('my-timer');
```

## Расширение встроенных элементов

Выше мы видели пример создания элемента на основе базового `HTMLElement`. Но можно расширить и другие, более конкретные HTML-элементы.

Для расширения встроенных элементов у `registerElement` предусмотрен параметр `extends`, в котором можно задать, какой тег мы расширяем.

Например, кнопку:

```html run
<script>
  var MyTimerProto = Object.create(*!*HTMLButtonElement.prototype*/!*);
  MyTimerProto.tick = function() {
    this.innerHTML++;
  };

  document.registerElement("my-timer", {
    prototype: MyTimerProto,
*!*
    extends: 'button'
*/!*
  });
</script>

<button *!*is="my-timer"*/!* id="timer">0</button>

<script>
  setInterval(function() {
    timer.tick();
  }, 1000);

  timer.onclick = function() {
    alert("Текущее значение: " + this.innerHTML);
  };
</script>
```

Важные детали:

Прототип теперь наследует не от `HTMLElement`, а от `HTMLButtonElement`
: Чтобы расширить элемент, нужно унаследовать прототип от его класса.

В HTML указывается при помощи атрибута `is="..."`
: Это принципиальное отличие разметки от обычного объявления без `extends`. Теперь `<my-timer>` работать не будет, нужно использовать исходный тег и `is`.

Работают методы, стили и события кнопки.
: При клике на кнопку её не отличишь от встроенной. И всё же, это новый элемент, со своими методами, в данном случае `tick`.

При создании нового элемента в JS, если используется `extends`, необходимо указать и исходный тег в том числе:

```js
var timer = document.createElement("button", "my-timer");
```

## Жизненный цикл

В прототипе своего элемента мы можем задать специальные методы, которые будут вызываться при создании, добавлении и удалении элемента из DOM:

<table>
<tr><td><code>createdCallback</code></td><td>Элемент создан</td></tr>
<tr><td><code>attachedCallback</code></td><td>Элемент добавлен в документ</td></tr>
<tr><td><code>detachedCallback</code></td><td>Элемент удалён из документа</td></tr>
<tr><td><code>attributeChangedCallback(name, prevValue, newValue)</code></td><td>Атрибут добавлен, изменён или удалён</td></tr>
</table>

Как вы, наверняка, заметили, `createdCallback` является подобием конструктора. Он вызывается только при создании элемента, поэтому всю дополнительную инициализацию имеет смысл описывать в нём.

Давайте используем `createdCallback`, чтобы инициализировать таймер, а `attachedCallback` -- чтобы автоматически запускать таймер при вставке в документ:

```html run
<script>
  var MyTimerProto = Object.create(HTMLElement.prototype);

  MyTimerProto.tick = function() {
    this.timer++;
    this.innerHTML = this.timer;
  };

*!*
  MyTimerProto.createdCallback = function() {
    this.timer = 0;
  };
*/!*

*!*
  MyTimerProto.attachedCallback = function() {
    setInterval(this.tick.bind(this), 1000);
  };
*/!*

  document.registerElement("my-timer", {
    prototype: MyTimerProto
  });
</script>

<my-timer id="timer">0</my-timer>
```

## Итого

Мы рассмотрели, как создавать свои DOM-элементы при помощи стандарта [Custom Elements](http://www.w3.org/TR/custom-elements/).

Далее мы перейдём к изучению дополнительных возможностей по работе с DOM.
