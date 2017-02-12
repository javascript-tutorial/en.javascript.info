

```html run height=100
<body>

  <div id="widget" data-widget-name="menu">Выберите жанр</div>

  <script>
    var div = document.getElementById('widget');

    var widgetName = div.getAttribute('data-widget-name');
    // или так, кроме IE10-
    var widgetName = div.dataset.widgetName;

    alert( widgetName ); // "menu"
  </script>
</body>
```

