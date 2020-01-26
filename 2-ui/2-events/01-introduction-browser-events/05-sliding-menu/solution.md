
# HTML/CSS
First let's create HTML/CSS.

A menu is a standalone graphical component on the page, so it's better to put it into a single DOM element.

A list of menu items can be laid out as a list `ul/li`.

Here's the example structure:

```html
<div class="menu">
  <span class="title">Sweeties (click me)!</span>
  <ul>
    <li>Cake</li>
    <li>Donut</li>
    <li>Honey</li>
  </ul>
</div>
```

We use `<span>` for the title, because `<div>` has an implicit `display:block` on it, and it will occupy 100% of the horizontal width.

Like this:

```html autorun height=50
<div style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</div>
```

So if we set `onclick` on it, then it will catch clicks to the right of the text.

As `<span>` has an implicit `display: inline`, it occupies exactly enough place to fit all the text:

```html autorun height=50
<span style="border: solid red 1px" onclick="alert(1)">Sweeties (click me)!</span>
```

# Toggling the menu

Toggling the menu should change the arrow and show/hide the menu list.

All these changes are perfectly handled by CSS. In JavaScript we should label the current state of the menu by adding/removing the class `.open`.

Without it, the menu will be closed:

```css
.menu ul {
  margin: 0;
  list-style: none;
  padding-left: 20px;
  display: none;
}

.menu .title::before {
  content: '▶ ';
  font-size: 80%;
  color: green;
}
```

...And with `.open` the arrow changes and the list shows up:

```css
.menu.open .title::before {
  content: '▼ ';
}

.menu.open ul {
  display: block;
}
```
