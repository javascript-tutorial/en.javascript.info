Есть два варианта.

1. Можно использовать свойство `elem.style.cssText` и присвоить стиль в текстовом виде. При этом все присвоенные ранее свойства `elem.style` будут удалены.
2. Можно назначить подсвойства `elem.style` одно за другим. Этот способ более безопасен, т.к. меняет только явно присваемые свойства.

Мы выберем второй путь.

**Описание CSS-свойств:**

```css
.button {
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  border: 2px groove green;
  display: block;
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-decoration: none;
  text-align: center;
  color: red;
  font-weight: bold;
}
```

`*-border-radius`
: Добавляет скругленные углы. Свойство присваивается в вариантах для Firefox `-moz-...`, Chrome/Safari `-webkit-...` и стандартное CSS3-свойство для тех, кто его поддерживает (Opera).

`display`
: По умолчанию, у `A` это свойство имеет значение `display: inline`.

`height`, `line-height`
: Устанавливает высоту и делает текст вертикально центрированным путем установки `line-height` в значение, равное высоте. Такой способ центрирования текста работает, если он состоит из одной строки.

`text-align`
: Центрирует текст горизонтально.

`color`, `font-weight`
: Делает текст красным и жирным.

