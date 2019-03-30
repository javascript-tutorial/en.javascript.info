
# Custom elements

We can create our own class for a custom HTML element with its own methods and properties, events and so on.

There are two kinds of custom elements:

1. **Autonomous custom elements** -- "all-new" elements, extending the abstract `HTMLElement` class.
2. **Customized built-in elements** -- extending built-in elements, like customized `HTMLButtonElement` etc.

First we'll see how autonomous elements are made, and then the customized built-in ones.

For a class to describe an element, it should support so-called "custom element reactions" -- methods that the browser calls when our element is created/added/removed from DOM.

That's easy, as there are only few of them. Here's a sketch with the full list:

```js
class MyElement extends HTMLElement {
  constructor() {
    // element created
  }

  connectedCallback() {
    // browser calls it when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls it when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (document.adoptNode call, very rarely used)
  }
}
```

Then we need to register the element:

```js
// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

Now for any new elements with tag `my-element`, an instance of `MyElement` is created, and the aforementioned methods are called.

```smart header="Custom element name must contain a hyphen `-`"
Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That's to ensure that there are no name conflicts between built-in and custom HTML elements.
```

## Example: "time-formatted"

For example, there already exists `<time>` element in HTML, for date/time. But it doesn't do any formatting by itself.

Let's create `<time-formatted>` element that does the formatting:


```html run height=50 autorun
<script>
class TimeFormatted extends HTMLElement {

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted
  datetime="2019-12-01"
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>
```

As the result, `<time-formatted>` shows a nicely formatted time, according to the browser timezone and locale. We use the built-in [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers.

```smart header="Custom elements upgrade"
If the browser encounters any `<time-formatted>` elements before `customElements.define` call, they are yet unknown, just like any non-standard tag.

They can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are "upgraded": a new instance of `TimeFormatted`
is created for each, and `connectedCallback` is called. They become `:defined`.

To track custom elements from JavaScript, there are methods:
- `customElements.get(name)` -- returns the class for a defined custom element with the given `name`,
- `customElements.whenDefined(name)` -- returns a promise that resolves (without value) when a custom element with the given `name` is defined.
```

```smart header="Rendering in `connectedCallback` instead of `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

First, that might be better performance-wise -- to delay the work until its really needed.

The `connectedCallback` triggers when the element is in the document, not just appended to another element as a child. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.

Second, when the element is on the page, we can get geometry information about it, e.g.  sizes (`elem.offsetWidth/offsetHeight`), so rendering at this stage is more powerful.

On the other hand, `constructor` is the right place to initialize internal data structures, do lightweight jobs.
```



## Observing attributes

Please note that in the current implementation, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, the change is immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter, and then update the element in `attributeChangedCallback`. It's called for changes only in the listed attributes for performance reasons.

```html run autorun height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.


## Customized built-in elements

New custom elements like `<time-formatted>` don't have any associated semantics. They are totally new to search engines and accessibility devices.

We could use special [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes to describe the semantic. But if we're going to make a special button, why not extend a `<button>` element itself?

Built-in elements can be customized by inheriting from their classes. HTML buttons are instances of `HTMLButtonElement`, so let's extend it:

```html run autorun
<script>
// The button that says "hello" on click
class HelloButton extends HTMLButtonElement {
*!*
  constructor() { // (1)
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'}); // 2
*/!*
</script>

<!-- 3 -->
*!*
<button is="hello-button">Click me</button>
*/!*

<!-- 4 -->
*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

1. We constructor add an event listener to the element. Please note: we must call `super()` before anything else (that's pure JS requirement).
2. To extend a built-in element, we must specify `{extends: '<tag>'}` in the define. Some tags share the same HTML class, so we need to be precise here.
3. Now we can use a regular `<button>` tag, labelled with `is="hello-button"`.
4. Our buttons extend built-in ones, so they retain the standard features like `disabled` attribute.



For example, we can create `<custom-dropdown>` -- a nice-looking dropdown select, `<phone-input>` -- an input element for a phone number, and other graphical components.

There are two kinds of custom elements:




An autonomous custom element, which is defined with no extends option. These types of custom elements have a local name equal to their defined name.

A customized built-in element, which is defined with an extends option. These types of custom elements have a local name equal to the value passed in their extends option, and their defined name is used as the value of the is attribute, which therefore must be a valid custom element name.



```js run
class DateLocal extends HTMLElement {
  constructor() {
    // element is created/upgraded
    super();
  }

}



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
