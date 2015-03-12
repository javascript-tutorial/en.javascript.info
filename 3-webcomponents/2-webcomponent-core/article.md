# Свои элементы: Custom Elements

Платформа "веб-компоненты" включает в себя несколько стандартов [Web Components](http://www.w3.org/standards/techs/components#w3c_all), которые находятся в разработке.

Начнём мы со стандарта [Custom Elements](http://www.w3.org/TR/custom-elements/), который позволяет создавать свои типы элементов.
[cut]
## Зачем Custom Elements?

Критично настроенный читатель скажет: "Зачем ещё стандарт для создания своих элементов? Я могу создать любой элемент и прямо сейчас! В любом из современных браузеров можно писать любой HTML, используя свои теги: `<mytag>`. Или создавать элементы из JavaScript при помощи `document.createElement('mytag')`. В чём же разница?"

Она в том, что обычно элемент с нестандартным названием (например `<mytag>`) воспринимается браузером, как нечто неопределённо-непонятное. Ему соответствует класс [HTMLUnknownElement](http://www.w3.org/TR/html5/dom.html#htmlunknownelement), и у него нет каких-либо особых методов.

**Стандарт Custom Elements позволяет описывать для новых элементов свои свойства, методы, объявлять свой DOM, подобие конструктора и многое другое.**

Давайте посмотрим это на примерах.

[warn header="Для примеров рекомендуется Chrome"]
Так как спецификация не окончательна, то для запуска примеров рекомендуется использовать Google Chrome, лучше -- последнюю сборку [Chrome Canary](https://www.google.ru/chrome/browser/canary.html), в которой, как правило, отражены последние изменения.
[/warn]

## Новый элемент

Для описания нового элемента используется вызов `document.registerElement(имя, { prototype: прототип })`.

Здесь:
<ul>
<li>`имя` -- имя нового тега, например `"mega-select"`. Оно обязано содержать дефис `"-"`. Спецификация требует дефис, чтобы избежать в будущем конфликтов со стандартными элементами HTML. Нельзя создать элемент `timer` или `myTimer` -- будет ошибка.</li>
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

Использовать новый элемент в HTML можно и до его объявления через `registerElement`.

Для этого в браузере предусмотрен специальный режим "обновления" существующих элементов.

Если браузер видит элемент с неизвестным именем, в котором есть дефис `-` (такие элементы называются "unresolved"), то:
<ul>
<li>Он ставит такому элементу специальный CSS-псевдокласс `:unresolved`, для того, чтобы через CSS можно было показать, что он ещё "не подгрузился".</li>
<li>При вызове `registerElement` такие элементы автоматически обновятся до нужного класса.</li>
</ul>

В примере ниже регистрация элемента происходит через 2 секунды после его появления в разметке:

```html
<!--+ run  no-beautify -->
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

В прототипе своего элемента мы можем задать специальные методы, которые будут вызываться при создании, добавлении и удалении элемента из DOM:

<table>
<tr><td>`createdCallback`</td><td>Элемент создан</td></tr>
<tr><td>`attachedCallback`</td><td>Элемент добавлен в документ</td></tr>
<tr><td>`detachedCallback`</td><td>Элемент удалён из документа</td></tr>
<tr><td>`attributeChangedCallback(name, prevValue, newValue)`</td><td>Атрибут добавлен, изменён или удалён</td></tr>
</table>

Как вы, наверняка, заметили, `createdCallback` является подобием конструктора. Он вызывается только при создании элемента, поэтому всю дополнительную инициализацию имеет смысл описывать в нём.

Давайте используем `createdCallback`, чтобы инициализовать таймер, а `attachedCallback` -- чтобы автоматически запускать таймер при вставке в документ:

```html
<!--+ run -->
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

