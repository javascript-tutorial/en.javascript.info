Дело в том, что обработчик из атрибута `onclick` делается браузером как функция с заданным телом. 

То есть, он будет таким:

```js
function(event) {
  handler()
}
```

При этом возвращаемое `handler` значение никак не используется и не влияет на результат.

Рабочий вариант:

```html
<!--+ run -->
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="http://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

Альтернатива -- передать и использовать объект события для вызова `event.preventDefault()` (или кросс-браузерного варианта для поддержки старых IE).

```html
<!--+ run -->
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault ? event.preventDefault() : (event.returnValue=false);
  }
*/!*
</script>

<a href="http://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```

