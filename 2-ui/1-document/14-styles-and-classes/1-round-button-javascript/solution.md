Есть два варианта. 

<ol>
<li>Можно использовать свойство `elem.style.cssText` и присвоить стиль в текстовом виде. При этом все присвоенные ранее свойства `elem.style` будут удалены.</li>
<li>Можно назначить подсвойства `elem.style` одно за другим. Этот способ более безопасен, т.к. меняет только явно присваемые свойства.</li>
</ol>

Мы выберем второй путь.

[edit src="solution"]Открыть решение[/edit] 

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

<dl>
<dt>`*-border-radius`</dt>
<dd>Добавляет скругленные углы. Свойство присваивается в вариантах для Firefox `-moz-...`, Chrome/Safari `-webkit-...` и стандартное CSS3-свойство для тех, кто его поддерживает (Opera).</dd>
<dt>`display`</dt>
<dd>По умолчанию, у `A` это свойство имеет значение `display: inline`.</dd>
<dt>`height`, `line-height`</dt>
<dd>Устанавливает высоту и делает текст вертикально центрированным путем установки `line-height` в значение, равное высоте. Такой способ центрирования текста работает, если он состоит из одной строки.</dd>
<dt>`text-align`</dt>
<dd>Центрирует текст горизонтально.</dd>
<dt>`color`, `font-weight`</dt>
<dd>Делает текст красным и жирным.</dd>
</dl>

