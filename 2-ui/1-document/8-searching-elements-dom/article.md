# Поиск: getElement* и querySelector*

Прямая навигация от родителя к потомку удобна, если элементы рядом. А если нет?

Для этого в DOM есть дополнительные методы поиска.
[cut]
## getElementById   

Мы рассматривали этот способ ранее. Он работает, если у DOM-элемента есть атрибут `id`. 

**В тех случаях, когда `id` не уникален, вызов `document.getElementById(id)` может возвратить любой из элементов с данным `id`.**

## getElementsByTagName   

Метод `elem.getElementsByTagName(tag)` ищет все элементы с заданным тегом `tag` внутри элемента `elem` и возвращает их в виде списка.

Регистр тега не имеет значения.

Можно искать и в элементе и в документе:

```js
// получить все div-элементы
var elements = document.getElementsByTagName('div');
```

Найдём все элементы `input` внутри таблицы:

```html
<!--+ run height=50 -->
<table id="age-table">
  <tr>
    <td>Ваш возраст:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> младше 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> от 18 до 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> старше 60
      </label>
    </td>
  </tr>

</table>

<script>

*!*
  var tableElem = document.getElementById('age-table');
  var elements = tableElem.getElementsByTagName('input');
*/!*

  for (var i=0; i<elements.length; i++) {
    var input = elements[i];  
    alert(input.value + ': ' + input.checked);
  }

</script>
```

**Можно получить все элементы, передав звездочку `'*'` вместо тега:**

```js
// получить все элементы документа
var allElems = document.getElementsByTagName('*');
```

Если хочется получить только один элемент -- можно указать индекс сразу же:

```js
var element = document.getElementsByTagName('input')*!*[0]*/!*
```

[warn header="Не забываем про букву `\"s\"`!"]
Одна из самых частых ошибок начинающих (впрочем, иногда и не только) -- это забыть букву `"s", то есть пробовать вызывать метод `getElementByTagName` вместо <code>getElement**s**ByTagName</code>.

Буква `"s"` не нужна там, где элемент только один, то есть в `getElementById`, в остальных методах она обязательна.
[/warn]

[warn header="Возвращается коллекция, а не элемент"]
Другая частая ошибка -- это код вида:

```js
document.getElementsByTagName('input').value = 5;
```

То есть, вместо элемента присваивают значение коллекции. Работать такое не будет.

Коллекцию нужно или перебрать в цикле или получить элемент по номеру и уже ему присваивать `value`, например так:

```js
document.getElementsByTagName('input')[0].value = 5;
```

[/warn]

## getElementsByName   

Вызов `document.getElementsByName(name)` позволяет получить все элементы с данным атрибутом `name`.

Например, все элементы с именем `age`:

```js
var elems = document.getElementsByName('age');
```

До появления стандарта HTML5 этот метод возвращал только те элементы, в которых предусмотрена поддержка атрибута `name`, в частности: `iframe`, `a`, `input` и другими. 

В современных браузерах тег не имеет значения, но старое поведение можно увидеть, попробовав пример ниже в IE10 и до версии 10:

```html
<!--+ run -->
<input name="test">

<div name="test"></div>

<script>
var elems = document.getElementsByName('test');

alert(elems.length); // 2 в современных браузерах, 1 в IE<10
</script>
```

**В IE9- метод не найдёт элементы, для которых в стандарте нет атрибута `name`.**

## getElementsByClassName   

Вызов `elem.getElementsByClassName(className)` возвращает коллекцию элементов с классом `className`. Находит элемент и в том случае, если у него несколько классов, а искомый - один из них.

Поддерживается всеми современными браузерами, кроме IE8-.

Например:

```html
<!--+ run height=50 -->
<div class="article">Статья</div>
<div class="long article">Длинная статья</div>

<script>
var articles = document.getElementsByClassName('article');
alert( articles.length ); // 2, найдёт оба элемента 
</script>
```

Как и `getElementsByTagName`, этот метод может быть вызван и в контексте DOM-элемента и в контексте документа.


## querySelectorAll [#querySelectorAll]

Вызов `elem.querySelectorAll(cssQuery)` возвращает все элементы внутри `elem`, удовлетворяющие CSS-селектору `cssQuery`.

Он работает во всех современных браузерах, включая IE9+. Также работает и в IE8, но с некоторыми ограничениями:
<ol>
<li>IE8 должен быть именно в режиме IE8, а не в режиме совместимости.</li>
<li>В IE8 синтаксис `cssQuery` должен соответствовать не CSS 3, а CSS 2.1. Не так мощно, конечно, но этого хватает для большинства случаев.</li>
</ol>

Следующий запрос получает все элементы `LI`, которые являются последними потомками своих `UL`. Это будет работать и в IE8.

```html
<!--+ run -->
<ul>
  <li>Этот</li>
  <li>тест</li>
</ul>
<ul>
  <li>полностью</li>
  <li>пройден</li>
</ul>
<script>
*!*
  var elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (var i=0; i<elements.length; i++) {
    alert(elements[i].innerHTML ); // "тест", "пройден"
  }
</script>
```

## querySelector [#querySelector]

То же самое, что `elem.querySelectorAll(cssQuery)`, но возвращает только первый элемент.

Фактически, эквивалентен `elem.querySelectorAll(cssQuery)[0]`, но быстрее, так как ищутся не все элементы, а только первый.

## matches

Вызов [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) проверяет, удовлетворяет ли `elem` селектору `css`.

Он возвращает `true` либо `false`. 

Ранее в спецификации он назывался `matchesSelector`, и большинство браузеров поддерживают его под этим старым именем, либо с префиксами.

Например:

```html
<!--+ run -->
<div id="test">
  <a href="http://example.com/file.zip" id="link">...</a>
</div>

<script>
var testElem = document.documentElement;
var matchesSelector = testElem.matches ||
  testElem.matchesSelector ||
  testElem.msMatchesSelector;

*!*
var elem = document.getElementById('link');

// проверим, подходит ли элемент под CSS-селектор?
alert( matchesSelector.call(elem, '#test a[href$="zip"]') ); // true
*/!*
</script>
```

Не поддерживается в IE8-.

## XPath в современных браузерах  

Для поиска в XML-документах существует <a href="http://www.w3.org/TR/xpath/">язык запросов XPath</a>. 

Он очень мощный, во многом мощнее CSS, но сложнее. Например, запрос для поиска элементов `H2`, содержащих текст `"XPath"`, будет выглядеть так: `//h2[contains(., "XPath")]`.

**Все современные браузеры, кроме IE, поддерживают XPath с синтаксисом, близким к [описанному в MDN](https://developer.mozilla.org/en/XPath).**

Найдем заголовки с текстом `XPath` в текущем документе:

```js
//+ run
var result = document.evaluate("//h2[contains(., 'XPath')]", document.documentElement, null,                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<result.snapshotLength; i++) {
    alert(result.snapshotItem(i).outerHTML);
}
```

IE тоже поддерживает XPath, но эта поддержка не соответствует стандарту и работает только для XML-документов, например, полученных с помощью `XMLHTTPRequest` (AJAX).  Для обычных же HTML-документов XPath в IE не поддерживается. 

## Итого

Есть 6 основных методов поиска элементов DOM:
<table>
<tr>
<td>Метод</td>
<td>Ищет по..</td>
<td>Ищет внутри элемента?</td>
<td>Поддержка</td>
<tr>
<td>`getElementById`</td>
<td>`id`</td>
<td>-</td>
<td>везде</td>
</tr>
<tr>
<td>`getElementsByName`</td>
<td>`name`</td>
<td>-</td>
<td>везде</td>
</tr>
<tr>
<td>`getElementsByTagName`</td>
<td>тег или `'*'`</td>
<td>✔</td>
<td>везде</td>
</tr>
<tr>
<td>`getElementsByClassName`</td>
<td>классу</td>
<td>✔</td>
<td>кроме IE8-</td>
</tr>
<tr>
<td>`querySelector`</td>
<td>CSS-селектор</td>
<td>✔</td>
<td>кроме IE7-</td>
</tr>
<tr>
<td>`querySelectorAll`</td>
<td>CSS-селектор</td>
<td>✔</td>
<td>кроме IE7-</td>
</tr>
</table>

Если браузеры IE7- не нужны, то в 95% ситуаций достаточно и одного `querySelector(All)`.

Кроме того:
<ul>
<li>Есть метод `elem.matchesSelector(css)`, который проверяет, удовлетворяет ли элемент CSS-селектору. Он поддерживается большинством браузеров в префиксной форме (`ms`, `moz`, `webkit`).</li>
<li>XPath поддерживается большинством браузеров, кроме IE, даже 9й версии. Кроме того, как правило, `querySelector` удобнее. Поэтому он используется редко. </li>
</ul>






