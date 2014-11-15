# Структура HTML/CSS

Для начала, зададим структуру HTML/CSS.

Меню является отдельным графическим компонентом, его лучше поместить в единый DOM-элемент.

Элементы меню с точки зрения семантики являются списком `UL/LI`. Заголовок должен быть отдельным кликабельным элементом.

Получаем структуру:

```html
<div class="menu">
  <span class="title">Сладости (нажми меня)!</span>
  <ul>
    <li>Пирог</li>
    <li>Пончик</li>
    <li>Мед</li>
  </ul>
</div>
```

Для заголовка лучше использовать именно `SPAN`, а не `DIV`, так как `DIV` постарается занять 100% ширины, и мы не сможем ловить `click` только на тексте:

```html
<!--+ autorun height=50 -->
<div style="border: solid red 1px">[Сладости (нажми меня)!]</div>
```

...А `SPAN` -- это элемент с `display: inline`, поэтому он занимает ровно столько места, сколько занимает текст внутри него:

```html
<!--+ autorun height=50 -->
<span style="border: solid red 1px">[Сладости (нажми меня)!]</span>
```

Раскрытие/закрытие делайте путём добавления/удаления класса `.menu-open` к меню, которые отвечает за стрелочку и отображение `UL`.

# CSS 

CSS для меню:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
    
  display: none;
}
  
.menu .title {
  padding-left: 16px;
  font-size: 18px;
  cursor: pointer;
    
  background: url(...arrow-right.png) left center no-repeat;       
}
```

Если же меню раскрыто, то есть имеет класс `.menu-open`, то стрелочка слева заголовка меняется и список детей показывается:

```css
.menu-open .title {
  background: url(...arrow-down.png) left center no-repeat; 
}
  
.menu-open ul {
  display: block;
}
```

Теперь сделайте JavaScript.

[edit src="solution"]Полное решение в песочнице[/edit]