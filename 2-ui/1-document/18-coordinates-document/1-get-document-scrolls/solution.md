<ul>
<li>`top` -- это `pageYOffset`.</li>
<li>`bottom` -- это `pageYOffset` плюс высота видимой части `documentElement.clientHeight`.</li>
<li>`height` -- полная высота документа, её вычисление дано в главе [](/metrics-window).</li>
</ul>

Итого:

```js
function getDocumentScroll() {
  var scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  return {
    top: pageYOffset,
    bottom: pageYOffset + document.documentElement.clientHeight,
    height: scrollHeight
  };
}
```

