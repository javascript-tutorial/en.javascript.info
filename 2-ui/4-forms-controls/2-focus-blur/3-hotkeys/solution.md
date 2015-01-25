# CSS для решения

Как видно из исходного кода, `#view` -- это `DIV`, который будет содержать результат, а `#area` - это редактируемое текстовое поле.

Так как мы преобразуем `DIV` в `TEXTAREA` и обратно, нам нужно сделать их практически одинаковыми с виду:

```css
#view, #area {
  height:150px;
  width:400px;
  font-family:arial;
}
```

Текстовое поле нужно как-то выделить. Можно добавить границу, но тогда изменится блок: он увеличится в размерах и немного съедет текст.

Для того, чтобы сделать размер `#area` таким же, как и `#view`, добавим поля(padding):

```css
#view {  
  /* padding + border = 3px */
  padding: 2px; 
  border:1px solid black; 
}
```

CSS для `#area` заменяет поля границами:

```css
#area {
  border: 3px groove blue;  
  padding: 0px;

  display:none;
}
```

По умолчанию, текстовое поле скрыто. Кстати, этот код убирает дополнительную рамку в ряде браузеров, которая появляется вокруг поля, когда на него попадает фокус:

```css
#area:focus { 
  outline: none; /* убирает рамку при фокусе */
}
```

# Горячие клавиши

Чтобы отследить горячие клавиши, нам нужны их скан-коды, а не символы. Это важно, потому что горячие клавиши должны работать независимо от языковой раскладки. Поэтому, мы будем использовать <code>keydown</code>:

```js
document.onkeydown = function(e) {
  if (e.keyCode == 27) { // escape
    cancel();
    return false;
  }

  if ((e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) && !area.offsetHeight) {
    edit();
    return false;
  }

  if ((e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) && area.offsetHeight) {
    save();
    return false;
  }
};
```

В примере выше, `offsetHeight` используется для того, чтобы проверить, отображается элемент или нет. Это очень надежный способ для всех элементов, кроме `TR` в некоторых старых браузерах.

В отличие от простой проверки `display=='none'`, этот способ работает с элементом, спрятанным с помощью стилей, а так же для элементов, у которых скрыты родители.

# Редактирование

Следующие функции переключают режимы. HTML-код разрешен, поэтому возможна прямая трансформация в `TEXTAREA` и обратно.

```js
function edit() {
    view.style.display = 'none';
    area.value = view.innerHTML;
    area.style.display = 'block';
    area.focus();
}

function save() {
    area.style.display = 'none';
    view.innerHTML = area.value;
    view.style.display = 'block';
}

function cancel() {
    area.style.display = 'none';
    view.style.display = 'block';
}
```

Чтобы проверить полное решение, сфокусируйтесь на правом iframe, пожалуйста.

