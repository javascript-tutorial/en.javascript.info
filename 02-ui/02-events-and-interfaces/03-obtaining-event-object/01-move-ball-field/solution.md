# Мяч под курсор мыши

Основная сложность первого этапа -- сдвинуть мяч под курсор, т.к. координаты клика `e.clientX/Y` -- относительно окна, а мяч позиционирован абсолютно внутри поля, его координаты `left/top` нужно ставить относительно левого-верхнего внутреннего (внутри рамки!) угла поля.

Чтобы правильно вычислить координаты мяча, нужно получить координаты угла поля и вычесть их из `clientX/Y`:

```js
var field = document.getElementById('field');
var ball = document.getElementById('ball');

field.onclick = function(e) {

*!*
  var fieldCoords = field.getBoundingClientRect();
  var fieldInnerCoords = {
    top: fieldCoords.top + field.clientTop,
    left: fieldCoords.left + field.clientLeft
  };

  ball.style.left = e.clientX - fieldInnerCoords.left + 'px';
  ball.style.top = e.clientY - fieldInnerCoords.top + 'px';
*/!*

};
```

Результат:

 [iframe src="solution" height="260" link edit]

В примере выше фон мяча намеренно окрашен в серый цвет, чтобы было видно, что элемент позиционируется верно.

Попробуйте дальше сами.

# Дальнейшее решение

Мяч нужно сдвинуть на половину его ширины и высоты `ball.clientWidth/clientHeight`, чтобы он оказался центром под курсором. Конечно, нужно чтобы эта ширина и высота были известны, т.е. картинка либо уже была загружена, либо размеры мяча содержались в документе/CSS.

Код, который это делает и проверяет на размеры, вы найдете в полном решении:

[iframe border="1" src="solution" height="260" link edit]