# Размеры и прокрутка страницы

Многие метрики для страницы работают совсем не так, как для элементов. 

Поэтому мы рассмотрим решения типичных задач для страницы отдельно.

[cut]

## Ширина/высота видимой части окна

Свойства `clientWidth/Height` для элемента `document.documentElement` позволяют получить ширину/высоту видимой области окна.

Например, кнопка ниже выведет размер такой области для этой страницы:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>

Этот способ -- кросс-браузерный.

[warn header="Не `window.innerWidth/Height`"]
Все браузеры, кроме IE8-, также поддерживают свойства `window.innerWidth/innerHeight`. Они хранят текущий размер окна.

Выглядят они короче, чем `document.documentElement.clientWidth`, однако есть один нюанс.

Свойства `clientWidth/Height` берут в расчёт полосу прокрутку, а эти свойства -- нет.

Если справа часть страницы занимает полоса прокрутки, то эти строки выведут разное:
```js
//+ run
alert( window.innerWidth ); // вся ширина окна
alert( document.documentElement.clientWidth ); // ширина минус прокрутка
```

Обычно нам нужна именно *доступная* ширина окна, например, чтобы нарисовать что-либо, то есть за вычетом полосы прокрутки. Поэтому используем `document.documentElement.clientWidth`.
[/warn]

## Ширина/высота страницы с учётом прокрутки

Если прокрутка на странице заведомо присутствует, то полные размеры страницы можно взять в `document.documentElement.scrollWidth/scrollHeight`. 

Проблемы с этими свойствами возникают, когда *прокрутка то есть, то нет*. В этом случае они работают некорректно. 

В браузерах Chrome/Safari и Opera при отсутствии прокрутки значение `document.documentElement.scrollHeight` в этом случае может быть даже меньше, чем `document.documentElement.clientHeight` (нонсенс!). 

Эта проблема возникает именно для `document.documentElement`, то есть для всей страницы. С обычными элементами здесь всё в порядке.

Надёжно определить размер страницы с учетом прокрутки можно, взяв максимум из нескольких свойств:

```js
//+ run
var scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Высота с учетом прокрутки: ' + scrollHeight);
```

Почему так? Лучше и не спрашивайте, это одно из редких мест, где просто обходятся ошибки в браузерах. Глубокой логики здесь нет.

## Получение текущей прокрутки [#page-scroll]

Значение текущей прокрутки страницы хранится в свойствах `window.pageXOffset/pageYOffset`.

```js
//+ run
alert('Текущая прокрутка сверху: ' + window.pageYOffset);
alert('Текущая прокрутка слева: ' + window.pageXOffset);
```

Эти свойства:
<ul>
<li>Не поддерживаются IE8-</li>
<li>Их можно только читать, а менять нельзя.</li>
</ul>

Если IE8- не волнует, то для чтения прокрутки лучше способа нет, рецепт готов.

Альтернативный вариант -- это свойства `document.documentElement.scrollLeft/Top`, но они не работают в Safari/Chrome/Opera, которые используют `document.body` (это неправильно).

Так что кросс-браузерный вариант с учётом IE8:

```js
//+ run
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

alert("Текущая прокрутка: " + scrollTop);
```

## Изменение прокрутки: scrollTo, scrollBy, scrollIntoView [#window-scroll]

[warn]
Чтобы прокрутить страницу при помощи JavaScript, её DOM должен быть полностью загружен.
[/warn]

На обычных элементах свойства `scrollTop/scrollLeft` можно изменять, и при этом элемент будет прокручиваться.

Никто не мешает точно так же поступать и со страницей. Во всех браузерах, кроме Chrome/Safari/Opera можно осуществить прокрутку установкой `document.documentElement.scrollTop`, а в указанных -- использовать для этого `document.body.scrollTop`. И будет работать.

Но есть и другое, полностью кросс-браузерное и универсальное решение -- специальные методы прокрутки страницы [window.scrollBy(x,y)](https://developer.mozilla.org/en/Window.scrollBy) и [window.scrollTo(pageX,pageY)](https://developer.mozilla.org/en/Window.scrollTo). 

<ul>
<li>Метод `scrollBy(x,y)` прокручивает страницу относительно текущих координат.
[online]
Например, кнопка ниже прокрутит страницу на `10px` вниз:

<button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
[/online]
</li>
<li>Метод `scrollTo(pageX,pageY)` прокручивает страницу к указанным координатам относительно документа.

Он эквивалентен установке свойств `scrollLeft/scrollTop`.

Чтобы прокрутить в начало документа, достаточно указать координаты `(0,0)`.
[online]
<button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
[/online]
</li>
</ul>

## scrollIntoView

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
var scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);
```

</li>
</ul>

**Прокрутка окна:**

<ul>
<li>Прокрутку окна можно *получить* как `window.pageYOffset` (для горизонтальной -- `window.pageXOffset`) везде, кроме IE8-. 

На всякий случай -- вот самый кросс-браузерный способ, учитывающий IE7- в том числе:

```js
//+ run
var html = document.documentElement;
var body = document.body;

var scrollTop = html.scrollTop || body && body.scrollTop || 0;
scrollTop -= html.clientTop; // в IE7- <html> смещён относительно (0,0)

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

