Решение состоит в том, чтобы добавить обработчик на контейнер `#thumbs` и отслеживать клики на ссылках. 

Когда происходит событие, обработчик должен изменять `src` `#largeImg` на `href` ссылки и заменять `alt` на ее `title`.

Код решения:

```js
var largeImg = document.getElementById('largeImg');

document.getElementById('thumbs').onclick = function(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  while(target != this) {

    if (target.nodeName == 'A') {
      showThumbnail(target.href, target.title);
      return false;
    }

    target = target.parentNode;
  }

}

function showThumbnail(href, title) {
  largeImg.src = href;
  largeImg.alt = title;
}
```

**Предзагрузка картинок**

Для того, чтобы картинка загрузилась, достаточно создать новый элемент `IMG` и указать ему `src`, вот так:

```js
var imgs = thumbs.getElementsByTagName('img');
for(var i=0; i<imgs.length; i++) {
  var url = imgs[i].parentNode.href;

*!*
  var img = document.createElement('img');  
  img.src = url;
*/!*
}
```

Как только элемент создан и ему назначен `src`, браузер сам начинает скачивать файл картинки.  

При правильных настройках сервера как-то использовать этот элемент не обязательно -- картинка уже закеширована. 


**Семантичная верстка**

Для списка картинок используется `DIV`. С точки зрения семантики более верный вариант -- список `UL/LI`.

