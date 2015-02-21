# HTML/CSS

Область выделения можно оформить как `DIV`, серого цвета, полупрозрачный, с рамкой:

```css
.crop-area {
  position: absolute;
  border: 1px dashed black;
  background: #F5DEB3;
  opacity: 0.3;
  filter:alpha(opacity=30); /* IE opacity */
}
```

# Решение



Обратите внимание: обработчики `mousemove/mouseup` ставятся на `document`, не на элемент. 

Это для того, чтобы посетитель мог начать выделение на элементе, а продолжить и завершить его, двигая зажатой мышкой снаружи, вне его границ.