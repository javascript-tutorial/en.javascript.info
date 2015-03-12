# Навигация по jQuery-коллекции

Мы умеем перебирать коллекцию, получать нужный элемент по номеру. Достаточно ли этого?

Конечно нет! По коллекции нужно путешествовать. Получать детей, искать родителей, выбирать элементы по условию, и чтобы это было удобно. 
[cut]

## Шпаргалка по методам

Методов для навигации по коллекции много. Их гораздо проще воспринять, если разбить на группы.

Итак, на картинке ниже:
<ul>
<li>По центру -- действия с текущей коллекцией: фильтрация, добавление, изменение и т.п.</li>
<li>Сверху -- методы для доступа к родителям.</li>
<li>Снизу -- для поиска среди потомков.</li>
<li>Слева/справа -- для поиска соседей.</li>
</ul>

[pre]
<style>
.jqt-td {
  border: 2px solid #F79646;
  text-align: center;
  border-radius: 2px;
}
.jqt-table {
  border-collapse: separate;
  border-spacing: 10px 10px;
}
.jqt-table a {
  color: blue;
  margin: 0 2px;
}
</style>


<table class="jqt-table">
<tr>
<td>&nbsp;</td>
<td class="jqt-td">
<a href="http://api.jquery.com/parent">parent</a>
<a href="http://api.jquery.com/parents">parents</a>
<a href="http://api.jquery.com/parentsUntil">parentsUntil</a><br>
<a href="http://api.jquery.com/closest">closest</a>
</td>
<td>&nbsp;</td>
</tr>
<tr>
<td class="jqt-td">
<a href="http://api.jquery.com/prev">prev</a>
<a href="http://api.jquery.com/prevAll">prevAll</a> 
<a href="http://api.jquery.com/prevUntil">prevUntil</a><br>
<a href="http://api.jquery.com/siblings">siblings</a>
</td>
<td class="jqt-td" style="border-color: red">
<a href="http://api.jquery.com/filter">filter</a> 
<a href="http://api.jquery.com/not">not</a>
<a href="http://api.jquery.com/has">has</a><br>
<a href="http://api.jquery.com/eq">eq</a> 
<a href="http://api.jquery.com/first">first</a>
<a href="http://api.jquery.com/last">last</a>
<a href="http://api.jquery.com/slice">slice</a><br>
<a href="http://api.jquery.com/is">is</a> 
<a href="http://api.jquery.com/add">add</a>
<a href="http://api.jquery.com/add">map</a>
</td>
<td class="jqt-td">
<a href="http://api.jquery.com/next">next</a> 
<a href="http://api.jquery.com/nextAll">nextAll</a> 
<a href="http://api.jquery.com/nextUntil">nextUntil</a><br>
<a href="http://api.jquery.com/siblings">siblings</a>
</td>
</tr>
<tr>
<td>&nbsp;</td>
<td class="jqt-td">
<a href="http://api.jquery.com/find">find</a><br>
<a href="http://api.jquery.com/children">children</a> 
<a href="http://api.jquery.com/contents">contents</a>
</td>
<td>&nbsp;</td>
</tr>
</table>
[/pre]

Так как методов много, то запомнить их все сложно, да и не нужно. Достаточно знать, какие есть, а при необходимости -- обратиться к этой странице или к [официальной документации](http://api.jquery.com/category/traversing/).

У этих методов очень хорошие названия, они станут очевидны, как только мы их рассмотрим чуть подробнее.

## По текущей коллекции

<dl>
<dt><a href="http://api.jquery.com/filter">filter(фильтр)</a>, <a href="http://api.jquery.com/not">not(фильтр)</a>, <a href="http://api.jquery.com/has">has(фильтр)</a></dt>
<dd>Возвращают отфильтрованную коллекцию, содержащую только элементы...
<ul>
<li>для `filter` -- подходящие под фильтр,</li>
<li>для `not` -- не подходящие под фильтр,</li>
<li>для `has` -- содержащие потомка, подходящего под фильтр.</li>
</ul>

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li>...</li>
</ul>

<script>
  var list = $('li');

  // вызовом css('color', ..) поставим цвет элементам:

*!*
  list.filter(':even').css('color', 'blue'); // ФИЛЬТР: чётные 
  list.not(':even').css('color', 'green'); // НЕ чётные
  list.has('em').css('background', 'pink'); // СОДЕРЖАТ em
*/!*
</script>
```

В качестве фильтра может быть использована также функция, принимающая элемент как `this` и возвращающая `true/false`:

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li>...</li>
</ul>

<script>
  var list = $('li');

  // ФИЛЬТР: первый ребёнок - текстовый узел
*!*
  var result = list.filter(function() {
    return this.firstChild.nodeType == 3;
  });
*/!*

  alert( result.length ); // 1, это последний LI
</script>
```

</dd>
<dt><a href="http://api.jquery.com/eq">eq(n)</a>, <a href="http://api.jquery.com/first">first</a>, <a href="http://api.jquery.com/last">last</a>, <a href="http://api.jquery.com/slice">slice(start, end)</a></dt>
<dd>Возвращает новую коллекцию...
<ul>
<li>`eq(n)` -- с одним элементом по его номеру,</li>
<li>`first/last` -- из первого/последнего элемента,</li>
<li>`slice(start[, end])` -- из элементов с номера `start` до `end`.</li>
</ul>
</dd>
<dt><a href="http://api.jquery.com/is">is(фильтр)</a></dt>
<dd>Возвращает `true`, если *какой-нибудь* элемент из коллекции подходит под фильтр.

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li class="other">...</li>
</ul>

<script>
  var list = $('ul').children();

*!*
  alert( list.is('li') ); // true
  alert( list.is('.other') ); // true
  alert( list.is(':hidden') ); // false
*/!*
</script>
```

</dd>
<dt><a href="http://api.jquery.com/add">add(элементы)</a></dd>
<dd>Возвращает новую коллекцию из элементов текущей и новых, по селектору.

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li class="other">...</li>
</ul>

<script>
  var elems = $('ul');

  // можно добавить элемент DOM
  var li = document.getElementsByTagName('li')[0];
*!*
  elems = elems.add(li);
*/!*
  alert( elems.length ); // 2

*!*
  elems = elems.add('.other'); // можно - по селектору
*/!*
  alert( elems.length ); // 3

*!*
  elems = elems.add($('li')); // можно - коллекцию
*/!*
  alert( elems.length ); // 5, дубликаты удаляются
</script>
```

Важно: эта функция не меняет текущую коллекцию, она создаёт новую из существующих и добавленных элементов.

</dd>
<dt><a href="http://api.jquery.com/add">map(функция)</a></dt>
<dd>Этот метод стоит особняком. Он не меняет коллекцию, не ищет в ней, а пропускает её через функцию и возвращает результаты.

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li class="other">...</li>
</ul>

<script>
  $('code')
    .css('color', 'red') // подсветить CODE красным
*!*
    .map(function() {
      return this.parentNode; // получить коллекцию родителей CODE
    })
*/!*
    .css('color', 'green'); // подсветить их зелёным
</script>
```

</dd>
</dl>

Заметим две приятные особенности:
<ul>
<li>Большинство методов, которые осуществляют фильтрацию, могут принимать как селектор так и фильтрующую функцию. jQuery любит функции.</li>
<li>Большинство методов, которые принимают элементы, могут получать их в виде jQuery-коллекции или селектора. Главное, чтобы найти по этому можно было.</li>
</ul>

## По родителям

<dl>
<dt>[parent()](http://api.jquery.com/parent/), [parents(фильтр)](http://api.jquery.com/parents/), [parentsUntil(стоп, фильтр)](http://api.jquery.com/parentsUntil/)</dt>
<dd>Родители -- один `parent`, все `parents(фильтр)` (с фильтром по селектору) и до определённого `parentsUntil(где остановиться, селектор для элементов)`.</dd>
<dt>[closest(фильтр, элемент-контейнер)](http://api.jquery.com/closest/)</dt>
<dd>Ищет одного, ближайшего, родителя, подходящего под селектор.

Второй, необязательный, аргумент `элемент-контейнер`, если он передан, ограничивает поиск. jQuery будет идти вверх до тех пор, пока не встретит этот DOM-элемент.

```html
<!--+ run -->
<script src="http://code.jquery.com/jquery.js"></script>

<ul id="1">
  <li><a href="http://blog.jquery.com">jQuery Blog</a></li>
  <li><a href="http://sizzlejs.com">Sizzle</a></li>
</ul>

<script>
  var link = $('a[href*="blog"]'); // ссылка, атрибут href содержит "blog"

*!*
  var ul = link.closest('ul'); // ближайший сверху UL
*/!*
  alert( ul[0].id ); // 1

*!*
  var li = $('li')[0];
  ul = link.closest('ul', li); // ближайший сверху UL, но внутри LI
*/!*
  alert( ul.length ); // 0, нет таких
</script>
```

</dd>
</dl>

## По потомкам

<dl>
<dt>[find(селектор)](http://api.jquery.com/find/)</dt>
<dd>Ищет в потомках по селектору.

```js
// для каждого LI искать CODE среди потомков, вернуть их коллекцию
$('li').find('code');
```

</dd>
<dt>[children(селектор)](http://api.jquery.com/children/), [contents()](http://api.jquery.com/contents/)</dt>
<dd>Выбирает детей по селектору, без аргументов -- всех детей:

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li class="other">...</li>
</ul>

<script>
  $('li')
*!*
    .children('code') // вернуть всех детей LI, подходящих под селектор code  
*/!*
    .css('color', 'red'); // подсветить
</script>
```

Метод [contents()](http://api.jquery.com/contents/) -- также возвращает детей, но в отличие от `children` -- узлы всех типов, включая текстовые и комментарии, а не только узлы-элементы.

```html
<!--+ jquery run -->
<ul>
  <li><code>filter</code>: <i>только подходящие</i>.</li>
  <li><code>not</code>: <em>не подходящие</em>.</li>
  <li><code>has</code>: <i>по потомкам</i>.</li>
  <li class="other">...</li>
</ul>

<script>
  $('li')
*!*
    .contents() // все узлы-дети LI
*/!*
    .map(function() { // обернуть текстовые узлы в скобки
      if (this.nodeType == 3) this.data = "(" + this.data + ")"
    });
</script>
```

</dd>
</dl>

## По соседям

<dl>
<dt><a href="http://api.jquery.com/prev">prev()</a>, <a href="http://api.jquery.com/prevAll">prevAll(фильтр)</a>, <a href="http://api.jquery.com/prevUntil">prevUntil(элемент, фильтр)</a></dt>
<dd>Получить левого соседа `prev`, всех левых соседей `prevAll` или всех левых соседей `prevUntil` до указанного (`элемент`), подходящих под фильтр.</dd>
<dt><a href="http://api.jquery.com/next">next()</a>, <a href="http://api.jquery.com/nextAll">nextAll(фильтр)</a>, <a href="http://api.jquery.com/nextUntil">nextUntil(элемент, фильтр)</a></dt>
<dd>То же самое, но правые соседи.</dd>
<dt><a href="http://api.jquery.com/siblings">siblings()</a></dt>
<dd>Получить коллекцию всех соседей.</dd>
</dl>


## Стек селекторов: методы end и addBack

Все методы не влияют на текущую коллекцию, они создают и возвращают новую.

При каждом новом поиске возвращается jQuery-объект с результатом.

**Предыдущий jQuery-объект при этом не теряется, к нему всегда можно вернуться вызовом [end()](http://api.jquery.com/end/).**

Посмотрим это на примере задачи. Допустим, мы нашли форму `$('form')` и хотим выбрать все чекбоксы в ней.

Можно сделать это так:

```js
//+ no-beautify
$('form')
  .find(':checkbox')
  .each(function() { ... }); // сделать что-то с элементами коллекции
```

...И теперь хотим поискать в этой же форме что-то ещё. 

Самый очевидный способ это сделать -- сохранить `$('form')` в переменной:

```js
//+ no-beautify
var form = $('form');

form
  .find(':checkbox')
  .each(function() { ... });

form
  .find(':radio')
  .each(function() { ... });
```

...Но на самом деле в этом нет необходимости.

jQuery, при вызове `find` сохраняет предыдущую найденную коллекцию, к которой можно вернуться вызовом `end()`:

```js
//+ no-beautify
$('form')
  .find(':checkbox') // нашли чекбоксы внутри
  .each(function() { ... }) // обработали
*!*
  .end() // вернулись обратно на форму
*/!*
  .find(':radio') // поискали другие элементы внутри..
  .each(function() { ... }); // сделали с ними что-то ещё
```

**Метод [addBack(selector)](http://api.jquery.com/addBack/) добавляет элементы из предыдущей коллекции к текущей.**
 
Если указать селектор, то он отфильтрует их.

Этот метод бывает очень удобен, когда какую-то операцию нужно сделать как с детьми, так и с самим элементом, например:

```js
//+ no-beautify
$('ul')       // коллекция: UL
  .children() // получить коллекцию LI
  .addBack()  // добавить к ней сам UL
  .each(...)   // теперь у нас коллекция LI и UL-родитель
```

Полный список методов вы найдёте в [разделе Traversing](http://api.jquery.com/category/traversing/) документации. При использовании jQuery, вы часто будете иметь с ними дело и отлично запомните.

## Неэффективность jQuery

Для ряда задач jQuery-методы поиска по коллекции неэффективны.

Например, нужно найти первого потомка. Некоторые способы:

```js
elem.children(':first');
elem.children().first();
$(':first-child', elem);
```

Все эти способы неэффективны. Особенно первые два.

<ol>
<li>Первый проходит всех детей, по псевдо-фильтру выбирая нужного.</li>
<li>Второй копирует детей в коллекцию, а потом получает из неё первый элемент.</li>
<li>Третий запускает `querySelectorAll(':first-child)` (на самом деле там чуть сложнее, но не суть важно) в контексте `elem`. Здесь, с первого взгляда, нет копирования всех детей, но внутренний алгоритм браузера для выполнения `querySelectorAll` всё равно работает полным перебором. Впрочем, это будет намного быстрее, чем предыдущие решения.</li>
</ol>

Обычный же вызов `elem[0].children[0]` на порядки обгонит все вышеприведённые способы, особенно если детей много.

Какой вывод из этого?

**Там, где потеря в производительности некритична, используем jQuery -- для удобства. Это большинство случаев. Там, где она важна -- обращаемся к обычному DOM.**









