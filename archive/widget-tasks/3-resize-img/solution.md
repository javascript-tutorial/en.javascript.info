# CSS

Для захвата проще всего создать дополнительные `DIV'ы` и отпозиционировать их сбоку и справа-снизу `IMG`. При нажатии на них начинать смену размера. 

CSS-структура:

```html
<div class="resize-wrapper" style="width: 503px; height: 285px;">
  <img src="heroes.jpg" id="heroes" style="width:500px;height:282px">
  <div class="resize-handle-s"></div>
  <div class="resize-handle-e"></div>
  <div class="resize-handle-se"></div>
</div>
```

Внешний `DIV` подстраивается под размер картинки и имеет `position:relative`. Внутри него расположены абсолютно позиционированные "ручки" для захвата.

Стиль:

```css
.resize-wrapper {
  position: relative;
}
.resize-wrapper img {
  /* img при таком DOCTYPE в некоторых браузерах имеет display:inline, в некоторых display:block
     если оставить inline, то под img браузер оставит пустое место для "хвостов" букв
  */
  display: block;
}

.resize-handle-se { /* правый-нижний угол */
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: url(handle-se.png) no-repeat;
  cursor: se-resize;
}

.resize-handle-s { /* нижняя "рамка", за которую можно потащить */
  position: absolute;
  bottom: 0;
  height: 3px;
  width:100%;
  background: gray;
  cursor: s-resize;
}

.resize-handle-e { /* правая "рамка", за которую можно потащить */
  position: absolute;
  right: 0;
  top: 0;
  width: 3px;
  height:100%;
  background: gray;
  cursor: e-resize;
}
```

Для обозначения низа используется буква "s" (south, "юг" по-английски), обозначения правой стороны -- буква "e" (east, "восток" по-английски).

Использование сторон света для обозначения направления можно часто встретить в скриптах.

# Алгоритм

<ol>
<li>При инициализации IMG оборачивается во внешнюю обертку и обкладывается `DIV'ами`, на которых ловим `mousedown`. Обертка нужна, чтобы абсолютно позиционировать `DIV'ы` внутри неё под/сбоку изображения.</li>
<li>При наступлении `mousedown`, начинаем ловить `document.mousemove` и подгонять картинку под размер, а обертку -- под картинку.

Желательно заодно отменить браузерное выделение и Drag'n'Drop, возвратив `false` из собработчиков событий `mousedown` и `dragstart`.
</li>
<li>При наступлении `mouseup` -- конец.</li>

[edit src="solution"]Открыть полное решение[/edit]