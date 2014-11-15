# Вёрстка

Для вёрстки можно использовать отрицательный `margin` у текста с подсказкой.

Решение в плане вёрстка есть в решении задачи [](/task/position-text-into-input).

# Решение

```js
placeholder.onclick = function() {
  input.focus();
}

// onfocus сработает и вызове input.focus() и при клике на input
input.onfocus = function() {
  if (placeholder.parentNode) {
    placeholder.parentNode.removeChild(placeholder);
  }
}
```

[edit src="solution"]Открыть полный код решения[/edit]