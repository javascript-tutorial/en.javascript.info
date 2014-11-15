`top` -- можно кроссбраузерно получить, как указано в главе [](/metrics-window):

```js
function getDocumentScrollTop() {
  var html = document.documentElement;
  var body = document.body;

  var scrollTop = html.scrollTop || body && body.scrollTop || 0;
  scrollTop -= html.clientTop; // IE<8

  return scrollTop;
}
```

`bottom` -- это `top` плюс высота видимой части:

```js
function getDocumentScrollBottom() {
  return getDocumentScrollTop() + document.documentElement.clientHeight;
}
```

Полная высота -- максимум двух значений, детали см. в [](/metrics-window):

```js
function getDocumentScrollHeight() {
  var scrollHeight = document.documentElement.scrollHeight;
  var clientHeight = document.documentElement.clientHeight;

  scrollHeight = Math.max(scrollHeight, clientHeight);

  return scrollHeight;
}
```

Итого, ответ, использующий описанные выше функции:

```js
function getDocumentScroll() {
  return {
    top: getDocumentScrollTop(),
    bottom: getDocumentScrollBottom(),
    height: getDocumentScrollHeight()
  };
}
```

