The ball has `position:absolute`. It means that its `left/top` coordinates are measured from the nearest positioned element, that is `#field` (because it has `position:relative`).

The coordinates start from the inner left-upper corner of the field:

![](field.png)

The inner field width/height is `clientWidth/clientHeight`. So the field center has coordinates `(clientWidth/2, clientHeight/2)`.

...But if we set such values to `ball.style.left/top`, then not the ball as a whole, but the left-upper edge of the ball is in the center:

```js
ball.style.left = Math.round(field.clientWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2) + 'px';
```

Here's how it looks:

[iframe height=180 src="ball-half"]

To align the ball center with the center of the field, we should move the ball to the half of its width to the left and to the half of its height to the top:

```js
ball.style.left = Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';
```

**Attention: the pitfall!**

The code won't work reliably while `<img>` width/height is not given to the browser:

```html
<img src="ball.png" id="ball">
```

When the browser meets such a tag, it tries to figure out its width/height. Either from the `<img width=... height=...>` attributes or (if not given) from CSS.

If none is given, then the sizes are assumed to be `0` until the image loads.

TODO

После первой загрузки изображение уже будет в кеше браузера, и его размеры будут известны. Но когда браузер впервые видит документ -- он ничего не знает о картинке, поэтому значение `ball.offsetWidth` равно `0`. Вычислить координаты невозможно.

Чтобы это исправить, добавим `width/height` к картинке:

```html
<img src="ball.png" *!*width="40" height="40"*/!* id="ball">
```

Теперь браузер всегда знает ширину и высоту, так что все работает. Тот же эффект дало бы указание размеров в CSS.
