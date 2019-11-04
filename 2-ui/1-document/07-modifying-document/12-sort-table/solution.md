The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:


```js
let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);

table.tBodies[0].append(...sortedRows);
```

1. Get all `<tr>`, like `table.querySelectorAll('tr')`, then make an array from them, cause we need array methods.
2. The first TR (`table.rows[0]`) is actually a table header, so we take the rest by `.slice(1)`.
3. Then sort them comparing by the content of the first `<td>` (the name field).
4. Now insert nodes in the right order by `.append(...sortedRows)`.

    Tables always have an implicit `<tbody>` element, so we need to take it and insert into it: a simple `table.append(...)` would fail.

    Please note: we don't have to remove them, just "re-insert", they leave the old place automatically.
