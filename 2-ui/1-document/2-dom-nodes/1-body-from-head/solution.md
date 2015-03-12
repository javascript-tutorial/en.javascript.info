Выведет `null`, так как на момент выполнения скрипта тег `<body>` ещё не обработан браузером.

Попробуйте в действии:

```html
<!--+ run -->
<html>

<head>
  <script>
    alert( document.body ); // null
  </script>
</head>

<body>
  Привет, мир!
</body>

</html>
```

