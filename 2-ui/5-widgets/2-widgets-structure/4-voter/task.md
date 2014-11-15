# Голосовалка

[importance 5]

Напишите функцию-конструктор `new Voter(options)` для голосовалки. 
Она должна получать элемент в `options.elem`, в следующей разметке:

```html
<div id="voter" class="voter">
  <span class="down">—</span>
  <span class="vote">0</span>
  <span class="up">+</span>
</div>
```

По клику на `+` и `—` число должно увеличиваться или уменьшаться.

**Публичный метод `voter.setVote(vote)` должен устанавливать текущее число -- значение голоса.** 

Все остальные методы и свойства пусть будут приватными.

Результат:
[iframe src="solution" height=60 border=1]

[edit src="source" task/]
