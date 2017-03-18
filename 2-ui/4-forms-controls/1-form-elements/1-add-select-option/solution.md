The solution, step by step:

```html run
<select id="genres">
  <option value="rock">Rock</option>
  <option value="blues" selected>Blues</option>
</select>

<script>
  // 1)
  let selectedOption = genres.options[select.selectedIndex];
  alert( selectedOption.value );

  // 2)
  let newOption = new Option("classic", "Classic");
  select.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```
