# Голосовалка "на событиях"

[importance 5]

Добавьте событие в голосовалку, созданную в задаче [](/task/voter), используя механизм генерации событий на объекте.

Пусть каждое изменение голоса сопровождается событием `change` со свойством `detail`, содержащим обновлённое значение:

```js
var voter = new Voter({
  elem: document.getElementById('voter')
});

voter.setVote(5);

document.getElementById('voter').addEventListener('change', function(e) {
  alert( e.detail ); // новое значение голоса
});
```

Все изменения голоса должны производиться централизованно, через метод `setVote`, который и генерирует событие.

Результат использования кода выше (планируемый): 
[iframe border=1 height=60 src="solution"]

Исходный документ возьмите из решения задачи [](/task/voter).