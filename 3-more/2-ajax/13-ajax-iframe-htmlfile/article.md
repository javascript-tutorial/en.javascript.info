# IFRAME в IE: cкрытие в ActiveX "htmlfile"

Так как в IE6-9 современные транспорты не поддерживаются, то приходится использовать  `iframe`. И здесь есть две проблемы:

<ul>
<li>При POST в `IFRAME` раздаётся звук "клика".</li>
<li>Пока идёт запрос в ифрейм, показываются часики и анимируется загрузка страницы.</li>
</ul>

И того и другого можно избежать, и сделать запрос полностью незаметным, если воспользоваться некоторыми специфическими возможностями Internet Explorer.
[cut]

В Internet Explorer есть безопасный ActiveX-объект `htmlfile`. IE не требует разрешений на его создание. Фактически, это независимый HTML-документ.

Оказывается, если `iframe` создать в нём, то никакой анимации и звуков не будет.

Итак, схема:
<ol>
<li>Основное окно `main` создёт вспомогательный объект: `new ActiveXObject("htmlfile")`. Это HTML-документ со своим `window`, похоже на встроенный `iframe`.</li>
<li>В `htmlfile` записывается `iframe`.</li>
<li>Цепочка общения: основное окно - `htmlfile` - ифрейм.</li>
</ol>

## iframeActiveXGet

На самом деле всё еще проще, если посмотреть на код:

Метод `iframeActiveXGet` по существу идентичен обычному `iframeGet`, которое мы рассмотрели. Единственное отличие -- вместо `createIframe` используется особый метод `createActiveXFrame`:

```js
function iframeActiveXGet(url, onSuccess, onError) {

  var iframeOk = false;

  var iframeName = Math.random();
*!*
  var iframe = createActiveXFrame(iframeName, url);
*/!*
  
  CallbackRegistry[iframeName] = function(data) {
    iframeOk = true;  
    onSuccess(data);
  }

  iframe.onload = function() { 
    iframe.parentNode.removeChild(iframe); // очистка
    delete CallbackRegistry[iframeName];   
    if (!iframeOk) onError(); // если коллбэк не вызвался - что-то не так
  }

}
```

## createActiveXFrame

В этой функции творится вся IE-магия:

```js
function createActiveXFrame(name, src) {
  // (1)
  var htmlfile = window.htmlfile;
  if (!htmlfile) {
    htmlfile = window.htmlfile = new ActiveXObject("htmlfile");
    htmlfile.open();
    // (2)
    htmlfile.write("<html><body></body></html>");
    htmlfile.close();
    // (3)
    htmlfile.parentWindow.CallbackRegistry = CallbackRegistry;
  }
  
  // (4)
  src = src || 'javascript:false';
  htmlfile.body.insertAdjacentHTML('beforeEnd', 
    "<iframe name='"+name+"' src='"+src+"'></iframe>");
  return htmlfile.body.lastChild; 
}
```

<ol>
<li>Вспомогательный объект `htmlfile` будет один и он будет глобальным. Можно и спрятать переменную в замыкании. Смысл в том, что в один `htmlfile` можно записать много ифреймов, так что не будем множить сущности и занимать ими лишнюю память.</li>
<li>В `htmlfile` можно записать любой текст и, при необходимости, через  `document.write('<script>...<\/script>)`. Здесь мы делаем пустой документ.</li>
<li>Когда загрузится `iframe`, он сделает вызов:

```php
<script>
parent.CallbackRegistry[window.name](<?=$data?>);
</script>
```

Здесь `parent'ом` для `iframe'а` будет `htmlfile`, т.е. `CallbackRegistry` будет искаться среди переменных соответствующего ему окна, а вовсе не верхнего `window`.

Окно для `htmlfile` доступно как `htmlfile.parentWindow`, копируем в него ссылку на реестр коллбэков `CallbackRegistry`. Теперь ифрейм его найдёт.</li>
<li>Далее вставляем ифрейм в документ. В старых `IE` нельзя поменять `name` ифрейму через DOM, поэтому вставляем строкой через `insertAdjacentHTML`.</li>
</ol>

Пример в действии (только IE):

[iframe src="activex" border=1 link zip]

Запрос, который происходит, полностью незаметен. Мы ещё воспользуемся описанным способом для реализации COMET.

## POST через ActiveX

Ранее мы рассмотрели метод GET. Метод POST подразумевает отправку формы в ифрейм.

Для этого форму нужно добавить не во внешнее окно, а в `htmlfile`, через `htmlfile.appendChild`.  

В остальном -- всё также, как и при обычной отправке через ифрейм. 








[head]
<script src="/files/tutorial/ajax/script/scriptRequest.js"></script>
[/head]