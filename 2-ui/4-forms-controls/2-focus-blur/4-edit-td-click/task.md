importance: 5

---

# Edit TD on click

Make table cells editable on click.

- On click -- the cell should became "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.

The demo:

[iframe src="solution" height=400]
