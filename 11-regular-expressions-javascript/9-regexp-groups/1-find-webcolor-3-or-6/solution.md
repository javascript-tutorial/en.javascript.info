Регулярное выражение для поиска 3-значного цвета вида `#abc`: <code class="pattern">/#[a-f0-9]{3}/i</code>.

Нужно добавить ещё три символа, причём нужны именно три, четыре или семь символов не нужны. Эти три символа либо есть, либо нет.

Самый простой способ добавить -- просто дописать в конец регэкспа: <code class="pattern">/#[a-f0-9]{3}([a-f0-9]{3})?/i</code>

Можно поступить и хитрее: <code class="pattern">/#([a-f0-9]{3}){1,2}/i</code>.

Здесь регэксп <code class="pattern">[a-f0-9]{3}</code> заключён в скобки, чтобы квантификатор <code class="pattern">{1,2}</code> применялся целиком ко всей этой структуре.

В действии:
```js
//+ run
var re = /#([a-f0-9]{3}){1,2}/gi;

var str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(re) ); // #3f3 #AA0ef #abc
```

В последнем выражении <code class="subject">#abcd</code> было найдено совпадение <code class="match">#abc</code>. Чтобы этого не происходило, добавим в конец <code class="pattern">\b</code>:

```js
//+ run
var re = /#([a-f0-9]{3}){1,2}\b/gi;

var str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(re) ); // #3f3 #AA0ef
```
