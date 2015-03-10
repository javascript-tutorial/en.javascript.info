# Итого

В этой главе кратко перечислены основные свойства и методы DOM, которые мы изучили. Их уже довольно много.

Используйте её, чтобы по-быстрому вспомнить и прокрутить в голове то, что изучали ранее. Все ли эти свойства вам знакомы?

Кое-где стоит ограничение на версии IE, но на все свойства можно найти или сделать или найти полифилл, с которым их можно использовать везде.

[cut]

## Создание

<dl>
<dt>`document.createElement(tag)`</dt><dd>Создать элемент с тегом `tag`</dd>
<dt>`document.createTextNode(txt)`</dt><dd>Создать текстовый узел с текстом `txt`</dd>
<dt>`node.cloneNode(deep)`</dt><dd>Клонировать существующий узел, если `deep=false`, то без потомков.</dd>
</dl>

## Свойства узлов

<dl>
<dt>`node.nodeType`</dt><dd>Тип узла: 1(элемент) / 3(текст) / другие.</dd>
<dt>`elem.tagName`</dt><dd>Тег элемента.</dd>
<dt>`elem.innerHTML`</dt><dd>HTML внутри элемента.</dd>
<dt>`elem.outerHTML`</dt><dd>Весь HTML элемента, включая сам тег. На запись использовать с осторожностью, так как не модифицирует элемент, а вставляет новый вместо него.</dd>
<dt>`node.data` / `node.nodeValue`</dt><dd>Содержимое узла любого типа, кроме элемента.</dd>
<dt>`node.textContent`</dt><dd>Текстовое содержимое узла, для элементов содержит текст с вырезанными тегами (IE9+).</dd>
<dt>`elem.hidden`</dt><dd>Если поставить `true`, то элемент будет скрыт (IE10+).</dd>
</dl>

## Атрибуты

<dl>
<dt>`elem.getAttribute(name)`, `elem.hasAttribute(name)`, `elem.setAttribute(name, value)`</dt>
<dd>Чтение атрибута, проверка наличия и запись.</dd>
<dt>`elem.dataset.*`</dt><dd>Значения атрибутов вида `data-*` (IE10+).</dd>
</dl>

## Ссылки

<dl>
<dt>`document.documentElement`</dt>
<dd>Элемент `<HTML>`</dd>
<dt>`document.body`</dt>
<dd>Элемент `<BODY>`</dd>
<dt>`document.head`</dt>
<dd>Элемент `<HEAD>` (IE9+)</dd>
</dl>

По всем узлам:
<ul>
<li>`parentNode`</li>
<li>`nextSibling` `previousSibling`</li>
<li>`childNodes` `firstChild` `lastChild`</li>
</ul>

Только по элементам:

<ul>
<li>`parentElement`</li>
<li>`nextElementSibling` `previousElementSibling`</li>
<li>`children`, `firstElementChild` `lastElementChild`</li>
</ul>

Все они IE9+, кроме `children`, который работает в IE8-, но содержит не только элементы, но и комментарии (ошибка в браузере).

Дополнительно у некоторых типов элементов могут быть и другие ссылки, свойства, коллекции для навигации,
например для таблиц:

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

## Поиск


<dl>
<dt>`*.querySelector(css)`</dt>
<dd>По селектору, только первый элемент</dd>
<dt>`*.querySelectorAll(css)`</dt>
<dd>По селектору CSS3, в IE8 по CSS 2.1</dd>
<dt>`document.getElementById(id)`</dt>
<dd>По уникальному `id`</dd>
<dt>`document.getElementsByName(name)`</dt>
<dd>По атрибуту `name`,  в IE9- работает только для элементов, где `name` предусмотрен стандартом.</dd>
<dt>`*.getElementsByTagName(tag)`</dt>
<dd>По тегу `tag`</dd>
<dt>`*.getElementsByClassName(class)`</dt>
<dd>По классу, IE9+, корректно работает с элементами, у которых несколько классов.</dd>
</dl>

Вообще, обычно можно использовать только `querySelector/querySelectorAll`. Методы `getElement*` работают быстрее (за счёт более оптимальной внутренней реализации), но в 99% случаев это различие очень небольшое и роли не играет.

Дополнительно есть методы:
<dl>
<dt>`elem.matches(css)`</dt>
<dd>Проверяет, подходит ли элемент под CSS-селектор.</dd.
<dt>`elem.closest(css)`</dt>
<dd>Ищет ближайший элемент сверху по иерархии DOM, подходящий под CSS-селектор. Первым проверяется сам `elem`. Этот элемент возвращается.</dd>
<dt>`elemA.contains(elemB)`</dt>
<dd>Возвращает `true`, если `elemA` является предком (содержит) `elemB`.</dd>
<dt>`elemA.compareDocumentPosition(elemB)`</dt>
<dd>Возвращает битовую маску, которая включает в себя отношение вложенности между `elemA` и `elemB`, а также -- какой из элементов появляется в DOM первым.</dd>

</dl>


## Изменение

<ul>
<li>`parent.appendChild(newChild)`</li>
<li>`parent.removeChild(child)`</li>
<li>`parent.insertBefore(newChild, refNode)`</li>
<li>`parent.insertAdjacentHTML("beforeBegin|afterBegin|beforeEnd|afterEnd", html)`</li>
<li>`parent.insertAdjacentElement("beforeBegin|...|afterEnd", text)` (кроме FF)</li>
<li>`parent.insertAdjacentText("beforeBegin|...|afterEnd", text)` (кроме FF)</li>
<li>`document.write(...)`</li>
</ul>

Скорее всего, понадобятся полифиллы для:

<ul>
<li>`node.append(...nodes)`</li>
<li>`node.prepend(...nodes)`</li>
<li>`node.after(...nodes)`,</li>
<li>`node.before(...nodes)`</li>
<li>`node.replaceWith(...nodes)`</li>
</ul>

## Классы и стили

<dl>
<dt>`elem.className`</dt>
<dd>Атрибут `class`</dt>
<dt>`elem.classList.add(class) remove(class) toggle(class) contains(class)`</dt>
<dd>Управление классами, для IE9- есть [эмуляция](https://github.com/eligrey/classList.js/blob/master/classList.js).</dd>
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
