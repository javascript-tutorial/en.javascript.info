Функция должна по текущей прокрутке определять, какие изображения видимы, и загружать их.

Она должна срабатывать не только при прокрутке, но и при загрузке. Вполне достаточно для этого -- указать ее вызов в скрипте под страницей, вот так:

```js
...страница...

function isVisible(elem) {

  var coords = elem.getBoundingClientRect();

  var windowHeight = document.documentElement.clientHeight;

  // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
  var topVisible = coords.top > 0 && coords.top < windowHeight;
  var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}


*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

При запуске функция ищет все видимые картинки с `realsrc` и перемещает значение `realsrc` в `src`. Обратите внимание, т.к. атрибут `realsrc` нестандартный, то для доступа к нему мы используем `get/setAttribute`. А `src` -- стандартный, поэтому можно обратиться по DOM-свойству.

**Функция проверки видимости `isVisible(elem)` получает координаты текущей видимой области и сравнивает их с элементом.**

Для видимости достаточно, чтобы координаты верхней(или нижней) границы элемента находились между границами видимой области.

В решении также указан вариант с `isVisible`, который расширяет область видимости на +-1 страницу (высота страницы -- `document.documentElement.clientHeight`).

[edit src="solution"]Открыть полное решение в песочнице[/edit]