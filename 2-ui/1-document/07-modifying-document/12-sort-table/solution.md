The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:


```js
let sortedRows = Array.from(table.tBodies[0].rows) // (1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1); // (2)

table.tBodies[0].append(...sortedRows); // (3)
```

The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

Please note: we don't have to remove row elements, just "re-insert", they leave the old place automatically.

Also note: even if the table HTML doesn't have `<tbody>`, the DOM structure always has it. So we must insert elements as `table.tBodes[0].append(...)`: a simple `table.append(...)` would fail.
