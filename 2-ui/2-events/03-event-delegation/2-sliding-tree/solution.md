The solution has two parts.

1. Wrap every tree node title into `<span>`. Then we can CSS-style them on `:hover` and handle clicks exactly on text, because `<span>` width is exactly the text width (unlike without it).
2. Set a handler to the `tree` root node and handle clicks on that `<span>` titles.
