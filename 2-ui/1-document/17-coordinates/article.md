# Координаты в окне

Для того, чтобы поместить один элемент рядом с другим на странице, а также двигать его произвольным образом, к примеру, рядом с указателем мыши -- используются координаты.

Первая координатная система, которую мы посмотрим, начинается в левом-верхнем углу текущей видимой области окна.

Мы будем называть координаты в ней `clientX/clientY`.


## getBoundingClientRect()

Синтаксис:

```js
var coords = elem.getBoundingClientRect();
```

Возвращает координаты элемента, а точнее -- размеры прямоугольника, который охватывает элемент, в виде объекта со свойствами: `top`, `left`, `right` и `bottom`:
<ul>
<li>`top` -- Y-координата верхней границы элемента,</li>
<li>`left` -- X-координата левой границы,</li>
<li>`right` -- X-координата правой границы,</li>
<li>`bottom` -- Y-координата нижней границы.</li>
</ul>

Например:

<img src="transitions-bare.png">

Обратите внимание: страница в этом примере прокручена, её часть осталась сверху. 

**Координаты относительно окна не учитывают прокрутку, они высчитываются от границ текущей видимой области.**

Например, кликните на кнопку, чтобы увидеть её координаты:

<input id="brTest" type="button" value="Показать button.getBoundingClientRect() для этой кнопки" onclick='showRect(this)'/>

<script>
function showRect(elem) {
  var r = elem.getBoundingClientRect()
  alert("{top:"+r.top+", left:"+r.left+", right:"+r.right+", bottom:"+ r.bottom + "}");
}
</script>

Если вы прокрутите эту страницу, то положение кнопки в окне изменится, и её координаты, соответственно, тоже. 

<ul>
<li>Координаты могут быть дробными -- это нормально, так как они возвращаются из внутренних структур браузера.</li>
<li>Координаты могут быть и отрицательными, например если прокрутить страницу так, что часть кнопки будет выходить за верхнуюю границу окна, то её `top`-координата будет меньше нуля.</li>
<li>Некоторые современные браузеры также добавляют к объекту свойства для ширины и высоты: `width/height`, но их можно получить и простым вычитанием: `height = bottom - top`, `width = right - left`.</li>
</ul>


[smart header="Метод `elem.getBoundingClientRect()` изнутри"]

Браузер отображает любое содержимое, используя прямоугольники. 

В случае с блочным элементом, таким как `DIV`, элемент сам по себе образует прямоугольник. Но если элемент строчный и содержит в себе длинный текст, то каждая строка будет отдельным прямоугольником, с одинаковой высотой но разной длиной (у каждой строки -- своя длина).

Более подробно это описано в: <a href="http://www.w3.org/TR/CSS21/visuren.html#anonymous-block-level">спецификации</a>.

Если обобщить, содержимое элемента может отображаться в одном прямоугольнике или в нескольких.

Все эти прямоугольники можно получить с помощью [elem.getClientRects()](https://developer.mozilla.org/en/DOM/element.getClientRects). А метод [elem.getBoundingClientRect()](https://developer.mozilla.org/en/DOM/element.getBoundingClientRect) возвращает один охватывающий прямоугольник для всех `getClientRects()`.
[/smart]


## elementFromPoint(x, y) [#elementFromPoint]

Возвращает элемент, который находится на координатах `(x, y)` относительно окна.

Синтаксис:

```js
var elem = document.elementFromPoint(x, y);
```

Например, код ниже ниже выделяет и выводит тег у элемента, который сейчас в середине окна:

```js
//+ run
var centerX = document.documentElement.clientWidth / 2;
var centerY = document.documentElement.clientHeight / 2;

var elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert( elem.tagName );
elem.style.background = "";
```

Аналогично предыдущему методу, используются координаты относительно окна. В зависимости от прокрутки страницы, от размеров окна браузера, в центре может быть разный элемент.

## position:fixed

Координаты обычно требуются не просто так, а, например, чтобы переместить элемент на них.

В CSS для позиционирования элемента относительно окна используется свойство `position:fixed`. Как правило, вместе с ним идут и координаты, например `left/top`.

Например, этот код покажет сообщение под элементом с `id="coords-show-mark"`:

```js
var elem = document.getElementById("coords-show-mark");

// получить координаты
var coords = elem.getBoundingClientRect();

// создать элемент для сообщения
var message = document.createElement('div');

// эти свойства можно было бы задать классом
message.style.position = "fixed";
message.style.background = "red";
message.style.color = "yellow";

*!*
// к координатам обязательно добавляем "px"!
message.style.left = coords.left + "px";
message.style.top = coords.bottom + "px";
*/!*

message.innerHTML = "Привет, мир!";

// добавить на 10 сек в документ
document.body.appendChild(message);
setTimeout(function() {
  document.body.removeChild(message);
}, 10000);
```

Нажмите на кнопку, чтобы запустить его:

<button id="coords-show-mark">кнопка с id="coords-show-mark"</button>

Этот код можно модифицировать, чтобы показывать сообщение слева, справа, сверху, делать это вместе с CSS-анимацией и так далее. Для этого нужно всего лишь понимать, как получить координаты.

**Заметим, однако, важную деталь: при прокрутке страницы сообщение отделяется от кнопки.**

Причина очевидна, ведь оно использует `position: fixed`. Как это обойти, мы посмотрим в следующей главе.


[head]
<script>
document.addEventListener('DOMContentLoaded', function() {

document.getElementById('coords-show-mark').onclick = function() {
var elem = document.getElementById("coords-show-mark");

// получить координаты
var coords = elem.getBoundingClientRect();

// создать элемент для сообщения
var message = document.createElement('div');

// эти свойства можно было бы задать классом
message.style.position = "fixed";
message.style.background = "red";
message.style.color = "yellow";
message.style.padding = "5px 3px";

// к координатам обязательно добавляем "px"!
message.style.left = coords.left + "px";
message.style.top = coords.bottom + "px";

message.innerHTML = "Привет, мир!";

// добавить на 10 сек в документ
document.body.appendChild(message);
setTimeout(function() {
  document.body.removeChild(message);
}, 10000);
}
});

</script>
[/head]