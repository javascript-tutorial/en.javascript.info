importance: 5

---

# Improved tooltip behavior

Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`.

That's like the task <info:task/behavior-tooltip>, but here the annotated elements can be nested. The most deeply nested tooltip is shown.

For instance:

```html
<div data-tooltip="Here – is the house interior" id="house">
  <div data-tooltip="Here – is the roof" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Read on…">Hover over me</a>
</div>
```

The result in iframe:

[iframe src="solution" height=300 border=1]

P.S. Hint: only one tooltip may show up at the same time.
