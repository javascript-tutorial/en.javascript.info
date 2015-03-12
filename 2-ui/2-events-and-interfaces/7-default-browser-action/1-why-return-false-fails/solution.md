Дело в том, что обработчик из атрибута `onclick` делается браузером как функция с заданным телом. 

То есть, в данном случае он будет таким:

```js
function(event) {
  handler() // тело взято из атрибута onclick
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

Также можно использовать объект события для вызова `event.preventDefault()`, например:

```html
<!--+ run -->
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="http://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```

