# Введение в браузерные события 

Для реакции на действия посетителя и внутреннего взаимодействия скриптов существуют *события*. 

*Событие* - это сигнал от браузера о том, что что-то произошло.
[cut]
Существует много видов событий.

Посмотрим список самых часто используемых, пока просто для ознакомления:

<dl>
<dt>События мыши</dt>
<dd>
<ul>
<li>`click` -- происходит, когда кликнули на элемент левой кнопкой мыши</li>
<li>`contextmenu` -- происходит, когда кликнули на элемент правой кнопкой мыши</li>
<li>`mouseover` -- возникает, когда на элемент наводится мышь</li>
<li>`mousedown` и `mouseup` -- когда кнопку мыши нажали или отжали</li>
<li>`mousemove` -- при движении мыши</li>
</ul>
</dd>
<dt>События на элементах управления</dt>
<dd>
<ul>
<li>`submit` -- посетитель отправил форму `<form>`</li>
<li>`focus` --  посетитель фокусируется на элементе, например нажимает на `<input>`</li>
</ul>
<dt>Клавиатурные события</dt>
<dd>
<ul>
<li>`keydown` -- когда посетитель нажимает клавишу</li>
<li>`keyup` -- когда посетитель отпускает клавишу</li>
</ul>
</dd>
<dt>События документа</dt>
<dd>
<ul>
<li>`DOMContentLoaded` -- когда HTML загружен и обработан, DOM документа полностью построен и доступен.</li>
</ul></dd>
<dt>События CSS</dt>
<dd>
<ul>
<li>`transitionend` -- когда CSS-анимация завершена.</li>
</ul></dd>
</dl>

Также есть и много других событий.

## Назначение обработчиков событий  

**Событию можно назначить обработчик, то есть функцию, которая сработает, как только событие произошло.**

Именно благодаря событиям JavaScript-код может реагировать на действия посетителя.

Есть несколько способов назначить событию обработчик. Сейчас мы их рассмотрим, начиная от самого простого.
 
### Использование атрибута HTML   

Обработчик может быть назначен прямо в разметке, в атрибуте, который называется `on<событие>`.

Например, чтобы прикрепить `click`-событие к `input` кнопке, можно присвоить обработчик `onclick`, вот так:

```html
<input value="Нажми меня" *!*onclick="alert('Клик!')"*/!* type="button">
```

При клике мышкой на кнопке выполнится код, указанный в атрибуте `onclick`.

В действии:

<input value="Нажми меня" onclick="alert('Клик!');" type="button">

Обратите внимание, для строки *внутри* `alert('Клик!')` используются *одиночные кавычки*, так как сам атрибут находится в двойных. 

Частая ошибка новичков в том, что они забывают, что код находится внутри атрибута. Запись вида `onclick="alert("Клик!")"` не будет работать. Если вам действительно нужно использовать именно двойные кавычки, то это можно сделать, заменив их на `&quot;`: <code>onclick="alert(&amp;quot;Клик!&amp;quot;)"</code>.

Однако, обычно этого не требуется, так как в разметке пишутся только очень простые обработчики. Если нужно сделать что-то сложное, то имеет смысл описать это в функции, и в обработчике вызвать уже её.

Следующий пример по клику запускает функцию `countRabbits()`.

```html
<!--+ src="2.html" run height=80 -->

```

Как мы помним, атрибут HTML-тега не чувствителен к регистру, поэтому `ONCLICK` будет работать так же, как `onClick` или `onclick`... Но, как правило, атрибуты пишут в нижнем регистре: `onclick`.

### Использование свойства DOM-объекта   

Можно назначать обработчик, используя свойство DOM-элемента `on<событие>`. 

Пример установки обработчика `click`:

```html
<input id="elem" type="button" value="Нажми меня"/>
<script>
*!*
elem.onclick = function() {
    alert('Спасибо');
};
*/!*
</script>
```

В действии:
<input id="elem" type="button" value="Нажми меня"/>
<script>
elem.onclick = function() {
    alert('Спасибо');
};
</script>

Если обработчик задан через атрибут, то браузер читает HTML-разметку, создаёт новую функцию из содержимого атрибута и записывает в свойство `onclick`.

**Обработчик хранится именно в свойстве, а атрибут -- лишь один из способов его инициализации.**

Эти два примера кода работают одинаково:

<ol>
<li>Только HTML:

```html
<!--+ run height=50 -->
<input type="button" *!*onclick="alert('Клик!')"*/!* value="Кнопка"/>
```

</li>
<li>HTML + JS:

```html
<!--+ run height=50 -->
<input type="button" id="button" value="Кнопка"/>
<script>
*!*
button.onclick = function() {
  alert('Клик!');
};
*/!*
</script>
```

</li>
</ol>

**Так как свойство, в итоге, одно, то назначить более одного обработчика так нельзя.** 

В примере ниже назначение через JavaScript перезапишет обработчик из атрибута:

```html
<!--+ run height=50 autorun -->
<input type="button" id="elem" onclick="alert('До')" value="Нажми меня"/>
<script>
*!*
elem.onclick = function() { // перезапишет существующий обработчик
  alert('После');
};
*/!*
</script>
```

Кстати, обработчиком можно назначить и уже существующую функцию:

```js
function sayThanks() {
  alert('Спасибо!');
}

elem.onclick = sayThanks;
```

Если обработчик надоел -- его всегда можно убрать назначением `elem.onclick = null`.

### Доступ к элементу через this

**Внутри обработчика события `this` ссылается на текущий элемент, то есть на тот, на котором он сработал.** 

Это можно использовать, чтобы получить свойства или изменить элемент.

В коде ниже `button` выводит свое содержимое, используя `this.innerHTML`:

```html
<button onclick="alert(this.innerHTML)">Нажми меня</button>
```

В действии:
<button onclick="alert(this.innerHTML)">Нажми меня</button>


### Частые ошибки

Если вы только начинаете работать с событиями -- обратите внимание на следующие особенности.

<dl>
<dt>Функция должна быть присвоена как `sayThanks`, а не `sayThanks()`.</dt>
<dd>

```js
button.onclick = sayThanks;
```

Если добавить скобки, то `sayThanks()` --  будет уже *результат* выполнения функции (а так как в ней нет `return`, то в `onclick` попадёт `undefined`). Нам же нужна именно функция.

...А вот в разметке как раз скобки нужны:

```html
<input type="button" id="button" onclick="sayThanks()"/>
```

Это различие просто объяснить. При создании обработчика браузером по разметке, он автоматически создает функцию из его содержимого. Поэтому последний пример -- фактически то же самое, что:

```js
button.onclick = function() {
*!*
  sayThanks();  // содержимое атрибута
*/!*
};
```

</dd>
<dt>Используйте именно функции, а не строки.</dt>
<dd>
Назначение обработчика строкой `elem.onclick = 'alert(1)'` будет работать, но не рекомендуется, могут быть проблемы при сжатии JavaScript.

Передавать код в виде строки по меньшей мере странно в языке, который поддерживает Function Expressions, оно здесь доступно только по соображениям совместимости с древними временами.
</dd>
<dt>Не используйте `setAttribute`.</dt>
<dd>
Такой вызов работать не будет:

```js
//+ run
// при нажатии на body будут ошибки 
// потому что при назначении в атрибут функция будет преобразована в строку
document.body.setAttribute('onclick', function() { alert(1) });
```

</dd>
<dt>Регистр свойства имеет значение.</dt>
<dd>Свойство называется `onclick`, а не `ONCLICK`.</dd>
 </dl>




## Специальные методы 

Фундаментальный недостаток описанных выше способов назначения обработчика -- невозможность повесить *несколько* обработчиков на одно событие.

Например, одна часть кода хочет при клике на кнопку делать ее подсвеченной, а другая -- выдавать сообщение. Нужно в разных местах два обработчика повесить.

При этом новый обработчик будет затирать предыдущий. Например, следующий код на самом деле назначает один обработчик -- последний:

```js
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // заменит предыдущий обработчик
```

Разработчики стандартов достаточно давно это поняли и предложили альтернативный способ назначения обработчиков при помощи специальных методов, который свободен от указанного недостатка.

### addEventListener и removeEventListener 

**Методы `addEventListener` и `removeEventListener` являются современным способом назначить или удалить обработчик, и при этом позволяют использовать сколько угодно любых обработчиков.**

Назначение обработчика осуществляется вызовом `addEventListener` с тремя аргументами:

```js
element.addEventListener( event, handler, phase );
```

<dl>
<dt>`event`</dt>
<dd>Имя события, например `click`</dd>
<dt>`handler`</dt>
<dd>Ссылка на функцию, которую надо поставить обработчиком.</dd>
<dt>`phase`</dt>
<dd>Фаза, на которой обработчик должен сработать. Этот аргумент мы рассмотрим далее в учебнике. Пока что будем использовать значение `phase = false`, которое нужно в 99% случаев.</dd>
</dl>

Удаление обработчика осуществляется вызовом `removeEventListener`:

```js
element.removeEventListener( event, handler, phase );
```

[warn header="Удаление требует ту же функцию"]
Для удаления нужно передать именно ту функцию-обработчик которая была назначена.

Вот так `removeEventListener` не сработает:

```js
input.addEventListener( "click" , function() {alert('Спасибо!')}, false);
// .... 
input.removeEventListener( "click", function() {alert('Спасибо!')}, false);
```

Это не одна и та же функция, а две независимо созданные (с одинаковым кодом, но это не важно).

Вот так правильно:

```js
function handler() {
  alert('Спасибо!');
}

input.addEventListener( "click" , handler, false);
// .... 
input.removeEventListener( "click", handler, false);
```

[/warn]

**Использование `addEventListener` позволяет добавлять несколько обработчиков на одно событие одного элемента:**

```html
<!--+ run -->
<input id="elem" type="button" value="Нажми меня"/>

<script>
  function handler1() {
    alert('Спасибо!');
  };
 
  function handler2() {
    alert('Спасибо ещё раз!');
  }

*!*
  elem.onclick = function() { alert("Привет"); };
  elem.addEventListener("click", handler1, false); // Спасибо! 
  elem.addEventListener("click", handler2, false); // Спасибо ещё раз!
*/!*
</script>
```

Как видно из примера выше, можно одновременно назначать обработчики и через `onсвойство` (только один) и через `addEventListener`. Однако, во избежание путаницы обычно рекомендуется выбрать один способ.

[warn header="`addEventListener` работает всегда, а `onсвойство` -- нет"]
У специальных методов есть ещё одно перимущество перед "старой школой".

Есть некоторые события, которые нельзя назначить через `onсвойство`, но можно через `addEventListener`. 

Например, таково событие `transitionend`, то есть окончание CSS-анимации. В большинстве браузеров оно требует назначения через `addEventListener`.

При нажатии на кнопку в примере ниже сработает второй обработчик, но не первый.

```html
<!--+ autorun run -->
<style>
  button {
    transition: width 3s;
    width: 100px;
  }
  .wide {
    width: 300px;
  }
</style>

<button id="elem" onclick="this.classList.toggle('wide');">
  Нажми меня
</button>

<script>
  elem.ontransitionend = function() { 
    alert("ontransitionend");  // не сработает
  };

*!*
  elem.addEventListener("transitionend", function() {
    alert("addEventListener"); // сработает по окончании анимации
  }, false);
*/!*
</script>
```

[/warn]


## Отличия IE8-

При работе с событиями в IE8- есть много отличий. Как правило, они формальны -- некое свойство или метод называются по-другому. Начиная с версии 9, также работают и стандартные свойства и методы, которые предпочтительны.

**В IE8- вместо `addEventListener/removeEventListener` используются свои методы.**

Назначение обработчика осуществляется вызовом `attachEvent`:

```js
element.attachEvent( "on"+event, handler);
```

Удаление обработчика -- вызовом `detachEvent`:

```js
element.detachEvent( "on"+event, handler);
```

Например:

```js
function handler() {
    alert('Спасибо!');
}
button.attachEvent( "onclick" , handler) // Назначение обработчика
// .... 
button.detachEvent( "onclick", handler) // Удаление обработчика
```

Как видите, почти то же самое, только событие должно включать префикс `on` и нет третьего аргумента, который нам пока не нужен.


[warn header="У обработчиков, назначенных с `attachEvent`, нет `this`"]
Обработчики, назначенные с `attachEvent` не получают `this`!

Это важная особенность и подводный камень старых IE.
[/warn]

### Кроссбраузерный способ назначения обработчиков

Можно объединить способы для IE<9 и современных браузеров, создав свои методы `addEvent(elem, type, handler)` и `removeEvent(elem, type, handler)`:

```js
var addEvent, removeEvent;

if (document.addEventListener) { // проверка существования метода
  addEvent = function(elem, type, handler) {
    elem.addEventListener(type, handler, false);
  };
  removeEvent = function(elem, type, handler) {
    elem.removeEventListener(type, handler, false);
  };
} else {
  addEvent = function(elem, type, handler) {
    elem.attachEvent("on" + type, handler);
  };
  removeEvent = function(elem, type, handler) {
    elem.detachEvent("on" + type, handler);
  };
}

...
// использование:
addEvent(elem, "click", function() { alert("Привет"); });
```

Это хорошо работает в большинстве случаев, но у обработчика не будет `this` в IE, потому что `attachEvent` не поддерживает `this`.

Кроме того, в IE7- есть проблемы с утечками памяти... Но если вам не нужно `this`, и вы не боитесь утечек (как вариант -- не поддерживаете IE7-), то это решение может подойти.


## Итого

Есть три способа назначения обработчиков событий:

<ol>
<li>Атрибут HTML: `onclick="..."`.</li>
<li>Свойство: <code>elem.onclick = function</code>.</li>
<li>Специальные методы:
<ul>
<li>Для IE8-: `elem.attachEvent( on+событие, handler )` (удаление через `detachEvent`).</li>
<li>Для остальных: `elem.addEventListener( событие, handler, false )` (удаление через `removeEventListener`).</li>
</ul>
</li>
</ol>

Сравнение `addEventListener` и `onclick`:
[compare]
+Некоторые события можно назначить только через `addEventListener`.
+Метод `addEventListener` позволяет назначить много обработчиков на одно событие.
-Обработчик, назначенный через `onclick`, проще удалить или заменить.
-Метод `onclick` кросс-браузерный.
[/compare]

**Этим введением мы только начинаем работу с событиями, но вы уже можете решать разнообразные задачи с их использованием.**


[head]
<style type="text/css">
.d0 { text-align:center;margin:auto; }
.d1 p { margin: 0 }
.d1 {
margin:2em;
background-color:green;
width:13em;
height:13em;
text-align:center;
}
.d1 .number {
  line-height: 2em;
}
.d2 {
text-align:center;
margin:auto;
background-color:blue;
width:9em;
height:9em;
}
.d1 .d2 ,number {
  line-height: 2em;
}
.d3 {
text-align:center;
margin:auto;
background-color:red;
width:5em;
height:5em;
}
.d1 .d2 .d3 .number {
  line-height: 5em;
}
.d1 .d2 .d2a {
  color:white;
  line-height: 2em;
}
</style>
<script type="text/javascript">
function highlightMe(elem) {
    elem.style.backgroundColor='yellow'
    alert(elem.className)
    elem.style.backgroundColor = ''
}

function highlightMe2(e) {
    highlightMe(e.currentTarget);
}
</script>
[/head]