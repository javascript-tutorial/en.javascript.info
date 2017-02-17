importance: 1

---

# Why "ааа" remains?

Run the example. Why `table.remove()` does not delete the text `"aaa"`?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // the table, as it should be

  table.remove();
  // why there's still aaa in the document?
</script>
```
