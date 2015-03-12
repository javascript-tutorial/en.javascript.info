# Почему остаётся "ааа" ?

[importance 1]

Запустите этот пример. Почему вызов `removeChild` не удалил текст `"aaa"`?

```html
<!--+ height=100 run -->
<table>
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  var table = document.body.children[0];

  alert( table ); // таблица, пока всё правильно

  document.body.removeChild(table);
  // почему в документе остался текст?
</script>
```

