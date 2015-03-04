В HTML/CSS, падение мяча можно отобразить изменением свойства `ball.style.top` от 0 и до значения, соответствующего нижнему положению.

Нижняя граница элемента `field`, в котором находится мяч, имеет значение  `field.clientHeight`. Но свойство `top` относится к верху мяча, поэтому оно меняется до `field.clientHeight - ball.clientHeight`. 

Для создания анимационного эффекта лучше всего подойдет функция `bounce` в режиме `easeOut`.

Следующий код даст нам нужный результат:

```js
var to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = to*progress + 'px'
  }
});
```

