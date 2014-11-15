Посмотрите задачу [](/task/animate-ball). Там создаётся подпрыгивающий мяч. А для решения этой задачи нам нужно добавить еще одну анимацию для `elem.style.left`.

Горизонтальная координата меняется по другому закону, нежели вертикальная. Она не "подпрыгивает", а постоянно увеличивается, постепенно сдвигая мяч вправо.

Мы могли бы применить для неё `linear`, но тогда горизонтальное движение будет отставать от скачков мяча. Более красиво будет что-то типа `makeEaseOut(quad)`.

Код:

```js
img.onclick = function() {

  var height  = document.getElementById('field').clientHeight - img.clientHeight
  var width  = 100
  
  animate({
    delay: 20,
    duration: 1000,
    delta: makeEaseOut(bounce), 
    step: function(delta) {
      img.style.top = height*delta + 'px'
    }
  });
  
*!*
  animate({
    delay: 20,
    duration: 1000, 
    delta: makeEaseOut(quad),
    step: function(delta) {
      img.style.left = width*delta  + "px"
    }
  }); 
*/!*
}
```

[edit src="solution"]Полное решение[/edit]