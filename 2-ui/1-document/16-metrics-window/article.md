# Размеры и прокрутка страницы

Многие метрики для страницы работают совсем не так, как для элементов. Поэтому рассмотрим решения типичных задач для страницы отдельно.
[cut]
## Ширина/высота видимой части окна

Свойства `clientWidth/Height` для элемента `document.documentElement` позволяют получить ширину/высоту видимой области окна.

Например, кнопка ниже выведет размер такой области для этой страницы:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>

Этот способ -- кросс-браузерный.

## Ширина/высота всей страницы, с учётом прокрутки

Если прокрутка на странице присутствует, то полные размеры страницы можно взять в `document.documentElement.scrollWidth/scrollHeight`. 

Проблемы с этими свойствами возникают, когда *прокрутка то есть, то нет*. В этом случае они работают некорректно. 

В браузерах Chrome/Safari и Opera при отсутствии прокрутки значение `document.documentElement.scrollHeight` в этом случае может быть даже меньше, чем `document.documentElement.clientHeight` (нонсенс!). Эта проблема -- именно для `document.documentElement`, то есть для всей страницы. С обычными элементами здесь всё в порядке.

Надёжно определить размер с учетом прокрутки можно, взяв максимум из двух свойств:

```js
//+ run
var scrollHeight = document.documentElement.scrollHeight;
var clientHeight = document.documentElement.clientHeight;

*!*
scrollHeight = Math.max(scrollHeight, clientHeight);
*/!*

alert('Высота с учетом прокрутки: ' + scrollHeight);
```

## Прокрутка страницы [#page-scroll]

### Получение текущей прокрутки

Значение текущей прокрутки страницы хранится в свойствах `window.pageXOffset/pageYOffset`.

Но эти свойства:
<ul>
<li>Не поддерживаются IE<9</li>
<li>Их можно только читать, а менять нельзя.</li>
</ul>

Поэтому для кросс-браузерности рассмотрим другой способ -- свойство `document.documentElement.scrollLeft/Top`. 

<ul>
<li>`document.documentElement` содержит значение прокрутки, если стоит правильный DOCTYPE. Это работает во всех браузерах, кроме Safari/Chrome.</li>
<li>Safari/Chrome используют вместо этого `document.body` (это баг в Webkit).</li>
<li>В режиме совместимости (если некорректный DOCTYPE) некоторые браузеры также используют  `document.body`.</li>
</ul> 

Таким образом, для IE8+ и других браузеров, работающих в режиме соответствия стандартам, получить значение прокрутки можно так:

```js
//+ run
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

alert("Текущая прокрутка: " + scrollTop);
```

### С учётом IE7- и Quirks Mode [#getPageScroll]

Если дополнительно нужна поддержка IE<8, то там тоже есть важная тонкость. Документ может быть смещен относительно начальной позиции (0,0). Это смещение хранится в `document.documentElement.clientLeft/clientTop`, и мы должны вычесть его.

Если дополнительно добавить возможность работы браузера в Quirks Mode, то надёжный способ будет таким:

```js
//+ run
var html = document.documentElement;
var body = document.body;

var scrollTop = html.scrollTop || body && body.scrollTop || 0;
scrollTop -= html.clientTop;
alert("Текущая прокрутка: " + scrollTop);
```

Итого, можно создать кросс-браузерную функцию, которая возвращает значения прокрутки и поддерживает в том числе IE8-:

```js
var getPageScroll = (window.pageXOffset != undefined) ?
  function() {
    return {
      left: pageXOffset,
      top: pageYOffset
    };
  } :
  function() {
    var html = document.documentElement;
    var body = document.body;

    var top = html.scrollTop || body && body.scrollTop || 0;
    top -= html.clientTop;

    var left = html.scrollLeft || body && body.scrollLeft || 0;
    left -= html.clientLeft;

    return { top: top, left: left };
  }
```

### Изменение прокрутки: scrollTo, scrollBy, scrollIntoView [#window-scroll]

[smart]
Чтобы прокрутить страницу при помощи JavaScript, её DOM должен быть полностью загружен.
[/smart]

На обычных элементах свойства `scrollTop/scrollLeft` можно изменять, и при этом элемент будет прокручиваться.

Никто не мешает точно так же поступать и со страницей. Во всех браузерах, кроме Chrome/Safari можно осуществить прокрутку установкой `document.documentElement.scrollTop`, а в Chrome/Safari -- использовать для этого `document.body.scrollTop`. И будет работать.

Но есть и другое, полностью кросс-браузерное решение -- специальные методы прокрутки страницы [window.scrollBy(x,y)](https://developer.mozilla.org/en/Window.scrollBy) и [window.scrollTo(pageX,pageY)](https://developer.mozilla.org/en/Window.scrollTo). 



<ul>
<li>**Метод `scrollBy(x,y)` прокручивает страницу относительно текущих координат.**
Например, кнопка ниже прокрутит страницу на `10px` вниз:

<button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
</li>
<li>**Метод `scrollTo(pageX,pageY)` прокручивает страницу к указанным координатам относительно документа.** Он эквивалентен установке свойств `scrollLeft/scrollTop`.

Чтобы прокрутить в начало документа, достаточно указать координаты `(0,0)`:
<button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
</li>
</ul>

Для полноты картины рассмотрим также метод [elem.scrollIntoView(top)](https://developer.mozilla.org/en/DOM/element.scrollIntoView).

Метод `elem.scrollIntoView(top)` вызывается на элементе и прокручивает страницу так, чтобы элемент оказался вверху, если параметр `top` равен `true`, и внизу, если `top` равен `false`. Причем, если параметр `top` не указан, то он считается равным `true`.

Кнопка ниже прокрутит страницу так, чтобы кнопка оказалась вверху:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

А следующая кнопка прокрутит страницу так, чтобы кнопка оказалась внизу:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>

## Запрет прокрутки

Иногда бывает нужно временно сделать документ "непрокручиваемым". Например, при показе большого диалогового окна над документом -- чтобы посетитель мог прокручивать это окно, но не документ.

**Чтобы запретить прокрутку страницы, достаточно поставить `document.body.style.overflow = "hidden"`.**

При этом страница замрёт в текущем положении. Попробуйте сами:

<button onclick="document.body.style.overflow = 'hidden'">`document.body.style.overflow = 'hidden'`</button>

<button onclick="document.body.style.overflow = ''">`document.body.style.overflow = ''`</button>

При нажатии на верхнюю кнопку страница замрёт на текущем положении прокрутки. После нажатия на нижнюю -- прокрутка возобновится. 

**Вместо `document.body` может быть любой элемент, прокрутку которого необходимо запретить.**

Недостатком этого способа является то, что сама полоса прокрутки исчезает. Если она занимала некоторую ширину, то теперь эта ширина освободится, и содержимое страницы расширится, заняв её место. Такая перерисовка иногда выглядит как "прыжок" страницы. Это может быть не очень красиво, но обходится, если вычислить размер прокрутки и добавить `padding-right`.

## Итого

Размеры:

<ul>
<li>Для получения размеров видимой части окна: `document.documentElement.clientWidth/Height`
</li>
<li>Для получения размеров страницы с учётом прокрутки:

```js
var scrollHeight = document.documentElement.scrollHeight;
var clientHeight = document.documentElement.clientHeight;

*!*
scrollHeight = Math.max(scrollHeight, clientHeight);
*/!*
```

</li>
</ul>

**Прокрутка окна:**

<ul>
<li>Прокрутку окна можно *получить* как `window.pageYOffset` (для горизонтальной -- `window.pageXOffset`) везде, кроме IE<9. 

Для кросс-браузерности используется другой способ:

```js
//+ run
var html = document.documentElement;
var body = document.body;

var scrollTop = html.scrollTop || body && body.scrollTop || 0;
scrollTop -= html.clientTop; // IE<8
alert("Текущая прокрутка: " + scrollTop);
```

</li>
<li>Установить прокрутку можно при помощи специальных методов:
<ul>
<li>`window.scrollTo(pageX,pageY)` -- абсолютные координаты,</li>
<li>`window.scrollBy(x,y)` -- прокрутить относительно текущего места.</li><li>`elem.scrollIntoView(top)` -- прокрутить, чтобы элемент `elem` стал виден.</li>
</ul>
</li>
</ul>

