# Особые ссылки для таблиц 

У конкретных элементов DOM могут быть свои дополнительные ссылки для большего удобства навигации.

В этой главе мы рассмотрим таблицу, так как это важный частный случай и просто для примера. Также дополнительные ссылки есть у форм, но работу с ними лучше осваивать отдельно.
[cut]

В списке ниже выделены наиболее полезные:

<dl>
<dt>`TABLE`</dt>
<dd>
<ul>
<li>**`table.rows`** -- список строк `TR` таблицы.</li>
<li>`table.caption/tHead/tFoot` -- ссылки на элементы таблицы `CAPTION`, `THEAD`, `TFOOT`.</li>
<li>`table.tBodies` -- список элементов таблицы `TBODY`, по спецификации их может быть несколько.</li>
</ul></dd>
<dt>`THEAD/TFOOT/TBODY`</dt>
<dd>
<ul>
<li>`tbody.rows` -- список строк `TR` секции.</li>
</ul></dd>
<dt>`TR`</dt>
<dd>
<ul>
<li>**`tr.cells`** -- список ячеек `TD/TH`</li>
<li>**`tr.sectionRowIndex`** -- номер строки в текущей секции `THEAD/TBODY`</li>
<li>`tr.rowIndex` -- номер строки в таблице</li>
</ul>
</dd>
<dt>`TD/TH`</dt>
<dd>
<ul>
<li>**`td.cellIndex`** -- номер ячейки в строке</li>
</ul>
</dd>
</dl>

Пример использования:

```html
<!--+ run height=100 -->
<table>
  <tr> <td>один</td> <td>два</td>    </tr>
  <tr> <td>три</td>  <td>четыре</td> </tr>
</table>

<script>
var table = document.body.children[0];

alert( table.*!*rows[0].cells[0]*/!*.innerHTML ) // "один"
</script>
```

Спецификация: [HTML5: tabular data](http://www.w3.org/TR/html5/tabular-data.html).

Даже если эти свойства не нужны вам прямо сейчас, имейте их в виду на будущее, когда понадобится пройтись по таблице.

