importance: 1

---

# Why does "aaa" remain?

Run the example. Why does `table.remove()` not delete the text `"aaa"` but does delete the table
when table.remove() is uncommented?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // the table, as it should be

  //table.remove();
  // why there's still aaa in the document?
</script>
```
