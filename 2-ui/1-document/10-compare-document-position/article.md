# Методы contains и compareDocumentPosition

Если есть два элемента, то иногда бывает нужно понять, лежит ли один из них выше другого, то есть является ли его предком.

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

Метод `compareDocumentPosition` -- более мощный, чем `contains`, он предоставляет одновременно информацию и о содержании и об относительном порядке элементов.

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

<script>
var p = document.body.children[0];
var ul = document.body.children[1];
var li = ul.children[0];

// 1. <ul> находится после <p>
alert( ul.compareDocumentPosition( p ) ); // 2 = 10

// 2. <p> находится до <ul>
alert( p.compareDocumentPosition( ul ) );  // 4 = 100

// 3. <ul> родитель <li>
alert( ul.compareDocumentPosition( li ) ); // 20 = 10100

// 4. <ul> потомок <body>
alert( ul.compareDocumentPosition( document.body ) ); // 10 = 1010
</script>
```

Более подробно:
<ol>
<li>Узлы не вложены один в другой, поэтому стоит только бит "предшествования", отсюда `10`.</li>
<li>То же самое, но обратный порядок узлов, поэтому `100`.</li>
<li>Здесь стоят сразу два бита: `10100` означает, что `ul` одновременно содержит `li` и является его предшественником, то есть при прямом обходе дерева документа сначала встречается `ul`, а потом `li`.</li>
<li>Аналогично предыдущему, `1010` означает, что `document.body` содержит `ul` и предшествует ему.</li>
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

Проверить конкретное условие, например, "`nodeA` содержит `nodeB`", можно при помощи битовых операций, в данном случае: `nodeA.compareDocumentPosition(nodeB) & 16`, например:

```html
<!--+ run -->
<ul>
  <li>1</li>
</ul>

<script>
var body = document.body;
var li = document.body.children[0].children[0];

*!*
if( body.compareDocumentPosition(li) & 16 ) {
  alert( body +' содержит ' + li );
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

На их основе можно написать полифилл для `compareDocumentPosition`:

```js
// код с http://compatibility.shwups-cms.ch/en/polyfills/?&id=82
(function(){
  var el = document.documentElement;
  if( !el.compareDocumentPosition && el.sourceIndex !== undefined ){

    Element.prototype.compareDocumentPosition = function(other){
      return (this != other && this.contains(other) && 16) +
                 (this != other && other.contains(this) && 8) +
                 (this.sourceIndex >= 0 && other.sourceIndex >= 0 ?
                   (this.sourceIndex < other.sourceIndex && 4) +
                   (this.sourceIndex > other.sourceIndex && 2) 
                   : 1
                 ) + 0;
    }
  }
}());
```

С этим полифиллом метод доступен для элементов во всех браузерах.

## Итого

<ul>
<li>Для проверки, является ли один узел предком другого, достаточно метода `nodeA.contains(nodeB)`.</li>
<li>Для расширенной проверки на предшествование есть метод `compareDocumentPosition`.</li>
<li>Для IE8 нужен полифилл для `compareDocumentPosition`.</li>
</ul>
