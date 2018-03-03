The HTML in the task is incorrect. That's the reason of the odd thing.

The browser has to fix it automatically. But there may be no text inside the `<table>`: according to the spec only table-specific tags are allowed. So the browser adds `"aaa"` *before* the `<table>`.

Now it's obvious that when we remove the table, it remains.

The question can be easily answered by exploring the DOM using the browser tools. It shows `"aaa"` before the `<table>`.

The HTML standard specifies in detail how to process bad HTML, and such behavior of the browser is correct.
