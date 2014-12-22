# Подменить div на другой с таким же размером

[importance 3]

Посмотрим следующий случай из жизни. Был текст, который, в частности, содержал `div` с зелеными границами:

```html
<!--+ run -->
<style> 
  #moving-div { 
    border: 5px groove green; 
    padding: 5px; 
    margin: 10px;
    background-color: yellow;
  }
</style>

Before Before Before

<div id="moving-div">
Text Text Text<br>
Text Text Text<br>
</div>

After After After
```

Программист Валера из вашей команды написал код, который позиционирует его абсолютно и смещает в правый верхний угол. Вот этот код:

```js
var div = document.getElementById('moving-div');
div.style.position = 'absolute';
div.style.right = div.style.top = 0;
```

Побочным результатом явилось смещение текста, который раньше шел после `DIV`. Теперь он поднялся вверх:
[iframe height=90 src="source"]

**Допишите код Валеры, сделав так, чтобы текст оставался на своем месте после того, как `DIV` будет смещен.**

Сделайте это путем создания вспомогательного `DIV` с теми же размерами (`width`, `height`, `border`, `margin`, `padding`), что и у желтого `DIV`. Используйте только JavaScript, без CSS.

Должно быть так (новому блоку задан фоновый цвет для демонстрации):

[iframe height=140 src="solution"]





