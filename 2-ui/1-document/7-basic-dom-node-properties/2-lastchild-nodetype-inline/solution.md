Небольшой подвох -- в том, что во время выполнения скрипта последним тегом является `SCRIPT`. Браузер не может обработать страницу дальше, пока не выполнит скрипт.

Так что результат будет `1` (узел-элемент).

```html
<!--+ run height=60 -->
<!DOCTYPE HTML>
<html>

<body>
  <script>
    alert( document.body.lastChild.nodeType );
  </script>
</body>

</html>
```

