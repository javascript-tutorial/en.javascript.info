# Выберите элементы селектором

[importance 5]

HTML-документ:

```html
<input type="checkbox"> 
<input type="checkbox" checked> 
<input type="text" id="message">

<h3 id="widget-title">Сообщения:</h3>
<ul id="messages">
  <li id="message-1">Сообщение 1</li>
  <li id="message-2">Сообщение 2</li>
  <li id="message-3" data-action="delete">Сообщение 3</li>
  <li id="message-4" data-action="edit do-not-delete">Сообщение 4</li>
  <li id="message-5" data-action="edit delete">Сообщение 5</li>
  <li><a href="#">...</a></li>
</ul>


<a href="http://site.com/list.zip">Ссылка на архив</a>
<a href="http://site.com/list.pdf">..И на PDF</a>
```

Задания:
<ol>
<li>Выбрать `input` типа `checkbox`.</li>
<li>Выбрать `input` типа `checkbox`, НЕ отмеченный.</li>
<li>Найти все элементы с `id=message` или `message-*`.</li>
<li>Найти все элементы с `id=message-*`.</li>
<li>Найти все ссылки с расширением `href="...zip"`.</li>
<li>Найти все элементы с атрибутом `data-action`, содержащим `delete` в списке (через пробел).</li>
<li>Найти все элементы, у которых ЕСТЬ атрибут `data-action`, но он НЕ содержит `delete` в списке (через пробел).</li>
<li>Выбрать все чётные элементы списка `#messages`.</li>
<li>Выбрать один элемент сразу за заголовком `h3#widget-title` на том же уровне вложенности.</li>
<li>Выбрать все ссылки, следующие за заголовком `h3#widget-title` на том же уровне вложенности.</li>
<li>Выбрать ссылку внутри последнего элемента списка `#messages`.</li>
</ol>

[edit src="task"]Исходный документ с вспомогательной функцией `test` для проверки[/edit]