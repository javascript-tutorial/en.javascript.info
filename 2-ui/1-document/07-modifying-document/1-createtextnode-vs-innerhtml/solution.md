Answer: **1 and 3**.

Both commands result in adding the `text` "as text" into the `elem`.

Here's an example:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.textContent = text;
  elem3.innerHTML = text;
</script>
```
