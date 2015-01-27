# Итого: DOM-шпаргалка

В этой статье перечислены основные свойства и методы DOM, которые мы изучили.

Используйте её, чтобы быстро подглядеть то, что изучали ранее.

[cut]

## Создание

<dl>
<dt>`document.createElement(tag)`</dt><dd>создать элемент с тегом `tag`</dd>
<dt>`document.createTextNode(txt)`</dt><dd>создать текстовый узел с текстом `txt`</dd>
<dt>`node.cloneNode(deep)`</dt><dd>клонировать существующий узел, если `deep=false`, то без потомков.</dd>
</dl>

## Свойства узлов

<dl>
<dt>`node.nodeType`</dt><dd>тип узла: 1(элемент) / 3(текст) / другие.</dd>
<dt>`elem.tagName`</dt><dd>тег элемента.</dd>
<dt>`elem.innerHTML`</dt><dd>HTML внутри элемента.</dd>
<dt>`node.data`</dt><dd>содержимое любого узла любого типа, кроме элемента.</dd>
</dl>

## Ссылки

<dl>
<dt>`document.documentElement`</dt>
<dd>элемент `<HTML>`</dd>
<dt>`document.body`</dt>
<dd>элемент `<BODY>`</dd>
</dl>

По всем узлам:
<ul>
<li>`parentNode`</li>
<li>`nextSibling` `previousSibling`</li>
<li>`childNodes` `firstChild` `lastChild`</li>
</ul>

Только по элементам:

<ul>
<li>`children`</li>
<li>`nextElementSibling` `previousElementSibling`</li>
<li>`firstElementChild` `lastElementChild`</li>
</ul>

В IE8- из них работает только `children`, причём содержит не только элементы, но и комментарии (ошибка в браузере).

### Таблицы

<dl>
<dt>`table.rows[N]`</dt>
<dd>строка `TR` номер `N`.</dd>
<dt>`tr.cells[N]`</dt>
<dd>ячейка `TH/TD` номер `N`.</dd>
<dt>`tr.sectionRowIndex`</dt>
<dd>номер строки в таблице в секции `THEAD/TBODY`.<dd>
<dt>`td.cellIndex`</dt>
<dd>номер ячейки в строке.</dd>
</dl>

### Формы

<dl>
<dt>`document.forms[N/name]`</dt>
<dd>форма по номеру/имени.</dd>
<dt>`form.elements[N/name]`</dt>
<dd>элемент формы по номеру/имени</dd>
<dt>`element.form`</dt>
<dd>форма для элемента.</dd>
</dl>

## Поиск


<dl>
<dt>`*.querySelector(css)`</dt>
<dd>По селектору, только первый элемент</dd>
<dt>`*.querySelectorAll(css)`</dt>
<dd>По селектору CSS3, в IE8 по CSS 2.1</dd>
<dt>`document.getElementById(id)`</dt>
<dd>По уникальному `id`</dd>
<dt>`document.getElementsByName(name)`</dt>
<dd>По атрибуту `name`,  в IE<10 работает только для элементов, где `name` предусмотрен стандартом.</dd>
<dt>`*.getElementsByTagName(tag)`</dt>
<dd>По тегу `tag`</dd>
<dt>`*.getElementsByClassName(class)`</dt>
<dd>По классу, IE9+, корректно работает с элементами, у которых несколько классов.</dd>
</dl>

При поддержки IE только версии 8 и выше, можно использовать только `querySelector/querySelectorAll`. 

Для более старых IE нужен либо фреймворк, который сам умеет искать узлы по селектору, наподобие jQuery, либо пользоваться методами `get*`, все из которых, кроме `...ByClassName`, поддерживаются с древних времён.

## Изменение

<ul>
<li>`parent.appendChild(newChild)`</li>
<li>`parent.removeChild(child)`</li>
<li>`parent.insertBefore(newChild, refNode)`</li>
<li>`parent.insertAdjacentHTML("beforeBegin|afterBegin|beforeEnd|afterEnd", html)`</li>
</ul>

## Классы и стили

<dl>
<dt>`elem.className`</dt>
<dd>Атрибут `class`</dt>
<dt>`elem.classList.add(class) remove(class) toggle(class) contains(class)`</dt>
<dd>Управление классами в HTML5, для IE8+ есть [эмуляция](https://github.com/eligrey/classList.js/blob/master/classList.js).</dd>
<dt>`elem.style`</dt>
<dd>Стили в атрибуте `style` элемента</dd>
<dt>`getComputedStyle(elem, "")`</dd>
<dd>Стиль, с учётом всего каскада, вычисленный и применённый (только чтение)</dd>
</dl>

## Размеры и прокрутка элемента

<dl>
<dt>`clientLeft/Top`</dt>
<dd>Ширина левой/верхней рамки `border`</dd>
<dt>`clientWidth/Height`</dt>
<dd>Ширина/высота внутренней части элемента, включая содержимое и `padding`, не включая полосу прокрутки (если есть).</dd>
<dt>`scrollWidth/Height`</dt>
<dd>Ширина/высота внутренней части элемента, с учетом прокрутки.</dd>
<dt>`scrollLeft/Top`</dt>
<dd>Ширина/высота прокрученной области.</dd>
<dt>`offsetWidth/Height`</dt>
<dd>Полный размер элемента: ширина/высота, включая `border`.</dd>
</dl>

## Размеры и прокрутка страницы

<ul>
<li>ширина/высота видимой области: `document.documentElement.clientHeight`</li>
<li>прокрутка(чтение):  ` window.pageYOffset || document.documentElement.scrollTop`</li>
<li>прокрутка(изменение):
<ul>
<li>`window.scrollBy(x,y)`: на x,y относительно текущей позиции.</li>
<li>`window.scrollTo(pageX, pageY)`: на координаты в документе.</li>
<li>`elem.scrollIntoView(true/false)`: прокрутить, чтобы `elem` стал видимым и оказался вверху окна(`true`) или внизу(`false`)</li>
</ul>
</li>
</ul>

## Координаты

<ul>
<li>относительно окна: `elem.getBoundingClientRect()`</li>
<li>относительно документа: `elem.getBoundingClientRect()` + прокрутка страницы</li>
<li>получить элемент по координатам: `document.elementFromPoint(clientX, clientY)`</li>
</ul>

Список намеренно сокращён, чтобы было проще найти то, что нужно.
