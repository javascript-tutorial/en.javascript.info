# Attributes and DOM properties

The browser "reads" HTML text and generates DOM objects from it. For element nodes most standard HTML attributes automatically become properties of DOM objects.

For instance, if the tag is `<body id="page">`, then the DOM object will have `body.id = "page"`.

But the mapping is not one-to-one! Sometimes they are different, we'll see that soon. We should understand attributes and DOM properties relationship to feel comfortable with DOM.

[cut]

## Custom DOM properties

We've already seen built-in DOM properties. But technically no one limits us.

DOM nodes are regular Javascript objects. We can alter them if we'd like, create custom properties and methods.

For instance, let's create a new property in `document.body`:

```js run
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator
```

We can add a method as well:

```js run
document.body.sayHi = function() {
  alert(this.nodeName);
};

document.body.sayHi(); // BODY (the value of "this" in the method is document.body)
```

We can also modify built-in prototypes like `Element.prototype` and add new methods to all element nodes.

So, DOM properties:

- Can have any value.
- Are case-sensitive (`elem.nodeType`, not `elem.NoDeTyPe`).
- Work, because DOM nodes are objects.

## HTML attributes

In HTML language, tags may have attributes. When the browser reads HTML text and creates DOM objects for tags, it recognizes *known* attributes and creates DOM properties from them.

So when an element has `id` or another standard attribute, the corresponding property gets created. But that doesn't happen if the attribute is non-standard.

For instance:
```html run
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
*!*
    alert(document.body.something); // undefined
*/!*
  </script>
</body>
```

Please note that a standard attribute for one element can be unknown for another one. All standard attributes are described in the specification for the corresponding class.

For instance, `type` is standard for `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), but not for `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)):
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined, DOM property not created
*/!*
  </script>
</body>
```

So, if an attribute is non-standard, there won't be DOM-property for it. Is there a way to access such attributes?

Sure. All attributes are accessible using following methods:

- `elem.hasAttribute(name)` -- checks for existance.
- `elem.getAttribute(name)` -- gets the value.
- `elem.setAttribute(name, value)` -- sets the value.
- `elem.removeAttribute(name)` -- removes the attribute.

Also one can read all attributes using `elem.attributes`. It's a collection of [Attr](https://dom.spec.whatwg.org/#attr) objects, each one with `name` and `value`.

These methods operate exactly with what's written in HTML.

Here's an example:

```html run
<body type="test" something="non-standard">
  <script>
    alert(document.body.getAttribute('type')); // test
*!*
    alert(document.body.getAttribute('something')); // non-standard
*/!*
  </script>
</body>
```

HTML attributes have following special features:

- They are always strings.
- Their name is case-insensitive (that's HTML: `id` is same as `ID`).

Here's the extended demo of working with attributes:

```html run
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', reading

    elem.setAttribute('Test', 123); // (2), writing

    alert( elem.outerHTML ); // (3), see it's there

    for (let attr of elem.attributes) { // (4) list all
      alert( attr.name + " = " + attr.value );
    }
  </script>
</body>
```

Please note:

1. `getAttribute('About')` -- the first letter is uppercase here, and in HTML it's all lowercase. But that doesn't matter: attribute names are case-insensitive.
2. We can assign anything to an attribute, but that becomes a string. So here we have `"123"` as the value.
3. All attributes including ones that we set are seen in `innerHTML`.
4. The `attributes` collection is iterable and has all attributes with `name` and `value`.

## Attribute synchronization

All standard DOM properties are synchronized with


Все стандартные свойства DOM синхронизируются с атрибутами, однако не всегда такая синхронизация происходит 1-в-1, поэтому иногда нам нужно значение именно из HTML, то есть атрибут.

Рассмотрим несколько примеров.

### Ссылка "как есть" из атрибута href

Синхронизация не гарантирует одинакового значения в атрибуте и свойстве.

Для примера, посмотрим, что произойдет с атрибутом `"href"` при изменении свойства:

```html height=30 run
<a id="a" href="#"></a>
<script>
*!*
  a.href = '/';
*/!*

  alert( 'атрибут:' + a.getAttribute('href') ); // '/'
  alert( 'свойство:' + a.href );  // *!*полный URL*/!*

</script>
```

Это происходит потому, что атрибут может быть любым, а свойство `href`, <a href="http://www.w3.org/TR/REC-html40/struct/links.html#adef-href">в соответствии со спецификацией W3C</a>, должно быть полной ссылкой.

Стало быть, если мы хотим именно то, что в HTML, то нужно обращаться через атрибут.

````smart header="Есть и другие подобные атрибуты"
Кстати, есть и другие атрибуты, которые не копируются в точности. Например, DOM-свойство `input.checked` имеет логическое значение `true/false`, а HTML-атрибут `checked` -- любое строковое, важно лишь его наличие.

Работа с `checked` через атрибут и свойство:

```html run
<input id="input" type="checkbox" checked>

<script>
*!*
  // работа с checked через атрибут
*/!*
  alert( input.getAttribute('checked') ); // пустая строка
  input.removeAttribute('checked'); // снять галочку

*!*
  // работа с checked через свойство
*/!*
  alert( input.checked ); // false <-- может быть только true/false
  input.checked = true; // поставить галочку
</script>
```
````

### Исходное значение value

Изменение некоторых свойств обновляет атрибут. Но это скорее исключение, чем правило.

**Чаще синхронизация -- односторонняя: свойство зависит от атрибута, но не наоборот.**

Например, при изменении свойства `input.value` атрибут `input.getAttribute('value')` не меняется:

```html height=30 run
<body>
  <input id="input" type="text" value="markup">
  <script>
*!*
    input.value = 'new'; // поменяли свойство

    alert( input.getAttribute('value') ); // 'markup', не изменилось!
*/!*
  </script>
</body>
```

То есть, изменение DOM-свойства `value` на атрибут не влияет, он остаётся таким же.

А вот изменение атрибута обновляет свойство:

```html height=30 run
<body>
  <input id="input" type="text" value="markup">
  <script>
*!*
    input.setAttribute('value', 'new'); // поменяли атрибут

    alert( input.value ); // 'new', input.value изменилось!
*/!*
  </script>
</body>
```

Эту особенность можно красиво использовать.

Получается, что атрибут `input.getAttribute('value')` хранит оригинальное (исходное) значение даже после того, как пользователь заполнил поле и свойство изменилось.

Например, можно взять изначальное значение из атрибута и сравнить со свойством, чтобы узнать, изменилось ли значение. А при необходимости и перезаписать свойство атрибутом, отменив изменения.

## Классы в виде строки: className

Атрибуту `"class"` соответствует свойство `className`.

Так как слово `"class"` является зарезервированным словом в Javascript, то при проектировании DOM решили, что соответствующее свойство будет называться `className`.

Например:

```html run
<body class="main page">
  <script>
    // прочитать класс элемента
    alert( document.body.className ); // main page

    // поменять класс элемента
    document.body.className = "class1 class2";
  </script>
</body>
```

Кстати, есть и другие атрибуты, которые называются иначе, чем свойство. Например, атрибуту `for` (`<label for="...">`) соответствует свойство с названием `htmlFor`.

## Классы в виде объекта: classList

Атрибут `class` -- уникален. Ему соответствует аж целых два свойства!

Работать с классами как со строкой неудобно. Поэтому, кроме `className`, в современных браузерах есть свойство `classList`.

**Свойство `classList` -- это объект для работы с классами.**

Оно поддерживается в IE начиная с IE10, но его можно эмулировать в IE8+, подключив мини-библиотеку [classList.js](https://github.com/eligrey/classList.js).

Методы `classList`:

- `elem.classList.contains("class")` -- возвращает `true/false`, в зависимости от того, есть ли у элемента класс `class`.
- `elem.classList.add/remove("class")` -- добавляет/удаляет класс `class`
- `elem.classList.toggle("class")` -- если класса `class` нет, добавляет его, если есть -- удаляет.

Кроме того, можно перебрать классы через `for`, так как `classList` -- это псевдо-массив.

Например:

```html run
<body class="main page">
  <script>
    var classList = document.body.classList;

    classList.remove('page'); // удалить класс
    classList.add('post'); // добавить класс

    for (var i = 0; i < classList.length; i++) { // перечислить классы
      alert( classList[i] ); // main, затем post
    }

    alert( classList.contains('post') ); // проверить наличие класса

    alert( document.body.className ); // main post, тоже работает
  </script>
</body>
```

## Нестандартные атрибуты

У каждого элемента есть некоторый набор стандартных свойств, например для `<a>` это будут `href`, `name`, `title`, а для `<img>` это будут `src`, `alt`, и так далее.

Точный набор свойств описан в стандарте, обычно мы более-менее представляем, если пользуемся HTML, какие свойства могут быть, а какие -- нет.

Для нестандартных атрибутов DOM-свойство не создаётся.

Например:

```html run
<div id="elem" href="http://ya.ru" about="Elephant"></div>

<script>
  alert( elem.id ); // elem
*!*
  alert( elem.about ); // undefined
*/!*
</script>
```

Свойство является стандартным, только если оно описано в стандарте именно для этого элемента.

То есть, если назначить элементу `<img>` атрибут `href`, то свойство `img.href` от этого не появится. Как, впрочем, и если назначить ссылке `<a>` атрибут `alt`:

```html run
<img id="img" href="test">
<a id="link" alt="test"></a>

<script>
  alert( img.href ); // undefined
  alert( link.alt ); // undefined
</script>
```

Нестандартные атрибуты иногда используют для CSS.

В примере ниже для показа "состояния заказа" используется атрибут `order-state`:

```html run
<style>
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  Новый заказ.
</div>

<div class="order" order-state="pending">
  Ожидающий заказ.
</div>

<div class="order" order-state="canceled">
  Заказ отменён.
</div>
```

Почему именно атрибут? Разве нельзя было сделать классы `.order-state-new`, `.order-state-pending`, `order-state-canceled`?

Конечно можно, но манипулировать атрибутом из JavaScript гораздо проще.

Например, если нужно отменить заказ, неважно в каком он состоянии сейчас -- это сделает код:
```js
div.setAttribute('order-state', 'canceled');
```

Для классов -- нужно знать, какой класс у заказа сейчас. И тогда мы можем снять старый класс, и поставить новый:

```js
div.classList.remove('order-state-new');
div.classList.add('order-state-canceled');
```

...То есть, требуется больше исходной информации и надо написать больше букв. Это менее удобно.

Проще говоря, значение атрибута -- произвольная строка, значение класса -- это "есть" или "нет", поэтому естественно, что атрибуты "мощнее" и бывают удобнее классов как в JS так и в CSS.

## Свойство dataset, data-атрибуты

С помощью нестандартных атрибутов можно привязать к элементу данные, которые будут доступны в JavaScript.

Как правило, это делается при помощи атрибутов с названиями, начинающимися на `data-`, например:

```html run
<div id="elem" *!*data-about*/!*="Elephant" *!*data-user-location*/!*="street">
  По улице прошёлся слон. Весьма красив и толст был он.
</div>
<script>
  alert( elem.getAttribute('data-about') ); // Elephant
  alert( elem.getAttribute('data-user-location') ); // street
</script>
```

[Стандарт HTML5](http://www.w3.org/TR/2010/WD-html5-20101019/elements.html#embedding-custom-non-visible-data-with-the-data-attributes) специально разрешает атрибуты `data-*` и резервирует их для пользовательских данных.

При этом во всех браузерах, кроме IE10-, к таким атрибутам можно обратиться не только как к атрибутам, но и как к свойствам, при помощи специального свойства `dataset`:

```html run
<div id="elem" data-about="Elephant" data-user-location="street">
  По улице прошёлся слон. Весьма красив и толст был он.
</div>
<script>
*!*
  alert( elem.dataset.about ); // Elephant
  alert( elem.dataset.userLocation ); // street
*/!*
</script>
```

Обратим внимание -- название `data-user-location` трансформировалось в `dataset.userLocation`. Дефис превращается в большую букву.

## Полифилл для атрибута hidden

Для старых браузеров современные атрибуты иногда нуждаются в полифилле. Как правило, такой полифилл включает в себя не только JavaScript, но и CSS.

Например, свойство/атрибут hidden не поддерживается в IE11.

Этот атрибут должен прятать элемент, действие весьма простое, для его поддержки в HTML достаточно такого CSS:

```html run height="80" no-beautify
<style>
*!*
  [hidden] { display: none }
*/!*
</style>

<div>Текст</div>
<div hidden>С атрибутом hidden</div>
<div id="last">Со свойством hidden</div>

<script>
  last.hidden = true;
</script>
```

Если запустить в IE11- пример выше, то `<div hidden>` будет скрыт, а вот последний `div`, которому поставили свойство `hidden` в JavaScript -- по-прежнему виден.

Это потому что CSS "не видит" присвоенное свойство, нужно синхронизировать его в атрибут.

Вот так -- уже работает:

```html run height="80" no-beautify
<style>
*!*
  [hidden] { display: none }
*/!*
</style>

<script>
*!*
  if (document.documentElement.hidden === undefined) {
    Object.defineProperty(Element.prototype, "hidden", {
      set: function(value) {
        this.setAttribute('hidden', value);
      },
      get: function() {
        return this.getAttribute('hidden');
      }
    });
  }
*/!*
</script>

<div>Текст</div>
<div hidden>С атрибутом hidden</div>
<div id="last">Со свойством hidden</div>

<script>
  last.hidden = true;
</script>
```

## "Особенности" IE8

Если вам нужна поддержка этих версий IE -- есть пара нюансов.

1. Во-первых, версии IE8- синхронизируют все свойства и атрибуты, а не только стандартные:

    ```js run
    document.body.setAttribute('my', 123);

    alert( document.body.my ); // 123 в IE8-
    ```

    При этом даже тип данных не меняется. Атрибут не становится строкой, как ему положено.
2. Ещё одна некорректность IE8-: для изменения класса нужно использовать именно свойство `className`, вызов `setAttribute('class', ...)` не сработает.

Вывод из этого довольно прост -- чтобы не иметь проблем в IE8, нужно использовать всегда только свойства, кроме тех ситуаций, когда нужны именно атрибуты. Впрочем, это в любом случае хорошая практика.

## Итого

- Атрибуты -- это то, что написано в HTML.
- Свойство -- это то, что находится в свойстве DOM-объекта.

Таблица сравнений для атрибутов и свойств:

<table>
<thead>
<tr>
<th>Свойства</th>
<th>Атрибуты</th>
</tr>
</thead>
<tbody>
<tr>
<td>Любое значение</td>
<td>Строка</td>
</tr>
<tr>
<td>Названия регистрозависимы</td>
<td>Не чувствительны к регистру</td>
</tr>
<tr>
<td>Не видны в <code>innerHTML</code></td>
<td>Видны в <code>innerHTML</code></td>
</tr>
</tbody>
</table>

Синхронизация между атрибутами и свойствами:

- Стандартные свойства и атрибуты синхронизируются: установка атрибута автоматически ставит свойство DOM. Некоторые свойства синхронизируются в обе стороны.
- Бывает так, что свойство не совсем соответствует атрибуту. Например, "логические" свойства вроде `checked`, `selected` всегда имеют значение `true/false`, а в атрибут можно записать произвольную строку.Выше мы видели другие примеры на эту тему, например `href`.

Нестандартные атрибуты:

- Нестандартный атрибут (если забыть глюки старых IE) никогда не попадёт в свойство, так что для кросс-браузерного доступа к нему нужно обязательно использовать `getAttribute`.
- Атрибуты, название которых начинается с `data-`, можно прочитать через `dataset`. Эта возможность не поддерживается  IE10-.

Для того, чтобы избежать проблем со старыми IE, а также для более короткого и понятного кода старайтесь везде использовать свойства, а атрибуты -- только там, где это *действительно* нужно.

А *действительно* нужны атрибуты очень редко - лишь в следующих трёх случаях:

1. Когда нужно кросс-браузерно получить нестандартный HTML-атрибут.
2. Когда нужно получить "оригинальное значение" стандартного HTML-атрибута, например, `<input value="...">`.
3. Когда нужно получить список всех атрибутов, включая пользовательские. Для этого используется коллекция `attributes`.

Если вы хотите использовать собственные атрибуты в HTML, то помните, что атрибуты с именем, начинающимся на `data-` валидны в HTML5 и современные браузеры поддерживают доступ к ним через свойство `dataset`.
