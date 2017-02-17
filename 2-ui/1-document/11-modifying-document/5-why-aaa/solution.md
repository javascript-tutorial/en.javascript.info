The HTML in the task is incorrect. That's the matter. There may be no text inside the `<table>`, only table-specific tags.

The question can be easily solved by exploring the DOM in the browser tools. Then we'll see that the browser placed the text `"aaa"` *before* the table.

The HTML standard thoroughly specifies how to process bad HTML, and the behavior of the browser here is correct.
