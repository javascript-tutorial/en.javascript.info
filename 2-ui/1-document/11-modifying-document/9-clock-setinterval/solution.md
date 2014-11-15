Для начала, придумаем подходящую HTML/CSS-структуру.

Здесь каждый компонент времени удобно поместить в соответствующий `SPAN`:

```html
<div id="clock">
    <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Каждый `SPAN` раскрашивается при помощи CSS.

Жизнь часам будет обеспечивать функция `update`, вызываемая каждую секунду: `setInterval(update, 1000)`.

```js
var timerId; // таймер, если часы запущены

function clockStart() {  // запустить часы
  if (timerId) return;

  timerId = setInterval(update, 1000);
  update();  // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null;
}
```

Обратите внимание, что вызов `update` не только запланирован, но и производится тут же в строке `(*)`. Иначе посетителю пришлось бы ждать до первого выполнения `setInterval`.

Функция обновления часов:

```js
function update() {
  var clock = document.getElementById('clock');
*!*
  var date = new Date(); // (*)
*/!*
  var hours = date.getHours();
  if (hours < 10) hours = '0'+hours;
  clock.children[0].innerHTML = hours;

  var minutes = date.getMinutes();
  if (minutes < 10) minutes = '0'+minutes;
  clock.children[1].innerHTML = minutes;

  var seconds = date.getSeconds();
  if (seconds < 10) seconds = '0'+seconds;
  clock.children[2].innerHTML = seconds;
}
```

В строке `(*)` каждый раз мы получаем текущую дату. Мы должны это сделать, несмотря на то, что, казалось бы, могли бы просто увеличивать счетчик каждую секунду.

На самом деле мы не можем опираться на счетчик для вычисления даты, т.к. `setInterval` не гарантирует точную задержку. Если в другом участке кода будет вызван `alert`, то часы остановятся, как и любые счетчики.

[edit src="solution"]Полный код решения[/edit]