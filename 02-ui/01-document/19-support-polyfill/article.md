# Современный DOM: полифиллы

В старых IE, особенно в IE8 и ниже, ряд стандартных DOM-свойств не поддерживаются или поддерживаются плохо.

Но это не значит, что, поддерживая IE8-, мы должны о них забыть!

Их можно использовать, необходимо только поставить нужный полифилл.
[cut]

## Полифиллы

**"Полифилл" (англ. polyfill) -- это библиотека, которая добавляет в старые браузеры поддержку возможностей, которые в современных браузерах являются встроенными.**

Один полифилл мы уже видели, когда изучали собственно JavaScript -- это библиотека [ES5 shim](https://github.com/es-shims/es5-shim). Если её подключить, то в IE8- начинают работать многие возможности ES5. Работает она через модификацию стандартных объектов и их прототипов. Это типично для полифиллов.

В работе с DOM несовместимостей гораздо больше, как и способов их обхода.

Как правило, полифиллы организованы в виде коллекции, из которой можно как выбрать отдельные свойства и функции, так и подключить всё вместе, пачкой.

Примеры полифиллов:
<ul>
<li>[](https://github.com/jonathantneal/polyfill) -- ES5 вместе с DOM</li>
<li>[](https://github.com/termi/ES5-DOM-SHIM) -- ES5 вместе с DOM</li>
<li>[](https://github.com/inexorabletash/polyfill) -- ES5+ вместе с DOM</li>
</ul>

Есть и более мелкие библиотеки, а также коллекции ссылок на них:

<ul>
<li>[](http://compatibility.shwups-cms.ch/en/polyfills/)</li>
<li>[](http://html5please.com/#polyfill)</li>
<li>[](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)</li>
</ul>

Например, мы хотим в браузере IE8 использовать свойство `firstElementChild`, которое по умолчанию отсутствует.

Для этого мы либо смотрим свою любимую коллекцию полифиллов на предмет его поддержки, либо набираем в Google: ["\"polyfill firstElementChild\""](https://www.google.ru/search?q=polyfill+firstElementChild). Одна из ссылок укажет на [](http://compatibility.shwups-cms.ch/en/polyfills/)... 

И вот, пожалуйста, код, который нужно подключить к IE8, чтобы получить `firstElementChild` (и не только):
<ul>
<li>[](http://compatibility.shwups-cms.ch/en/polyfills?&id=81)</li>
</ul>

## Что делает полифилл?

Как работает полифилл для `firstElementChild`? Посмотрим внимательнее на его JS:

```js
//+ run
*!*
if( document.createElement('div').firstElementChild === undefined ) { // (1)
*/!*

*!*
  Object.defineProperty(Element.prototype, 'firstElementChild', { // (2)
*/!*
    get: function () { 
      var el = this.firstChild;
      do {
        if( el.nodeType === 1 ) {
          return el;
        }
        el = el.nextSibling;
      } while(el);

      return null;
    }
  });
}
```

Если этот код запустить, то `firstElementChild` появится у всех элементов в IE8.

Общий вид этого полифилла довольно типичен. Обычно полифилл состоит из двух частей:
<ol>
<li>Проверка, есть ли встроенная возможность.</li>
<li>Эмуляция, если её нет.</li>
</ol>

### Проверка встроенного свойства

Для проверки встроенной поддержки `firstElementChild` создаём элемент и смотрим, есть ли у него это свойство.

**"Фишка" заключается в том, что если бы DOM-свойство поддерживалось, то его значение никогда не было бы `undefined`. Если детей нет  -- свойство было бы `null`.**

Сравните:

```js
//+ run
var div = document.createElement('div');

alert( div.firstChild ); // null, поддержка есть
alert( div.blabla ); // undefined, поддержки нет
```

**Важная тонкость -- элемент, который мы тестируем, должен *по стандарту* поддерживать такое свойство.**

Попытаемся, к примеру, проверить "поддержку" свойства `value`. У `input` оно есть, у `div` такого свойства нет:

```js
//+ run
var div = document.createElement('div');
var input = document.createElement('input');

alert( input.value ); // пустая строка, поддержка есть
alert( div.value );  // undefined, поддержки нет
```

[smart header="Поддержка значений свойств"]
**Если мы хотим проверить поддержку не свойства целиком, а некоторых его значений, то ситуация сложнее.**

Например, нам интересно, поддерживает ли браузер `<input type="range">`. То есть, понятно, что свойство `type` у `input`, в целом, поддерживается, а вот конкретный тип `<input>`?

**Для этого можно присвоить такой атрибут и посмотреть, подействовал ли он.**

Например, сохранился ли он в свойстве:

```js
//+ run
var input = document.createElement("input");
*!*
input.setAttribute("type", "range");
*/!*

var support = (input.type == "range");

alert('Поддержка: ' + support);
```

Эта проверка работает, так как хоть в атрибут `type` и можно присвоить любую строку, но в DOM-свойство `type` [по стандарту](http://www.w3.org/TR/html-markup/input.html) хранит реальный тип `input'а`. Если присвоить неподдерживаемый тип, то свойство `type` не изменится. 

Ниже вы можете увидеть, верно ли сработал код определения поддержки. Если он вывел `true`, то HTML ниже выведет красивый "слайдер", иначе -- текстовое поле.

```html
<!--+ autorun height=40 -->
<input type="range">
```

[/smart]

### Ещё проверки: Modernizr

Существует целый фреймворк [Modernizr](http://modernizr.com/), посвящённый разнообразным проверкам. Использовать его очень просто.

Можно либо скачать сборку, которая проверяет поддержку именно того, что интересно, со страницы [](http://modernizr.com/download/), либо подключить вообще все проверки файлом [](http://modernizr.com/downloads/modernizr.js).

Пример использования:

```html
<!--+ run height="10" -->
<script src="http://modernizr.com/downloads/modernizr.js"></script>

<script>
alert( Modernizr.inputtypes.range ); // есть поддержка input type="range"
</script>
```

### Добавляем поддержку

**Если мы осуществили проверку и видим, что встроенной поддержки нет -- полифилл должен её добавить.**

Для этого вспомним, что DOM элементы описываются соответствующими JS-классами.

Например:
<ul>
<li>`<li>` -- [HTMLLiElement](http://www.w3.org/TR/html5/grouping-content.html#the-li-element) (см. секцию DOM Interface)</li>
<li>`<a>` -- [HTMLAnchorElement](http://www.w3.org/TR/html5/text-level-semantics.html#the-a-element)</li>
<li>`<body>` -- [HTMLBodyElement](http://www.w3.org/TR/html5/sections.html#the-body-element)</li>
</ul>

Они наследуют, как указано в секции DOM Interface по ссылкам выше, от [HTMLElement](http://www.w3.org/TR/html5/dom.html#htmlelement), который является общим родительским классом для HTML-элементов.

А `HTMLElement`, в свою очередь, наследует от [Element](http://www.w3.org/TR/dom/#interface-element), который является общим родителем не только для HTML, но и для других DOM-структур, например для XML и SVG.

**Для добавления нужной возможности берётся правильный класс и модифицируется его `prototype`.**

Самое простое -- это добавить всем элементам в прототип функцию, например:

```js
//+ run
Element.prototype.sayHi = function() {
  alert("Привет от " + this);
}

document.body.sayHi(); // Привет от [object HTMLBodyElement]
```

**Сложнее -- добавить свойство, но это тоже возможно, через `Object.defineProperty`:**

```js
//+ run
Object.defineProperty(Element.prototype, 'lowerTag', { 
  get: function() {
    return this.tagName.toLowerCase();
  }
});

alert( document.body.lowerTag ); // body
```

[warn header="Геттер-сеттер и IE8"]
В IE8 современные методы для работы со свойствами, такие как [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) и другие не поддерживаются для произвольных объектов, но отлично работают для DOM-элементов.

Чем полифиллы и пользуются.
[/warn]

В итоге получается, что если в браузере нет нужного свойства -- оно появляется.
 
Эта техника почти не работает в совсем старых IE6,7. Когда-то для них использовалась особая "IE-магия" при помощи `.htc`-файлов, которые [более не поддерживаются](http://msdn.microsoft.com/en-us/library/ie/hh801216.aspx). 

Если нужно поддерживать и эти версии, то рекомендуется воспользоваться фреймворками. К счастью, для большинства проектов эти браузеры уже стали историей. 

## Итого

<ul>
<li>Для того, чтобы спокойно и без оглядки на старые браузеры использовать современные возможности DOM, используются особые библиотеки, которые называют "полифиллами" (polyfill).</li>
<li>Для поиска полифилла обычно достаточно ввести в поисковике `"polyfill"`, и нужное свойство либо метод. Как правило, полифиллы идут в виде коллекций скриптов.</li>
<li>Полифиллы хороши тем, что мы просто подключаем их и используем везде современный DOM/JS, а когда старые браузеры окончательно отомрут -- просто выкинем полифилл, без изменения кода.</li>
</ul>

Для создания полифилла DOM-свойства или метода:
<ul>
<li>Создаётся элемент, который его, в теории, должен поддерживать.</li>
<li>Соответствующее свойство сравнивается с `undefined`.</li>
<li>Если его нет -- модифицируется прототип, обычно это `Element.prototype` -- в него дописываются новые геттеры и функции.</li>
</ul>

Другие полифиллы сделать сложнее. Например, для добавления поддержки `<input type="range">` полифилл должен искать все такие элементы на странице и обрабатывать их. Возможности такого полифилла ограничены -- если уже существующему `<input>` поменять `type` на `range` -- полифилл не "подхватит" его. 

И это нормальная ситуация, что полифилл не обеспечивает 100% совместимости. Скорее всего, мы не собираемся так делать, а значит -- полифилл вполне подойдёт. 


