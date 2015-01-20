# Методы contains и compareDocumentPosition

Если есть два элемента, то иногда бывает нужно понять, находится ли один в другом, и произвести обработку в зависимости от результата.

Обычные поисковые методы здесь не дают ответа, но есть два специальных. Они используются редко, но когда подобная задача встаёт, то знание метода может сэкономить много строк кода.

[cut]

## Метод contains

Синтаксис:

```js
var result = parent.contains(child);
```

Возвращает `true`, если `parent` содержит `child` или `parent == child`.

## Метод compareDocumentPosition

Бывает, что у нас есть два элемента, к примеру, `<li>` в списке, и нужно понять, какой из них выше другого.

Это поможет сделать другой метод.

Синтаксис:

```js
var result = nodeA.compareDocumentPosition(nodeB);
```

Возвращаемое значение -- битовая маска (см. [](/bitwise-operators)), биты в которой означают следующее:

<table>
<tr>
<th>Биты</th>
<th>Число</th>
<th>Значение</th>
</tr>
<tr><td>000000</td><td>0</td><td>`nodeA` и `nodeB` -- один и тот же узел</td></tr>
<tr><td>000001</td><td>1</td><td>Узлы в разных документах (или один из них не в документе)</td></tr>
<tr><td>000010</td><td>2</td><td>`nodeB` предшествует `nodeA` (в порядке обхода документа)</td></tr>
<tr><td>000100</td><td>4</td><td>`nodeA` предшествует `nodeB`</td></tr>
<tr><td>001000</td><td>8</td><td>`nodeB` содержит `nodeA`</td></tr>
<tr><td>010000</td><td>16</td><td>`nodeA` содержит `nodeB`</td></tr>
<tr><td>100000</td><td>32</td><td>Зарезервировано для браузера</td></tr>
</table>

Понятие "предшествует" -- означает не только "предыдущий сосед при общем родителе", но и имеет более общий смысл:  "раньше встречается в порядке [прямого обхода](http://algolist.manual.ru/ds/walk.php) дерева документа.

Могут быть и сочетания битов. Примеры реальных значений:

```html
<!--+ run -->
<p>...</p>
<ul>
  <li>1.1</li>
</ul>
<p>...</p>

<script>
var ul = document.getElementsByTagName('ul')[0];

// 1. соседи
alert( ul.compareDocumentPosition( ul.previousSibling ) ); // 2 = 10
alert( ul.compareDocumentPosition( ul.nextSibling ) );  // 4 = 100

// 2. родитель/потомок
alert( ul.compareDocumentPosition( ul.firstChild ) ); // 20 = 10100
alert( ul.compareDocumentPosition( ul.parentNode ) ); // 10 = 1010

// 3. вообще разные узлы
var li = ul.children[0];
alert( li.compareDocumentPosition( document.body.lastChild ) ); // 4 = 100
</script>
```

Комментарии:
<ol>
<li>Узлы являются соседями, поэтому стоит только бит "предшествования": какой перед каким.</li>
<li>Здесь стоят сразу два бита: `10100` означает, что `ul` одновременно содержит `ul.firstChild` и является его предшественником, то есть при прямом обходе дерева документа сначала встречается `nodeA`, а потом `nodeB`. 
Аналогично, `1010` означает, что `ul.parentNode` содержит `ul` и предшествует ему.</li>
<li>Так как ни один из узлов не является предком друг друга, то стоит только бит предшествования: `li` предшествует последнему узлу документа, никакого сюрприза здесь нет.</li>
</ol> 

[smart header="Перевод в двоичную систему"]
Самый простой способ самостоятельно посмотреть, как число выглядит в 2-ной системе -- вызвать для него `toString(2)`, например:

```js
//+ run
var x = 20;
alert( x.toString(2) ); // "10100"
```

Или так:

```js
//+ run
alert( 20..toString(2) );
```

Здесь после `20` две точки, так как если одна, то JS подумает, что после неё десятичная часть -- будет ошибка.
[/smart]

Проверка условия "`nodeA` содержит `nodeB`" с использованием битовых операций: `nodeA.compareDocumentPosition(nodeB) & 16`, например:

```html
<!--+ run -->
<ul>
  <li>1</li>
</ul>

<script>
var nodeA = document.body;
var nodeB = document.body.children[0].children[0];

*!*
if( nodeA.compareDocumentPosition(nodeB) & 16 ) {
  alert( nodeA +' содержит ' + nodeB );
}
*/!*
</script>
```

Более подробно о битовых масках:  [](/bitwise-operators).

## Поддержка в IE8-

В IE8- поддерживаются свои, нестандартные, метод и свойство:

<dl>
<dt>[nodeA.contains(nodeB)](http://msdn.microsoft.com/en-us/library/ms536377.aspx)</dt>
<dd>Результат: `true`, если `nodeA` содержит `nodeB`, а также в том случае, если `nodeA == nodeB`.</dd>
<dt>[node.sourceIndex](http://msdn.microsoft.com/en-us/library/ms534635.aspx)</dt>
<dd>Номер элемента `node` в порядке прямого обхода дерева. Только для узлов-элементов.</dd>
</dl>

На их основе можно написать кросс-браузерную реализацию `compareDocumentPosition`:

```js
// Адаптировано с http://ejohn.org/blog/comparing-document-position/
function compareDocumentPosition(a, b) {
  return a.compareDocumentPosition ?
    a.compareDocumentPosition(b) :
      (a != b && a.contains(b) && 16) +
        (a != b && b.contains(a) && 8) +
        (a.sourceIndex >= 0 && b.sourceIndex >= 0 ?
          (a.sourceIndex < b.sourceIndex && 4) +
            (a.sourceIndex > b.sourceIndex && 2) :
          1);
}
```

Эта функция будет работать для узлов-элементов во всех браузерах.

## Итого

Для проверки, лежит ли один узел внутри другого, достаточно метода `nodeA.contains(nodeB)`.

Для расширенной проверки на предшествование есть метод `compareDocumentPosition`, кросс-браузерный вариант которого приведён выше.

Пример использования:

```html
<!--+ run -->
<ul>
  <li id="li1">1</li>
  <li id="li2">2</li>
</ul>

<script>
var body = document.body;

*!*
if( compareDocumentPosition(body, li1) & 16 ) {
  alert( 'BODY содержит LI-1' );
}

if( compareDocumentPosition(li1, li2) & 4 ) {
  alert( 'LI-1 предшествует LI-2' );
}
*/!*

function compareDocumentPosition(a, b) {
  return a.compareDocumentPosition ?
    a.compareDocumentPosition(b) :
      (a != b && a.contains(b) && 16) +
        (a != b && b.contains(a) && 8) +
        (a.sourceIndex >= 0 && b.sourceIndex >= 0 ?
          (a.sourceIndex < b.sourceIndex && 4) +
            (a.sourceIndex > b.sourceIndex && 2) :
          1);
}
</script>
```

Список битовых масок для проверки:
<table>
<tr>
<th>Биты</th>
<th>Число</th>
<th>Значение</th>
</tr>
<tr><td>000000</td><td>0</td><td>`nodeA` и `nodeB` -- один и тот же узел</td></tr>
<tr><td>000001</td><td>1</td><td>Узлы в разных документах (или один из них не в документе)</td></tr>
<tr><td>000010</td><td>2</td><td>`nodeB` предшествует `nodeA` (в порядке обхода документа)</td></tr>
<tr><td>000100</td><td>4</td><td>`nodeA` предшествует `nodeB`</td></tr>
<tr><td>001000</td><td>8</td><td>`nodeB` содержит `nodeA`</td></tr>
<tr><td>010000</td><td>16</td><td>`nodeA` содержит `nodeB`</td></tr>
</table>
