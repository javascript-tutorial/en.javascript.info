
# AJAX-запросы: fetch 

Метод [fetch](https://fetch.spec.whatwg.org/) -- это `XMLHttpRequest` нового поколения. Он предоставляет улучшенный интерфейс для осуществления запросов к серверу: как по части возможностей и контроля над происходящим, так и по синтаксису, так как построен на промисах.

Поддержка в браузерах пока не очень распространена, но есть [полифилл](https://github.com/github/fetch) и не один. 

## Использование

Синтаксис:

Начнём сразу с примера:

```js
//+ run
'use strict';

fetch('/article/fetch/user.json')
  .then( response => {
    alert(response.headers.get('Content-Type')); // text/html; charset=utf-8

    return response.json();
   })
  .then( user => alert(user.name) ) // iliakan
  .catch( alert );
```

Поток такой:

<ul>
<li>