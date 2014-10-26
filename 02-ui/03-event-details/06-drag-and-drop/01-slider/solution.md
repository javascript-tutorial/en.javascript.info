# HTML/CSS, подсказка

Слайдер -- это `DIV`, подкрашенный фоном/градиентом, внутри которого находится другой `DIV`, оформленный как бегунок, с `position:relative`.

Бегунок немного поднят, и вылезает по высоте из родителя.

# HTML/CSS для слайдера

Например, вот так:

```html
<!--+ run -->
<style>
.slider {
  border-radius: 5px;
  background: #E0E0E0;
  background: -moz-linear-gradient(left top , #E0E0E0, #EEEEEE) repeat scroll 0 0 transparent;
  background: -webkit-gradient(linear, left top, right bottom, from(#E0E0E0), to(#EEEEEE));
  background: linear-gradient(left top, #E0E0E0, #EEEEEE);
  width: 310px;
  height: 15px;
  margin: 5px;
}
.thumb {
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  left: 10px;
  top: -5px;
  background: blue;
  cursor: pointer;
}
</style>

<div class="slider">
  <div class="thumb"></div>
</div>
```

Теперь на этом реализуйте перенос бегунка.

# Полное решение

[edit src="solution"]Полное решение[/edit]

Это горизонтальный Drag'n'Drop, ограниченный по ширине. Его особенность -- в `position:relative` у переносимого элемента, т.е. координата ставится не абсолютная, а относительно родителя.