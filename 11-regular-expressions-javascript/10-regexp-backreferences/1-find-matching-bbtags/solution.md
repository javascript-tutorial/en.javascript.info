
Открывающий тег -- это <code class="pattern">\[(b|url|quote)\]</code>.

Для того, чтобы найти всё до закрывающего -- используем ленивый поиск <code class="pattern">[\s\S]*?</code> и обратную ссылку на открывающий тег.

Итого, получится: <code class="pattern">\[(b|url|quote)\][\s\S]*?\[/\1\]</code>.

В действии:

```js
//+ run
var re = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;

var str1 = "..[url]http://ya.ru[/url]..";
var str2 = "..[url][b]http://ya.ru[/b][/url]..";

alert( str1.match(re) ); // [url]http://ya.ru[/url]
alert( str2.match(re) ); // [url][b]http://ya.ru[/b][/url]
```

Для закрывающего тега `[/1]` понадобилось дополнительно экранировать слеш: `\[\/1\]`.
