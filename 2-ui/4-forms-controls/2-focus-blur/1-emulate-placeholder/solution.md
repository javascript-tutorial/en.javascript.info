Состояние элемента определяется наличием класса `placeholder`. Для простоты будем считать, что это -- единственный возможный класс у `INPUT'а`

При фокусировке, если в элементе находится плейсхолдер -- он должен исчезать:

```js
input.onfocus = function() {
  if (this.className == 'placeholder') {
    prepareInput(this);
  }
}

function prepareInput(input) { // превратить элемент в простой пустой input
  input.className = '';
  input.value = '';
}
```

...Затем элемент потеряет фокус. При этом нужно возвратить плейсхолдер, но только в том случае, если элемент пустой:

```js
input.onblur = function() {
  if (this.value == '') { // если пустой
    resetInput(this); // заполнить плейсхолдером
  }
}

function resetInput(input) {
  input.className = 'placeholder';
  input.value = 'E-mail';
}
```

Это решение можно сделать удобнее в поддержке, если при выполнении `prepareInput` копировать значение в специальное свойство, а в `resetInput` -- восстанавливать его:

```js
function prepareInput(input) {
  input.className = '';
*!*
  input.oldValue = input.value;
*/!*
  input.value = '';
}

function resetInput(input) {
  input.className = 'placeholder';
  input.value = input.oldValue;
}
```

Теперь, если понадобится изменить значение плейсхолдера -- это достаточно сделать в HTML, и не надо трогать JavaScript-код.

