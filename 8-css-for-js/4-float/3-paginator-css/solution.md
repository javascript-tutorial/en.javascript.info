HTML-структура:

```html
<div class="nav">
  <img src="arrow-left.jpg" class="left" width="40" height="40">
  <img src="arrow-right.jpg" class="right" width="40" height="40">
  <ul class="pages">
    <li>...</li>
  </ul>
</div>
```

Стили:

```css
.nav {
  height: 40px;
  width: 80%;
  margin: auto;
}

.nav .left {
  float: left;
  cursor: pointer;
}

.nav .right {
  float: right;
  cursor: pointer;
}

.nav .pages {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
}

.nav .pages li {
  display: inline;
  margin: 0 3px;
  line-height: 40px;
  cursor: pointer;
}
```

Основные моменты:
<ul>
<li>**Сначала идёт левая кнопка, затем правая, а лишь затем -- текст.** 
Почему так, а не лево - центр - право?

Дело в том, что `float` смещает элемент вправо относительно обычного места. А какое обычное место будет у правого `IMG` без `float`? 

Оно будет под списком, так как список -- блочный элемент, а `IMG` -- инлайн-элемент. При добавлении `float:right` элемент `IMG` сдвинется вправо, оставшись под списком.

Код в порядке лево-центр-право (неправильный):

```html
<!--+ no-beautify -->
<div...>
  <img src="arrow-left.jpg" class="left" width="40" height="40">
  <ul class="pages"> (li) 1 2 3 4 5 6 7 8 9</ul>
  <img src="arrow-right.jpg" class="right" width="40" height="40">
</div>
```

Его демо:
[iframe src="nav-div-wrong" border=1 height="140"]
Правильный порядок: лево-право-центр, тогда `float` останется на верхней строке.

Код, который даёт правильное отображение:

```html
<div ...>
  <img src="arrow-left.jpg" class="left" width="40" height="40">
  <img src="arrow-right.jpg" class="right" width="40" height="40">
  <ul class="pages"> .. список .. </ul>
</div>
```

Также можно расположить стрелки при помощи `position: absolute`. Тогда, чтобы текст при уменьшении размеров окна не налез на стрелки -- нужно добавить в контейнер левый и правый `padding`:

Выглядеть будет примерно так:

```html
<div style="position:relative; padding: 0 40px;">
  <img style="position:absolute;left:0" src="..left.." width="40" height="40">
  <ul> (li) 1 2 3 4 5 6 7 8 9 </ul>
  <img style="position:absolute;right:0" srr="..right.." width="40" height="40">
</div>
```

</li>

<li>**Центрирование одной строки по вертикали осуществляется указанием `line-height`, равной высоте.**

Это красиво лишь для одной строки: если окно становится слишком узким, и строка вдруг разбивается на две -- получается некрасиво, хотя и читаемо. 

Если хочется сделать красивее для двух строк, то можно использовать другой способ центрирования.</li>
</ul>

