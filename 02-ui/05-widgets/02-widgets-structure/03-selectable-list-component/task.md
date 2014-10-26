# Компонент: список с выделением

[importance 5]

Перепишите решение задачи [](/task/selectable-list) (последний шаг) в виде компонента, с использованием jQuery. 

У компонента должен быть единственный публичный метод `getSelected()`, который возвращает выбранные значения в виде массива.

Использование:

```js
var listSelect = new ListSelect({
  elem: $('ul')
});
// listSelect.getSelected()
```

Демо:
[iframe border="1" src="solution"]

