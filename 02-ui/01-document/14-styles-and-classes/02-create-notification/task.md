# Создать уведомление

[importance 5]

Напишите функцию `showNotification(options)`, которая показывает уведомление, пропадающее через 1.5 сек. 

Описание функции:

```js
/**
 * Показывает уведомление, пропадающее через 1.5 сек
 * 
 * @param options.top {number} вертикальный отступ, в px
 * @param options.right {number} правый отступ, в px
 * @param options.cssText {string} строка стиля
 * @param options.className {string} CSS-класс 
 * @param options.html {string} HTML-текст для показа
 */
function showNotification(options) { 
  // ваш код
}
```

Пример использования:

```js
// покажет элемент с текстом "Привет" и классом welcome справа-сверху окна
showNotification({
  top: 10,
  right: 10,
  html: "Привет",
  className: "welcome"
});
```

[demo src="solution"]

Элемент уведомления должен иметь CSS-класс `notification`, к которому добавляется класс из `options.className`, если есть. Исходный документ содержит готовые стили.

[edit src="task" task/]

