Решение:

```html run
<select>
  <option value="Rock">Рок</option>
  <option value="Blues" selected>Блюз</option>
</select>

<script>
  var select = document.body.children[0];

  // 1)
  var selectedOption = select.options[select.selectedIndex];
  alert( selectedOption.value );

  // 2)
  var newOption = new Option("Classic", "Классика");
  select.appendChild(newOption);

  // 3)
  newOption.selected = true;
</script>
```

