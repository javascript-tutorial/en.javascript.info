# Поставьте класс ссылкам

[importance 3]

Сделайте желтыми внешние ссылки, добавив им класс `external`.

Все относительные ссылки и абсолютные с доменом `javascript.ru` считаются внутренними.

```html
<!--+ run nolinks -->
<style>
.external { background-color: yellow }
</style>
<ul>
 <li><a href="http://google.com">http://google.com</a></li>
 <li><a href="/tutorial">/tutorial.html</a></li>
 <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
 <li><a href="http://nodejs.org">http://nodejs.org</a></li>
 <li><a href="http://javascript.ru/test">http://javascript.ru/test</a></li>
 <li><a href="ftp://javascript.ru/file">ftp://javascript.ru/file</a></li>
</ul>
```

Результат: 
[iframe border=1 height=180 src="solution"]

