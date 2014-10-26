# Методы для работы с DOM [в работе]

jQuery-коллекции предоставляют полный набор методов для DOM-манипуляций. И кое-что сверху...

[cut]

## Классы и стили

<ul>
<li>addClass, hasClass, removeClass</li>
</ul>

attr
prop
css

Таблица методов:



<dl>
<dt>.append(parent)</dt>
<dd>Вставить последним потомком `parent`</dd>
<dt>.prepend(parent)</dt>
<dd>Вставить первым потомком `parent`</dd>
<dt>.insertAfter(sibling)</dt>
<dd>Вставить сразу после элемента `sibling`</dd>
<dt>.insertBefore(sibling)</dt>
<dd>Вставить сразу перед элементом `sibling`</dd>
<dt>.remove()</dt>
<dd>Удалить элемент из DOM, удалить связанные с ним данные и обработчики событий.</dd>
<dt>.detach()</dt>
<dd>Удалить элемент из DOM, не удаляя связанные с ним данные и обработчики.</dd>
<dt>.empty()</dt>
<dd>Удалить всех потомков вызовом remove</dd>

</dl>

Зеркальные методы:
<ul>
<li>append -> appendTo</li>
<li>prepend -> prependTo</li>
<li>insertAfter -> after</li>
<li>insertBefore -> before</li>

