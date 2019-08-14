importance: 5

---

# Selectable list

Create a list where elements are selectable, like in file-managers.

- A click on a list element selects only that element (adds the class `.selected`), deselects all others.
- If a click is made with `key:Ctrl` (`key:Cmd` for Mac), then the selection is toggled on the element, but other elements are not modified.

The demo:

[iframe border="1" src="solution" height=180]

P.S. For this task we can assume that list items are text-only. No nested tags.

P.P.S. Prevent the native browser selection of the text on clicks.
