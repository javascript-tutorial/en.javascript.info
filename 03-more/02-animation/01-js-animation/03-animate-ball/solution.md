В HTML/CSS, падение мяча можно отобразить изменением свойства `ball.style.top` от 0 и до значения, соответствующего нижнему положению.

Нижняя граница элемента `field`, в котором находится мяч, имеет значение  `field.clientHeight`. Но свойство `top` относится к верху мяча, поэтому оно меняется до `field.clientHeight - ball.clientHeight`. 

Для создания анимационного эффекта лучше всего подойдет функция `bounce` в режиме `easeOut`.

Следующий код даст нам нужный результат:

```js
var img = document.getElementById('ball');
var field = document.getElementById('field');
img.onclick = function() {
  var from = 0;
  var to = field.clientHeight - img.clientHeight;
  animate({
    delay: 20,
    duration: 1000,
*!*
    delta: makeEaseOut(bounce), 
    step: function(delta) {
      img.style.top = to*delta + 'px'
    }
*/!*
  });
}
```

[edit src="solution"]Полное решение[/edit]