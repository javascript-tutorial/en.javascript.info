# Веб-компоненты

Сердцем платформы "веб-компоненты" является стандарт [Web Components](http://w3c.github.io/webcomponents/explainer/), который находится в разработке и позволяет описывать свои элементы.
[cut]
## Зачем Web Components?

Критично настроенный читатель скажет: "Зачем ещё стандарт для создания своих элементов? Я могу создать любой элемент и прямо сейчас! В любом из современных браузеров можно писать любой HTML, используя свои теги. В чём же разница?"

Она в том, что обычно элемент с нестандартным названием (например `<message>`) воспринимается браузером, как нечто неопределённо-непонятное. Ему соответствует класс [HTMLUnknownElement](http://www.w3.org/TR/html5/dom.html#htmlunknownelement), и у него нет каких-либо особых методов.

**Стандарт Web Components позволяет описывать для новых элементов свои свойства, методы, объявлять свой DOM, подобие конструктора и многое другое.**

Давайте посмотрим это на примерах.

[warn header="Только Chrome"]
Так как спецификация не окончательна, то для запуска примеров рекомендуется использовать Chrome Canary.
[/warn]

## Новый элемент

Для описания нового элемента используется вызов `document.registerElement(имя, { prototype: прототип })`.

Здесь:
<ul>
<li>`имя` -- имя нового тега, например `"mega-select"`. Оно обязано содержать дефис `-`. Спецификация требует дефис, чтобы избежать в будущем конфликтов со стандартными элементами HTML. Нельзя создать элемент `timer` или `myTimer` -- будет ошибка.</li>
<li>`прототип` -- объект-прототип для нового элемента, он должен наследовать от `HTMLElement`, чтобы у элемента были стандартные свойства и методы.</li>
</ul>

Вот, к примеру, новый элемент `<my-timer>`:

```html
<!--+ run -->
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

**Метод `registerElement` может быть вызван в любое время, даже и после появления `<my-timer>` в HTML.**

Для этого в браузере предусмотрен специальный режим "обновления" существующих элементов.

Если браузер видит элемент с неизвестным именем, в котором есть дефис `-` (такие элементы называются "unresolved"), то:
<ul>
<li>Он ставит такому элементу специальный CSS-псевдокласс `:unresolved`, для того, чтобы через CSS можно было показать, что он ещё "не подгрузился".</li>
<li>При вызове `registerElement` такие элементы автоматически обновятся до нужного класса.</li>
</ul>

Вот демо того, что происходит, когда регистрация элемента происходит после его появления в разметке:

```html
<!--+ run -->
<style>
*!*
  /* стиль для :unresolved элемента (до регистрации) */
*/!*
  hello-world:unresolved {
    color: white;
  }
  
  hello-world {
    transition: color 5s;
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
 
    hello.sayHi();
  }, 2000);
</script>
```

Создание таких элементов в JavaScript никак не отличается от обычных:

```js
var timer = document.createElement('my-timer');
```

## Расширение встроенных элементов

Для расширения встроенных элементов у `registerElement` предусмотрен параметр `extends`, в котором можно задать, какой тег мы расширяем.

Например:

```html
<!--+ run -->
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
<dl>
<dt>Прототип теперь наследует не от `HTMLElement`, а от `HTMLButtonElement`</dt>
<dd>Чтобы расширить элемент, нужно унаследовать прототип от его класса.</dd>
<dt>В HTML указывается при помощи атрибута `is="..."`</dt>
<dd>Это принципиальное отличие разметки от обычного объявления без `extends`. Теперь `<my-timer>` работать не будет, нужно использовать исходный тег и `is`.</dd>
<dt>Работают методы, стили и события кнопки.</dt>
<dd>При клике на кнопку её не отличишь от встроенной. И всё же, это новый элемент, со своими методами, в данном случае `tick`.</dd>
</dl>

При создании нового элемента в JS, если используется `extends`, необходимо указать и исходный тег в том числе:

```js
var timer = document.createElement("button", "my-timer");
```

## Жизненный цикл

Следующие методы автоматически вызываются во время жизненного цикла элемента:

<table class="bordered">
<tr><td>`createdCallback`</td><td>Элемент создан</td></tr>
<tr><td>`attachedCallback`</td><td>Элемент добавлен в документ</td></tr>
<tr><td>`detachedCallback`</td><td>Элемент удалён из документа</td></tr>
<tr><td>`attributeChangedCallback(name, prevValue, newValue)`</td><td>Атрибут добавлен, изменён или удалён</td></tr>
</table>

Как вы, наверняка, заметили, `createdCallback` является подобием конструктора. Можно добавить к элементу свойства, запросить с сервера данные и так далее.

Давайте используем `attachedCallback`, чтобы автоматически запускать таймер при вставке в документ:

```html
<!--+ run -->
<script>
  var MyTimerProto = Object.create(HTMLElement.prototype);

  MyTimerProto.tick = function() { 
    this.innerHTML++;
  };

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

Спецификация:
<ul>
<li>[Introduction to Web Components](http://w3c.github.io/webcomponents/explainer/)</li>
<li>[Custom Elements](http://w3c.github.io/webcomponents/spec/custom/)</li>
</ul>


