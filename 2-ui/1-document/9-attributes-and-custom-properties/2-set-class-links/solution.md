
Сначала можно найти ссылки, например, при помощи `document.querySelectorAll('a')`, а затем выбрать из них нужные.

Затем определимся -- что использовать для проверки адреса ссылки: свойство `href` или атрибут `getAttribute('href')`?

Различие между ними заключается в том, что свойство будет содержать полный путь ссылки, а атрибут -- значение, указанное в HTML.

Если открыть страницу локально, на диске, то для `<a href="/tutorial">` значения будут такими:

- `a.getAttribute('href') == "/tutorial"`.
- `a.href == "file:///tutorial"` (возможно, в пути будет также буква диска).

Здесь нужен именно атрибут, хотя бы потому, что в свойстве все ссылки уже с хостом и протоколом, а нам надо понять, был ли протокол в `href` или нет.

Правила определения:

- Ссылки без `href` и без протокола `://` являются заведомо внутренними.
- Там, где протокол есть -- проверяем, начинается ли адрес с `http://internal.com`.

Итого, код может быть таким:
```js
var links = document.querySelectorAll('a');

for (var i = 0; i < links.length; i++) {

  var a = links[i];

  var href = a.getAttribute('href');

  if (!href) continue; // нет атрибута

  if (href.indexOf('://') == -1) continue; // без протокола

  if (href.indexOf('http://internal.com') === 0) continue; // внутренняя

  a.classList.add('external');
}
```

...Но, как это часто бывает, знание CSS может упростить задачу. Удобнее и эффективнее здесь -- указать проверки для `href` прямо в CSS-селекторе:

```js
// ищем все ссылки, у которых в href есть протокол,
// но адрес начинается не с http://internal.com
var css = 'a[href*="://"]:not([href^="http://internal.com"])';
var links = document.querySelectorAll(css);

for (var i = 0; i < links.length; i++) {
  links[i].classList.add('external');
}
```

