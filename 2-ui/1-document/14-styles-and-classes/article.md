# Стили, getComputedStyle

Эта глава -- о свойствах стиля, получении о них информации и изменении при помощи JavaScript.
 	 	
Перед прочтением убедитесь, что хорошо знакомы с [блочной моделью CSS](http://www.w3.org/TR/CSS2/box.html) и понимаете, что такое `padding`, `margin`, `border`.
 	 	
[cut]

## Стили элемента: свойство style   

Объект `element.style` дает доступ к стилю элемента на чтение и запись.

С его помощью можно изменять большинство CSS-свойств, например `element.style.width="100px"` работает так, как будто у элемента в атрибуте прописано `style="width:100px"`. 

[warn header="Единицы измерения обязательны в `style`"]
Об этом иногда забывают, но в `style` так же, как и в CSS, нужно указывать единицы измерения, например `px`.

Ни в коем случае не просто `elem.style.width = 100` -- работать не будет.
[/warn]

**Для свойств, названия которых состоят из нескольких слов, используется вотТакаяЗапись:**

```js
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Пример использования `style`:

```js
//+ run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

[warn header="`style.cssFloat` вместо `style.float`"]
Исключением является свойство `float`. В старом стандарте JavaScript слово `"float"` было зарезервировано и недоступно для использования в качестве свойства объекта. Поэтому используется не `elem.style.float`, а `elem.style.cssFloat`.
[/warn]

[smart header="Свойства с префиксами"]
Специфические свойства браузеров, типа `-moz-border-radius`, `-webkit-border-radius`, записываются следующим способом:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```

То есть, каждый дефис даёт большую букву.
[/smart]

**Чтобы сбросить поставленный стиль, присваивают в `style` пустую строку: `elem.style.width=""`.**

При сбросе свойства `style` стиль будет взят из CSS.

Например, для того, чтобы спрятать элемент, можно присвоить: `elem.style.display = "none"`. 

А вот чтобы показать его обратно -- не обязательно явно указывать другой `display`, наподобие `elem.style.display = "block"`. Можно просто снять поставленный стиль: `elem.style.display = ""`.

```js
//+ run
// если запустить этот код, то <body> "мигнёт"
document.body.style.display = "none";

setTimeout(function() {
  document.body.style.display = "";
}, 1000);
```

**Стиль в `style` находится в формате браузера, а не в том, в котором его присвоили.**

Например:

```html
<!--+ run height=100 -->
<body>
  <script> 
*!*
    document.body.style.margin = '20px';
    alert(document.body.style.marginTop); // 20px! 
*/!*

*!*
    document.body.style.color = '#abc';
    alert(document.body.style.color); // rgb(170, 187, 204) 
*/!*
  </script>
</body>
```

Обратите внимание на то, как браузер "распаковал" свойство `style.margin`, предоставив для чтения `style.marginTop`. То же самое произойдет и для `border`, `background` и т.д.


[warn header="Свойство `style` мы используем лишь там, где не работают классы"]
В большинстве случаев внешний вид элементов задаётся классами. А JavaScript добавляет или удаляет их. Такой код красив и гибок, дизайн можно легко изменять.

Свойство `style` нужно использовать лишь там, где классы  не подходят, например если точное значение цвета/отступа/высоты вычисляется в JavaScript.
[/warn]


### Строка стилей style.cssText   

Свойство `style` является специальным объектом, ему нельзя присваивать строку. 

Запись `div.style="color:blue"` работать не будет. Но как же, всё-таки, поставить свойство стиля, если хочется задать его строкой?

Можно попробовать использовать атрибут: `elem.setAttribute("style", ...)`, но самым правильным и, главное, кросс-браузерным (с учётом старых IE) решением такой задачи будет использование свойства `style.cssText`. 

**Свойство `style.cssText` позволяет поставить стиль целиком в виде строки.**

Например:

```html
<!--+ run -->
<div>Button</div>

<script>
  var div = document.body.children[0];
 
  div.style.cssText="*!*color: red !important;*/!* \
    background-color: yellow; \
    width: 100px; \
    text-align: center; \
    *!*blabla: 5; \*/!*
  ";

  alert(div.style.cssText);
</script>
```

Браузер разбирает строку `style.cssText` и применяет известные ему свойства. Неизвестные, наподобие `blabla`, большинство браузеров его просто проигнорируют.

**При установке `style.cssText` все предыдущие свойства `style` удаляются.** 

Итак, `style.cssText` осуществляет полную перезапись `style`. Если же нужно заменить какое-то конкретно свойство стиля, то обращаются именно к нему: `style.color`, `style.width` и т.п, чтобы не затереть что-то важное по ошибке. 

Свойство `style.cssText` используют, например, для новосозданных элементов, когда старых стилей точно нет.

### Чтение стиля из style

Записать в стиль очень просто. А как прочитать?

Например, мы хотим узнать размер, отступы элемента, его цвет... Как это сделать?

**Свойство `style` содержит лишь тот стиль, который указан в атрибуте элемента, без учёта каскада CSS.**

Вот так `style` уже ничего не увидит:

```html
<!--+ run height=100 -->
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  Красный текст
  <script> 
*!*
    alert(document.body.style.color); //в большинстве браузеров
    alert(document.body.style.marginTop); //  ничего не выведет
*/!*
  </script>
</body>
```

## Полный стиль из getComputedStyle   

Итак, свойство `style` дает доступ только к той информации, которая хранится в `elem.style`. 

Он не скажет ничего об отступе, если он появился в результате наложения CSS или встроенных стилей браузера:

А если мы хотим, например, сделать анимацию и плавно увеличивать `marginTop` от текущего значения? Как нам сделать это? Ведь для начала нам надо это текущее значение получить.

**Для того, чтобы получить текущее используемое значение свойства, используется метод `window.getComputedStyle`, описанный в стандарте <a href="http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/css.html">DOM Level 2</a>.**

Его синтаксис таков:

```js
getComputedStyle(element[, pseudo])
```

<dl>
<dt>element</dt>
<dd>Элемент, значения для которого нужно получить</dd>
<dt>pseudo</dt>
<dd>Указывается, если нужен стиль псевдо-элемента, например `"::before"`. Пустая строка или отсутствие аргумента означают сам элемент.</dd>
</dl>

Поддерживается всеми браузерами, кроме IE8-. Следующий код будет работать во всех не-IE браузерах и в IE9+:

```html
<!--+ run height=100 -->
<style>
  body { margin: 10px }
</style>
<body>

  <script> 
    var computedStyle = getComputedStyle(document.body);
    alert(computedStyle.marginTop);  // выведет отступ в пикселях
    alert(computedStyle.color);  // выведет цвет 
  </script>

</body>
```

[smart header="Вычисленное (computed) и окончательное (resolved) значения"]
В CSS есть две концепции:
<ol>
<li>*Вычисленное* (computed) значение -- это то, которое получено после применения всех правил CSS и CSS-наследования. Например, `width: auto` или `font-size: 125%`.</li>
<li>*Окончательное* ([resolved](http://dev.w3.org/csswg/cssom/#resolved-values)) значение -- непосредственно применяемое к элементу. При этом все размеры приводятся к пикселям, например `width: 212px` или `font-size: 16px`. В некоторых браузерах пиксели могут быть дробными.</li>
</ol>
Когда-то `getComputedStyle` задумывалось для возврата вычисленного значения, но со временем оказалось, что окончательное гораздо удобнее. 

Поэтому сейчас в целом все значения возвращаются именно окончательные, кроме некоторых небольших глюков в браузерах, которые постепенно вычищаются.
[/smart]

[warn header="`getComputedStyle` требует полное свойство!"]
Для правильного получения значения нужно указать точное свойство. Например: `paddingLeft`, `marginTop`, `borderLeftWidth`.

**При обращении к сокращенному: `padding`, `margin`, `border` -- правильный результат не гарантируется.**

Действительно, допустим свойства `paddingLeft/paddingTop` взяты из разных классов CSS. Браузер не обязан объединять их в одно свойство `padding`. Иногда, в простейших случаях, когда свойство задано сразу целиком, `getComputedStyle`  сработает для сокращённого свойства, но не во всех браузерах. 

Например, некоторые браузеры (Chrome) выведут `10px` в документе ниже, а некоторые (Firefox) -- нет:

```html
<!--+ run -->
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  var style = getComputedStyle(document.body);
  alert( style.margin ); // в Firefox пустая строка
</script>
```

[/warn]


[smart header="Стили посещенных ссылок -- тайна!"]
У посещенных ссылок может быть другой цвет, фон, чем у обычных. Это можно поставить в CSS с помощью псевдокласса `:visited`. 

Но `getComputedStyle` не дает доступ к этой информации, чтобы произвольная страница не могла определить, посещал ли пользователь ту или иную ссылку. 

Кроме того, большинство браузеров запрещают применять к `:visited` CSS-стили, которые могут изменить геометрию элемента, чтобы даже окольным путем нельзя было это понять. В целях безопасности. 
[/smart]

## currentStyle для IE8-

В IE8- нет `getComputedStyle`, но у элементов есть свойство <a href="http://msdn.microsoft.com/en-us/library/ms536497.aspx">currentStyle</a>, которое возвращает вычисленное (computed) значение: уже с учётом CSS-каскада, но не всегда в окончательном формате.

Чтобы код работал и в старых и новых браузерах, обычно пишут кросс-браузерный код, наподобие такого:

```js
function getStyle(elem) {
  return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
}
```

Если вы откроете такой документ в IE8-, то размеры будут в процентах, а в современных браузерах -- в пикселях.

```html
<!--+ run height=100 -->
<style>
  body { margin: 10% }
</style>
<body>
  <script> 
    var elem = document.body;

    function getStyle(elem) {
      return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
    }

    var marginTop = getStyle(elem).marginTop;
    alert(marginTop); // IE8-: 10%, иначе пиксели
  </script>
</body>
```

[smart header="IE8-: перевод `pt,em,%` из `currentStyle` в пиксели"]
Эта информация -- дополнительная, она не обязательна для освоения.

В IE для того, чтобы получить из процентов реальное значение в пикселях существует метод "runtimeStyle+pixel", [описанный Дином Эдвардсом](http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291).

Он основан на свойствах `runtimeStyle` и `pixelLeft`, работающих только в IE.

В следующем примере функция `getIEComputedStyle(elem, prop)` получает значение в пикселях для свойства `prop`, используя `elem.currentStyle` и метод Дина Эдвардса.

Если вам интересно, как он работает, ознакомьтесь со свойствами с <a href="http://msdn.microsoft.com/en-us/library/ms535889(v=vs.85).aspx">runtimeStyle</a> и <a href="http://msdn.microsoft.com/en-us/library/ms531129%28VS.85%29.aspx">pixelLeft</a> в MSDN и раскройте код.

```js
//+ src="getIEComputedStyle.js" hide="Раскрыть код"

```

<script src="/files/tutorial/browser/dom/getIEComputedStyle.js"></script>

Рабочий пример (только IE):

```html
<style> #margin-test { margin: 1%; border: 1px solid black; } </style>
<div id="margin-test">Тестовый элемент с margin 1%</div>

<script>
  var elem = document.getElementById('margin-test');
  if (!elem.getComputedStyle) // старые IE
    document.write(getIEComputedStyle(elem, 'marginTop'));
  else 
    document.write('Пример работает только в IE8-');
</script>
```

[pre]
<style> #margin-test { margin: 1%; border: 1px solid black; } </style>
<div id="margin-test">Тестовый элемент с margin 1%</div>
<i>
<script>
  var elem = document.getElementById('margin-test');
  if (!window.getComputedStyle) // старые IE
    document.write(getIEComputedStyle(elem, 'marginTop'));
  else 
    document.write('Пример работает только в IE8-');
</script>
</i>
[/pre]
Современные Javascript-фреймворки и полифиллы используют этот прием для эмуляции `getComputedStyle` в старых IE.
[/smart]


## Итого

Все DOM-элементы предоставляют следующие свойства.

<ul>
<li>Свойство `style` -- это объект, в котором CSS-свойства пишутся `вотТакВот`. Чтение и изменение его свойств -- это, по сути, работа с компонентами атрибута `style`.</li>
<li>`style.cssText` -- строка стилей для чтения или записи. Аналог полного атрибута `style`.</li>

<li>Свойство `currentStyle`(IE8-) и метод `getComputedStyle` (IE9+, стандарт) позволяют получить реальное, применённое сейчас к элементу свойство стиля с учётом CSS-каскада и браузерных стилей по умолчанию.

При этом `currentStyle` возвращает значение из CSS, до окончательных вычислений, а `getComputedStyle` -- окончательное, непосредственно применённое к элементу (как правило).</li>
</ul>

Более полная информация о `style`, включающая другие, реже используемые методы работы с ним, доступна здесь: [CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/DOM/CSSStyleDeclaration).

