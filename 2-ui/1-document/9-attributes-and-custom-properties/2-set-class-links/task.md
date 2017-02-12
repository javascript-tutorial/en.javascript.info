importance: 3

---

# Поставьте класс ссылкам

Сделайте желтыми внешние ссылки, добавив им класс `external`.

Все ссылки без `href`, без протокола и начинающиеся с `http://internal.com` считаются внутренними.

```html run
<style>
  .external {
    background-color: yellow
  }
</style>

<a name="list">список</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>
```

Результат:

[iframe border=1 height=180 src="solution"]

