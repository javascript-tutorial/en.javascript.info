importance: 5

---

# Show a note near the element

Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:
- `"top"` - position `elem` right above `anchor`
- `"right"` - position `elem` immediately at the right of `anchor`
- `"bottom"` - position `elem` right below `anchor`

It's used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a "note" element with given `html` and shows it at the given `position` near the `anchor`.

Here's the demo of notes:

[iframe src="solution" height="350" border="1" link]
