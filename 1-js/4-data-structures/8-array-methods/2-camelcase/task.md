importance: 3

---

# Перевести текст вида border-left-width в borderLeftWidth

Напишите функцию `camelize(str)`, которая преобразует строки вида "my-short-string" в "myShortString".

То есть, дефисы удаляются, а все слова после них получают заглавную букву.

Например:

```js
camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
```

Такая функция полезна при работе с CSS.

P.S. Вам пригодятся методы строк `charAt`, `split` и `toUpperCase`.

