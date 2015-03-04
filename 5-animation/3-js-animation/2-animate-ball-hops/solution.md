В задаче [](/task/animate-ball) создаётся подпрыгивающий мяч. Нам нужно всего лишь добавить еще одну анимацию для `elem.style.left`.

Горизонтальная координата меняется по другому закону, нежели вертикальная. Она не "подпрыгивает", а постоянно увеличивается, постепенно сдвигая мяч вправо.

Поэтому мы не можем добавить её в тот же `animate`, нужно делать отдельный.

В качестве временной функции для перемещения вправо мы могли бы применить для неё `linear`, но тогда горизонтальное движение будет отставать от скачков мяча. Более красиво будет что-то типа `makeEaseOut(quad)`.

Код:

```js
var height = field.clientHeight - ball.clientHeight;
var width  = 100;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height*progress + 'px'
  }
});

animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width*progress + "px"
  }
});
```
