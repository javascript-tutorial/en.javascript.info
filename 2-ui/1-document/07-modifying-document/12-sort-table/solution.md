The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:


```js
let sortedRows = Array.from(table.rows) // (1)
  .slice(1) // (2)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1); // (3)

table.tBodies[0].append(...sortedRows); // (4)
```

The step-by-step algorthm:

1. Get all `<tr>`, like `table.querySelectorAll('tr')`, then make an array from them, cause we need array methods.
2. The first TR (`table.rows[0]`) is actually a table header, so we take the rest by `.slice(1)`.
3. Then sort them comparing by the content of the first `<td>` (the name field).
4. Now insert nodes in the right order by `.append(...sortedRows)`.

Tables always have an implicit `<tbody>` element, so we must insert into it as `table.tBodes[0].append(...)`: a simple `table.append(...)` would fail.

Please note: we don't have to remove row elements, just "re-insert", they leave the old place automatically.

P.S. This solution assumes that the table doesn't have multple `<tbody>` (the common case). In case it does, we can modify the code accordingly: take rows only from the needed `<tbody>` in step `(1)` and insert them in that `<tbody>` step `(4)`.
