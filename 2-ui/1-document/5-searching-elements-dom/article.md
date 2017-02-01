# Searching: getElement*, querySelector* and others

DOM navigation properties are great when elements are close to each other. What if they are not? How to get an arbitrary element of the page?

There are additional searching methods for that.
[cut]

## document.getElementById or just id

If an element has the `id` attribute, then there's a global variable by the name from that `id`.

We can use it to access the element, like this:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  alert(elem); // DOM-element with id="elem"
  alert(window.elem); // accessing global variable like this also works

  // for elem-content the name has dash inside, so the "simple" variable access won't work
  alert(window['elem-content']); // but still possible to access with [...]
</script>
```

The behavior is described [in the specification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), but it is supported mainly for compatibility, because relies on global variables. The browser tries to help us by mixing namespaces of JS and DOM, but there may be conflicts.

The better alternative is to use a special method `document.getElementById(id)`.

For instance:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  let elem = document.getElementById('elem');

  elem.style.background = 'red';
</script>
```

```smart header="There must be only one"
By the specification the value of `id` must be unique. There may be only one element in the document with the given `id`.

If there are multiple elements with the same `id`, then the behavior is unpredictable. The browser may return any of them at random. So please stick to the rule and keep `id` unique.
```

I will often use `id` to directly reference an element in examples, but that's only to keep things short. In real life `document.getElementById` is definitely the preferred method.

## getElementsBy*

There are also other methods of this kind:

`elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` can also be `*` for any.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Unlike `getElementById` that can be called only on `document`, this method can look inside any element.

Let's find all `input` inside the table:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is only absent in `getElementById`, because we look for a single element. But `getElementsByTagName` returns a collection.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write like:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because we take a *collection* of inputs and assign the value to it, rather to elements inside it.

We should either iterate over the collection or get an element by the number, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Other methods:

- `document.getElementsByName(name)` returns elements with the given `name` attribute. Rarely used.
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class. Elements may have other classes too.

For instance:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  let articles = form.getElementsByClassName('article');
  alert( articles.length ); // 2, will find both elements with class "article"
</script>
```

## querySelectorAll [#querySelectorAll]

Now the heavy artillery.

The call to `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector. That's the most often used and powerful method.

Here we look for all `<li>` elements that are last children:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

```smart header="Can use pseudo-classes as well"
Pseudo-classes in the CSS selector like `:hover` and `:active` are also supported. For instance, `document.querySelectorAll(':hover')` will return the collection with elements that the pointer is  over now (in nesting order: from the outmost `<html>` to the most nested one).
```

## querySelector [#querySelector]

The call to `elem.querySelector(css)` returns the first element for the given CSS selector.

In other words, the result is the same as `elem.querySelectorAll(css)[0]`, but that's looking for *all* elements and picking the first, much slower than only looking for the first one.

## matches

Previous methods were searching the DOM.

The [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` fits the CSS-selector. It returns `true` or `false`.

The method comes handy when we are walking over elements (like in array or something) and trying to filter those that interest us.

For instance:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

The method `elem.closest(css)` looks the nearest ancestor (parent or his parent and so on) that matches the CSS-selector. The `elem` itself is also included in the search.

In other words, the method `closest` goes up from the element and checks each of them. If it matches, then stops the search and returns it.

For instance:

```html run
<ul>
  <li class="chapter">Chapter I
    <ul>
      <li class="subchapter">Chapter <span class="num">1.1</span></li>
      <li class="subchapter">Chapter <span class="num">1.2</span></li>
    </ul>
  </li>
</ul>

<script>
  let numSpan = document.querySelector('.num');

  // nearest li
  alert(numSpan.closest('li').className) // subchapter

  // nearest chapter
  alert(numSpan.closest('.chapter').className) // chapter

  // nearest span
  // (the numSpan is the span itself, so it's the result)
  alert(numSpan.closest('span') === numSpan) // true
</script>
```

## XPath в современных браузерах

Для полноты картины рассмотрим ещё один способ поиска, который обычно используется в XML. Это <a href="http://www.w3.org/TR/xpath/">язык запросов XPath</a>.

Он очень мощный, во многом мощнее CSS, но сложнее. Например, запрос для поиска элементов `H2`, содержащих текст `"XPath"`, будет выглядеть так: `//h2[contains(., "XPath")]`.

Все современные браузеры, кроме IE, поддерживают XPath с синтаксисом, близким к [описанному в MDN](https://developer.mozilla.org/en/XPath).

Найдем заголовки с текстом `XPath` в текущем документе:

```js run no-beautify
var result = document.evaluate("//h2[contains(., 'XPath')]", document.documentElement, null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
  alert( result.snapshotItem(i).outerHTML );
}
```

IE тоже поддерживает XPath, но эта поддержка не соответствует стандарту и работает только для XML-документов, например, полученных с помощью `XMLHTTPRequest` (AJAX).  Для обычных же HTML-документов XPath в IE не поддерживается.

Так как XPath сложнее и длиннее CSS, то используют его очень редко.

## Итого

Есть 6 основных методов поиска элементов DOM:
<table>
<thead>
<tr>
<td>Метод</td>
<td>Ищет по...</td>
<td>Ищет внутри элемента?</td>
<td>Поддержка</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>везде</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>везде</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>тег или <code>'*'</code></td>
<td>✔</td>
<td>везде</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>классу</td>
<td>✔</td>
<td>кроме IE8-</td>
</tr>
<tr>
<td><code>querySelector</code></td>
<td>CSS-селектор</td>
<td>✔</td>
<td>везде</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-селектор</td>
<td>✔</td>
<td>везде</td>
</tr>
</tbody>
</table>

Практика показывает, что в 95% ситуаций достаточно `querySelector/querySelectorAll`. Хотя более специализированные методы `getElement*` работают чуть быстрее, но разница в миллисекунду-другую редко играет роль.

Кроме того:

- Есть метод `elem.matches(css)`, который проверяет, удовлетворяет ли элемент CSS-селектору. Он поддерживается большинством браузеров в префиксной форме (`ms`, `moz`, `webkit`).
- Метод `elem.closest(css)` ищет ближайший элемент выше по иерархии DOM, подходящий под CSS-селектор css. Сам элемент тоже включается в поиск.
- Язык запросов XPath поддерживается большинством браузеров, кроме IE, даже 9-й версии, но `querySelector` удобнее. Поэтому XPath используется редко.
