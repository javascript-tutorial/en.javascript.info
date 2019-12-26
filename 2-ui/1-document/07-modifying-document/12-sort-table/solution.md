The solution is short, yet may look a bit tricky, so here I provide it with extensive comments:

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => { // 2
    let valueA = rowA.cells[0].innerHTML;
    let valueB = rowB.cells[0].innerHTML;
    return valueA > valueB ? 1 :
      valueA == valueB ? 0 : -1;
  });

table.tBodies[0].append(...sortedRows); // (3)
```

The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

We don't have to remove row elements, just "re-insert", they leave the old place automatically.

Please note: our comparison function `(2)` returns `0` for equal table rows. That's handy for cases when we accidentally re-sort the table. E.g. if our users triggers such re-sorting. Returning `0` makes sure that same-named users won't get re-ordered, as opposed to a more simpler solution `valueA > valueB ? 1 : -1`.

P.S. In our case, there's an explicit `<tbody>` in the table, but even if HTML table doesn't have `<tbody>`, the DOM structure always has it.
