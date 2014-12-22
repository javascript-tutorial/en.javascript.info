# Центрирование горизонтальное и вертикальное

В CSS есть всего несколько техник центрирования элементов. Если их знать, то большинство задач решаются просто.
[cut]
## Горизонтальное

### text-align

Для центрирования инлайновых элементов -- достаточно поставить родителю `text-align: center`.:

```html
<!--+ autorun height=50 -->
<style>
  .outer {
    *!*text-align: center;*/!*
    border: 1px solid blue;
  }
</style>

<div class="outer">Текст</div>
```

Для центрирования блока это уже не подойдёт, свойство просто не подействует. Например:

```html
<!--+ autorun height=50 -->
<style>
  .outer {
    *!*text-align: center;*/!*
    border: 1px solid blue;
  }
  .inner {
    width: 100px;
    border: 1px solid red;
  }
</style>

<div class="outer">
  <div class="inner">Текст</div>
</div>
```

Впрочем, в примере выше блок будет центрирован в IE6,7 (это отклонение от стандарта).

### margin: auto

Для всех браузеров, кроме IE6,7, блок по горизонтали центрируется `margin: auto`.:

```html
<!--+ autorun height=50 -->
<style>
  .outer {
    *!*text-align: center;*/!* /* Для IE<8 */
    border: 1px solid blue;
  }
  .inner {
    width: 100px;
    border: 1px solid red;
    *!*margin: auto;*/!* /* Для IE8+ и других браузеров */
  }
</style>

<div class="outer">
  <div class="inner">Текст</div>
</div>
```

В отличие от `width/height`, значение `auto` для `margin` само не появляется. Обычно `margin` равно конкретной величине для элемента, например `0` для `DIV`. Нужно поставить его явно.

Значение `margin-left:auto/margin-right:auto` заставляет браузер выделять под `margin` всё доступное сбоку пространство. А если и то и другое `auto`, то слева и справа будет одинаковый отступ, таким образом элемент окажется в середине. Детали вычислений описаны в разделе спецификации [Calculating widths and margins](http://www.w3.org/TR/CSS21/visudet.html#Computing_widths_and_margins).

## Вертикальное 

Для горизонтального центрирования всё просто. Вертикальное же изначальное не было предусмотрено в спецификации  CSS и по сей день вызывает ряд проблем. 

Есть три основных решения.

### position:absolute + margin

Центрируемый элемент позиционируем абсолютно и опускаем до середины по вертикали при помощи `top:50%`:

```html
<!--+ autorun height=100 -->
<style>
  .outer {
    position: relative;
    height: 5em;
    border: 1px solid blue;
  }

  .inner {
*!*
    position: absolute;
    top: 50%;
*/!*
    border: 1px solid red;
  }
</style>

<div class="outer">
  <div class="inner">Текст</div>
</div>
```

Это, конечно, не совсем центр. По центру находится верхняя граница. Нужно ещё приподнять элемент на половину своей высоты.

**Высота центрируемого элемента должна быть известна.** Родитель может иметь любую высоту.

Если мы знаем, что это ровно одна строка, то её высота равна `line-height`. 

**Приподнимем элемент на пол-высоты при помощи `margin-top`:**

```html
<!--+ autorun height=100 -->
<style>
  .outer {
    position: relative;
    height: 5em;
    border: 1px solid blue;
  }

  .inner {
    position: absolute;
    top: 50%;
*!*
    margin-top: -0.625em;
*/!*
    border: 1px solid red;
  }
</style>

<div class="outer">
  <div class="inner">Текст</div>
</div>
```

[smart header="Почему -0.625em?"]
При стандартных настройках браузера высота строки `line-height: 1.25`, если поделить на два `1.25em / 2 = 0.625em`.

Конечно, высота может быть и другой, главное чтобы мы её знали заранее.
[/smart]

Можно аналогично центрировать и по горизонтали, если известен горизонтальный размер, при помощи `left:50%` и отрицательного `margin-left`.

### Одна строка: line-height

Вертикально отцентрировать одну строку в элементе с известной высотой `height` можно, указав эту высоту в свойстве `line-height`:

```html
<!--+ autorun height=100 -->
<style>
  .outer {
    height: 5em;
*!*
    line-height: 5em;
*/!*
    border: 1px solid blue;
  }
</style>

<div class="outer">
  <span style="border:1px solid red">Текст</span>
</div>
```

Это работает, но лишь до тех пор, пока строка одна, а если содержимое вдруг переносится на другую строку, то начинает выглядеть довольно уродливо. 

### Таблица с vertical-align

У свойства [vertical-align](http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align), которое управляет вертикальным расположением элемента, есть два режима работы.

**В таблицах свойство `vertical-align` указывает расположение *содержимого* ячейки.**

Его возможные значения:
<dl>
<dt>`baseline`</dt>
<dd>Значение по умолчанию.</dd>
<dt>`middle`, `top`, `bottom`</dt>
<dd>Располагать содержимое посередине, вверху, внизу ячейки.</dd>
</dl>

Например, ниже есть таблица со всеми 3-мя значениями:

```html
<!--+ autorun height=130 -->
<style>
  table {  border-collapse: collapse; }
  td {    
    border: 1px solid blue;
    height: 100px;
  }
</style>

<table>
<tr>
*!*
  <td style="vertical-align: top">top</td>
  <td style="vertical-align: middle">middle</td>
  <td style="vertical-align: bottom">bottom</td>
*/!*
</tr>
</table>
```

Обратим внимание, что в ячейке с `vertical-align: middle` содержимое находится по центру. Таким образом, можно обернуть нужный элемент в таблицу размера `width:100%;height:100%` с одной ячейкой, у которой указать `vertical-align:middle`, и он будет отцентрирован.

Но мы рассмотрим более красивый способ, который поддерживается во всех современных браузерах, и в IE8+. В них не обязательно делать таблицу, так как доступно значение `display:table-cell`. Для элемента с таким `display` используются те же алгоритмы вычисления ширины и центрирования, что и в `TD`. И, в том числе, работает `vertical-align`:

Пример центрирования:

```html
<!--+ autorun height=130 -->
<div style="*!*display: table-cell; vertical-align: middle; */!* height: 100px; border: 1px solid red">
  <button>Кнопка<br>с любой высотой<br>и шириной</button>
</div>
```

**Этот способ замечателен тем, что он не требует знания высоты элементов.**

Однако у него есть особенность. Вместе с `vertical-align` родительский блок получает табличный алгоритм вычисления ширины и начинает подстраиваться под содержимое. Это не всегда желательно.

Чтобы его растянуть, нужно указать `width` явно, например: `300px`:

```html
<!--+ autorun height=130 -->
<div style="display: table-cell; vertical-align: middle; height: 100px; *!*width: 300px*/!*; border: 1px solid red">
  <button>Кнопка<br>с любой высотой<br>и шириной</button>
</div>
```

Можно и в процентах, но в примере выше они не сработают, потому что структура таблицы "сломана" -- ячейка есть, а собственно таблицы-то нет.

Это можно починить, завернув "псевдоячейку" в элемент с `display:table`, которому и поставим ширину:

```html
<!--+ autorun height=130 -->
<div style="*!*display: table; width: 100%*/!*">
<div style="display: table-cell; vertical-align: middle; height: 100px; border: 1px solid blue">
  <button>Кнопка<br>с любой высотой<br>и шириной</button>
</div>
</div>
```

Если дополнительно нужно горизонтальное центрирование -- оно обеспечивается другими средствами, например `margin: 0 auto` для блочных элементов или `text-align:center` на родителе -- для других. 

### Центрирование в строке с vertical-align

Для инлайновых элементов (`display:inline/inline-block`), включая картинки, свойство `vertical-align` центрирует *сам инлайн-элемент в окружающем его тексте*.

В этом случае набор значений несколько другой:
[iframe src="vertical-align" height="300" link edit border="1"]

Это можно использовать и для центрирования, если высота родителя известна, а центрируемого элемента -- нет.

Допустим, высота внешнего элемента `120px`. Укажем её в свойстве `line-height`:

```html
<!--+ autorun height=150 -->
<style>
  .outer {
    line-height: 120px;
  }
  .inner {
    display: inline-block; /* центрировать..*/
    vertical-align: middle;  /* ..по вертикали */
    line-height: 1.25; /* переопределить высоту строки на обычную */
    border: 1px solid red;
  }
</style>
<div class="outer" style="height: 120px;border: 1px solid blue">
  <span class="inner">Центрирован<br>вертикально</span>
</div>
```

Работает во всех браузерах и IE8+.

Свойство `line-height` наследуется, поэтому надо знать "правильную" высоту строки и переопределять её для `inner`.

### Центрирование с vertical-align без таблиц

Если центрирование должно работать для любой высоты родителя и центрируемого элемента, то обычно используют таблицы или `display:table-cell` с `vertical-align`.

Если центрируются не-блочные элементы, например `inline` или `inline-block`, то `vertical-align` может решить задачу без всяких таблиц. Правда, понадобится вспомогательный элемент (можно через `:before`).

Пример:

```html
<!--+ autorun -->
<style>
.before {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.inner {
  display: inline-block;
  vertical-align: middle;
}
</style>

<div class="outer" style="height:100px;border:1px solid blue">
  <span class="before"></span>
  <span class="inner" style="border:1px solid red">
    Центрированный<br>Элемент
  </span>
</div>
```

<ul>
<li>Перед центрируемым элементом помещается вспомогательный инлайн-блок `before`, занимающий всю возможную высоту.</li>
<li>Центрируемый блок выровнен по его середине.</li>
</ul>

Для всех современных браузеров и IE8 можно добавить вспомогательный элемент через `:before`:

```html
<!--+ autorun -->
<style>
*!*.outer:before*/!* {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.inner {
  display: inline-block;
  vertical-align: middle;
}

/* добавим горизонтальное центрирование */
.outer {
  text-align: center;
}
</style>

<div class="outer" style="height:100px; width: 100%; border:1px solid black">
  <span class="inner" style="border:1px solid red">
    Центрированный<br>Элемент
  </span>
</div>
```

В пример выше добавлено также горизонтальное центрирование `text-align: center`. Но вы можете видеть, что на самом деле внутренний элемент не центрирован горизонтально, он немного сдвинут вправо.

Это происходит потому, что центрируется *весь текст*, а перед `inner` находится пробел, который занимает место.

Варианта два:
<ol>
<li>Убрать лишний пробел между `div` и началом `inner`, будет `<div class="outer"><span class="inner">...`.</li>
<li>Оставить пробел, но сделать отрицательный `margin-left` у `inner`, равный размеру пробела, чтобы `inner` сместился левее.</li>
</ol>

Второе решение:

```html
<!--+ autorun -->
<style>
.outer:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.inner {
  display: inline-block;
  vertical-align: middle;
*!*
  margin-left: -0.35em;
*/!*
}

.outer {
  text-align: center;
}
</style>

<div class="outer" style="height:100px; width: 100%; border:1px solid black">
  <span class="inner" style="border:1px solid red">
    Центрированный<br>Элемент
  </span>
</div>
```

## Итого

Обобщим решения, которые обсуждались в этой статье.

Для горизонтального центрирования:
<ul>
<li>`text-align: center` -- центрирует инлайн-элементы в блоке. В IE<8 центрирует всё, но это нестандартное поведение.</li>
<li>`margin: 0 auto` -- центрирует блок внутри родителя. У блока должна быть указана ширина.</li>
</ul>

Для вертикального центрирования одного блока внутри другого:

<dl>
<dt>Если размер центрируемого элемента известен, а родителя - нет</dt>
<dd>Родителю `position:relative`, потомку `position:absolute; top:50%` и `margin-top:-<половина-высоты-потомка>`. Аналогично можно отцентрировать и по горизонтали.</dd>
<dt>Если нужно отцентрировать одну строку в блоке, высота которого известна</dt>
<dd>Поставить блоку `line-height: <высота>`. Нужны конкретные единицы высоты (`px`,`em`...). Значение `line-height:100%` не будет работать, т.к. проценты берутся не от высоты блока, а от текущей `line-height`.</dd>
<dt>Высота родителя известна, а центрируемого элемента - нет.</dt>
<dd>Поставить `line-height` родителю во всю его высоту, а потомку поставить `display:inline-block`.</dd>
<dt>Высота обоих элементов неизвестна.</dt>
<dd>Два варианта:
<ol>
<li>Сделать элемент-родитель ячейкой таблицы при помощи `display:table-cell`(IE8) или реальной таблицы, и поставить ему `vertical-align:middle`. Отлично работает, но мы имеем дело с таблицей вместо обычного блока.</li>
<li>Решение с вспомогательным элементом `outer:before` и инлайн-блоками. Вполне универсально и не создаёт таблицу.</li>
</ol>
</dd>
</dl>


