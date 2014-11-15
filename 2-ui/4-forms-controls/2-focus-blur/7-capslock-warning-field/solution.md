# Алгоритм

JavaScript не имеет доступа к текущему состоянию [key CapsLock]. При загрузке страницы не известно, включён он или нет.

Но мы можем догадаться о его состоянии из событий:
<ol>
<li>Проверив символ, полученный по `keypress`. Символ в верхнем регистре без нажатого [key Shift] означает, что включён [key CapsLock]. Аналогично, символ в нижнем регистре, но с [key Shift] говорят о включенном [key CapsLock]. Свойство `event.shiftKey` показывает, нажат ли [key Shift]. Так мы можем точно узнать, нажат ли [key CapsLock].</li>
<li>Проверять `keydown`. Если нажат CapsLock (скан-код равен `20`), то переключить состояние, но лишь в том случае, когда оно уже известно. 
Под Mac так делать не получится, поскольку клавиатурные события с CapsLock  [работают некорректно](#keyboard-events-order).</li>
</ol>

Имея состояние `CapsLock` в переменной, можно при фокусировке на `INPUT` выдавать предупреждение.

Отслеживать оба события: `keydown` и `keypress` хорошо бы на уровне документа, чтобы уже на момент входа в поле ввода мы знали состояние CapsLock.

Но при вводе сразу в нужный `input` событие `keypress` событие доплывёт до `document` и поставит состояние CapsLock *после того, как сработает на `input`*. Как это обойти -- подумайте сами.

# Решение

При загрузке страницы, когда еще ничего не набрано, мы ничего не знаем о состоянии [key CapsLock], поэтому оно равно `null`:

```js
var capsLockEnabled = null;
```

Когда нажата клавиша, мы можем попытаться проверить, совпадает ли регистр символа и состояние [key Shift]:

```js
document.onkeypress = function(e) {

  var chr = getChar(e);
  if (!chr) return; // специальная клавиша

  if (chr.toLowerCase() == chr.toUpperCase()) {
    // символ, который не имеет регистра, такой как пробел,
    // мы не можем использовать для определения состояния CapsLock
    return;
  }

  capsLockEnabled = (chr.toLowerCase() == chr && e.shiftKey) || (chr.toUpperCase() == chr && !e.shiftKey);
}
```

Когда пользователь нажимает [key CapsLock], мы должны изменить его текущее состояние. Но мы можем сделать это только если знаем, что был нажат [key CapsLock]. 

Например, когда пользователь открыл страницу, мы не знаем, включен ли [key CapsLock]. Затем, мы получаем событие `keydown` для [key CapsLock]. Но мы все равно не знаем его состояния, был ли [key CapsLock] *выключен* или, наоборот, включен.

```js
if (navigator.platform.substr(0,3) != 'Mac') { // событие для CapsLock глючит под Mac
  document.onkeydown = function(e) {  
    if (e.keyCode == 20 && capsLockEnabled !== null) {
      capsLockEnabled = !capsLockEnabled;
    }
  };
}
```

Теперь поле. Задание состоит в том, чтобы предупредить пользователя о включенном CapsLock, чтобы уберечь его от неправильного ввода.

<ol>
<li>Для начала, когда пользователь сфокусировался на поле, мы должны вывести предупреждение о CapsLock, если он включен.</li>
<li>Пользователь начинает ввод. Каждое событие `keypress` всплывает до обработчика `document.keypress`, который обновляет состояние `capsLockEnabled`. 

Мы не можем использовать событие `input.onkeypress`, для отображения состояния пользователю, потому что оно сработает *до* `document.onkeypress` (из-за всплытия) и, следовательно, до того, как мы узнаем состояние [key CapsLock].

Есть много способов решить эту проблему. Можно, например, назначить обработчик состояния CapsLock на  событие `input.onkeyup`. То есть, индикация будет с задержкой, но это несущественно.

Альтернативное решение -- добавить на `input` такой же обработчик, как и на `document.onkeypress`.
</li>
<li>...И наконец, пользователь убирает фокус с поля. Предупреждение может быть видно, если [key CapsLock] включен, но так как пользователь уже ушел с поля, то нам нужно спрятать предупреждение.</li>
</ol>

Код проверки поля:

```html
<input type="text" onkeyup="checkCapsWarning(event)" onfocus="checkCapsWarning(event)" onblur="removeCapsWarning()"/>

<div style="display:none;color:red" id="caps">Внимание: нажат CapsLock!</div>

<script>
function checkCapsWarning() {
  document.getElementById('caps').style.display = capsLockEnabled ? 'block' : 'none';
}

function removeCapsWarning() {
  document.getElementById('caps').style.display = 'none';
}
</script>
```

[edit src="solution"]Полный код решения[/edit]