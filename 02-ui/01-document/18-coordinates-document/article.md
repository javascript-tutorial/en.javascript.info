# Координаты в документе

Система координат относительно всей страницы или, иначе говоря, относительно *документа*, тоже начинается в левом-верхнем углу.

Мы будем называть координаты в ней `pageX/pageY`.

[cut]

Зачем нужны ещё какие-то координаты, кроме рассмотренных ранее? 

Как мы видели в конце предыдущей главы, позиционирование через `position: fixed` привязывает элемент не к месту на странице, а к окну. Поэтому при прокрутке страница под таким элементом двигается, а сам элемент -- нет.

**Как правило, мы хотим показать элемент в определённом месте страницы, а не окна.**

Для этого используют `position: absolute` и координаты `left/top`, которые заданы относительно документа.

## Сравнение систем координат

Когда страница не прокручена, точки начала координат относительно окна `(clientX,clientY)` и документа `(pageX,pageY)` совпадают:

<img src="pagewindow0.png">

Например, координаты элемента с надписью "STANDARDS" равны расстоянию от верхней/левой границы окна:

<img src="standards.png">

**Прокрутим страницу, чтобы элемент был на самом верху:**

Посмотрите на рисунок ниже, на нём -- та же страница, только прокрученная, и тот же элемент "STANDARDS".

<ul>
<li>Координата `clientY` изменилась. Она теперь равна `0`, так как элемент находится вверху окна.</li>
<li>Координата `pageY` осталась такой же, так как отсчитывается от левого-верхнего угла *документа*.</li>
</ul>

<img src="standards-scroll.png">

**Итак, координаты `pageX/pageY` не меняются при прокрутке, в отличие от  `clientX/clientY`.** 

Технически, координаты относительно страницы включают в себя текущую прокрутку. Эти две системы координат жёстко связаны, их разность `pageY-clientY` -- в точности размер текущей прокрученной области.

## Получение координат [#getCoords]

К сожалению, готовой функции для получения координат элемента относительно страницы нет. Но её можно легко написать самим.

Наша функция `getCoords(elem)` будет брать результат `elem.getBoundingClientRect()` и прибавлять текущую прокрутку документа.

Результат: объект с координатами `{left: .., top: ..}`

```js
//+ autorun
function getCoords(elem) {
    // (1)
    var box = elem.getBoundingClientRect();
    
    var body = document.body;
    var docEl = document.documentElement;
    
    // (2)
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
    // (3)
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
    // (4)
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    
    return { top: top, left: left };
}
```

Разберем что и зачем, по шагам:

<ol>
<li>Получаем прямоугольник.</li>
<li>Считаем прокрутку страницы. Все браузеры, кроме IE8- поддерживают свойство `pageXOffset/pageYOffset`. В более старых IE, когда установлен DOCTYPE, прокрутку можно получить из `documentElement`, ну и наконец если DOCTYPE некорректен -- использовать `body`.</li>
<li>В IE документ может быть смещен относительно левого верхнего угла. Получим это смещение.</li>
<li>Добавим прокрутку к координатам окна и вычтем смещение `html/body`, чтобы получить координаты всего документа.</li>
</ol>

### Устаревший метод: offset*

Есть альтернативный способ нахождения координат -- это пройти всю цепочку `offsetParent` от элемента вверх и сложить отступы `offsetLeft/offsetTop`.

Мы разбираем его здесь с учебной целью, так как он используется лишь в старых браузерах.

Вот функция, реализующая такой подход.

```js
//+ autorun
function getOffsetSum(elem) {
  var top = 0, left = 0;

  while(elem) {
    top = top + parseInt(elem.offsetTop);
    left = left + parseInt(elem.offsetLeft);
    elem = elem.offsetParent;         
  }
   
  return {top: top, left: left};
}
```

Казалось бы, код нормальный. И он как-то работает, но разные браузеры преподносят "сюрпризы", включая или выключая размер рамок и прокруток из `offsetTop/Left`, некорректно учитывая позиционирование. В итоге результат не всегда верен. Можно, конечно, разобрать эти проблемы и посчитать действительно аккуратно и правильно этим способом, но зачем? Ведь есть `getBoundingClientRect`.

### Сравнение offset* с getBoundingClientRect

Посмотрим разницу между описанными способами вычисления координат на примере.

В прямоугольнике ниже есть 3 вложенных `DIV`. Все они имеют `border`, кое-кто из них имеет `position/margin/padding`.

Кликните по внутреннему (жёлтому) элементу, чтобы увидеть результаты обоих методов: `getOffsetSum` и `getCoords`, а также реальные координаты курсора -- `event.pageX/pageY` (мы обсудим их позже в статье [](/fixevent)).

[pre]
<div style="position:relative;padding:10px;height:80px;width:380px;border:7px red solid">
  <div style="border:10px blue solid;padding:2px;position:absolute;left:20%;top:20%">
    <div id="getBoundingClientRectEx" style="background-color:yellow;border:4px solid black;margin:2px;cursor:pointer">Кликните, чтобы получить координаты getOffsetSum и getCoords</div>
  </div>
</div>
<div id="getBoundingClientRectExRes">
<div><b>getOffsetSum</b>:<span>значение getOffsetSum()</span></div>
<div><b>getCoords</b>:<span>значение getCoords()</span></div>
<div><b>mouse</b>:<span>координаты мыши</span></div>
</div>

<script>
document.getElementById('getBoundingClientRectEx').onclick = function(event) {
    var o = getOffsetSum(this);
    var orect = getCoords(this);
    
    event = event || window.event;
    if ( event.pageX == null && event.clientX != null ) {
        var html = document.documentElement, body = document.body;
        event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
        event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
    }

    var list = document.getElementById('getBoundingClientRectExRes').getElementsByTagName('SPAN')
    list[0].innerHTML = '{left:'+o.left+', top:'+o.top+'}'
    list[1].innerHTML = '{left:'+orect.left+', top:'+orect.top+'}'
    list[2].innerHTML = 'pageX='+event.pageX+' pageY='+event.pageY
}
</script>
[/pre]

**При клике на любом месте желтого блока вы легко увидите разницу между `getOffsetSum(elem)` и `getCoords(elem)`.**

Для того, чтобы узнать, какой же результат верный, кликните в левом-верхнем углу жёлтого блока, причём обратите внимание -- кликать нужно не на жёлтом, а на чёрном, это рамка, она тоже входит в элемент. Будут видны точные координаты мыши, так что вы можете сравнить их с `getOffsetSum/getCoords`.

Пример клика в правильном месте (обратите внимание на разницу координат):

<img src="getcoords-compare.png">

**Именно `getCoords` всегда возвращает верное значение :).**




### Комбинированный подход  

Фреймворки, которые хотят быть совместимыми со старыми браузерами, используют комбинированный подход:

```js
function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getCoords(elem);
    } else { // старый браузер
        return getOffsetSum(elem);
    }
}
```

[js hide="Открыть полный код getCoords/getOffsetSum"]
function getOffsetSum(elem) {
  var top=0, left=0
  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent        
  }
   
  return {top: top, left: left}
}


function getCoords(elem) {
    var box = elem.getBoundingClientRect()
    
    var body = document.body;
    var docEl = document.documentElement;
    
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;
    
    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;
    
    return { top: Math.round(top), left: Math.round(left) };
}


function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        return getCoords(elem)
    } else {
        return getOffsetSum(elem)
    }
}
[/js]


## Координаты на экране screenX/screenY

Есть ещё одна система координат, которая используется очень редко, но для полноты картины необходимо её упомянуть.

Координаты относительно *экрана* `screenX/screenY` отсчитываются от его левого-верхнего угла. Имеется в виду именно *весь экран*, а не окно браузера.

<img src="screen.png">

Такие координаты могут быть полезны, например, при работе с мобильными устройствами или для открытия нового окна посередине экрана вызовом [window.open](https://developer.mozilla.org/en-US/docs/DOM/window.open).

<ul>
<li>**Общая информация об экране хранится в глобальной переменной [screen](https://developer.mozilla.org/en/DOM/window.screen):**

```js
//+ run
// общая ширина/высота
alert( screen.width + ' x ' + screen.height ); 

// доступная ширина/высота (за вычетом таскбара и т.п.)
alert( screen.availWidth + ' x ' + screen.availHeight); 

// есть и ряд других свойств screen (см. документацию)
```

</li>
<li>**Координаты левого-верхнего угла браузера на экране хранятся в `window.screenX,` `window.screenY`** (не поддерживаются IE8-):

```js
//+ run
alert("Браузер находится на " + window.screenX + "," + window.screenY);
```

Они могут быть и меньше нуля, если окно частично вне экрана. </li>
<li>**Координаты *DOM-элемента* на экране получить нельзя, браузер не предоставляет свойств и методов для этого.**</li>
</ul>

## Итого  

У любой точки в браузере есть координаты:
<ol>
<li>Относительно окна `window` -- `elem.getBoundingClientRect()`.</li>
<li>Относительно документа `document` -- добавляем прокрутку, во всех фреймворках есть готовая функция.</li>
<li>Относительно экрана `screen` -- можно узнать координаты браузера, но не элемента.</li>
</ol>

Метод `elem.getBoundingClientRect()` поддерживается IE очень давно, с версии 6, а вот версии других браузеров старше чем 2010 года (примерно), могут не иметь его. Для них (и только для них) используется подсчёт координат суммированием `offsetTop/Left`.

Координаты будут нужны нам далее, при работе с событиями мыши (координаты клика) и элементами (перемещение).

