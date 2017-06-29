# XMLHttpRequest and AJAX

`XMLHttpRequest` is a built-in browser object that allows to make HTTP requests in JavaScript.

Despite of having the word "XML" in its name, it can operate on any data, not only in XML format.

## Asynchronous XMLHttpRequest

XMLHttpRequest has two modes of operation: synchronous and asynchronous.

First let's see the asynchronous variant as it's used in the majority of cases.

The code below loads the URL at `/article/xmlhttprequest/hello.txt` from the server and shows its content on-screen:

```js run
*!*
// 1. Create a new XMLHttpRequest object
*/!*
let xhr = new XMLHttpRequest();

*!*
// 2. Configure it: GET-request for the URL /article/.../hello.txt
xhr.open('GET', '/article/xmlhttprequest/hello.txt');
*/!*

*!*
// 3. Send the request over the network
*/!*
xhr.send();

*!*
// 4. This will be called after the response is received
*/!*
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    // if it's not 200, consider it an error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
  } else {
    // show the result
    alert(xhr.responseText); // responseText is the server response
  }
};
```

As we can see, there are several methods of `XMLHttpRequest` here. Let's cover them.

## Setup: "open"

The syntax:
```js
xhr.open(method, URL, async, user, password)
```

This method is usually called first after `new XMLHttpRequest`. It specifies the main parameters of the request:

- `method` -- HTTP-method. Usually `"GET"` or `"POST"`, but we can also use TRACE/DELETE/PUT and so on.
- `URL` -- the URL to request. Can use any path and protocol, but there are cross-domain limitations called "Same Origin Policy". We can make any requests to the same `protocol://domain:port` that the current page comes from, but other locations are "forbidden" by default (unless they implement special HTTP-headers, we'll cover them in chapter [todo]).
- `async` -- if the third parameter is explicitly set to `false`, then the request is synchronous, otherwise it's asynchronous. We'll talk more about that in this chapter soon.
- `user`, `password` -- login and password for basic HTTP auth (if required).

Please note that `open` call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of `send`.

## Send it out: "send"

The syntax:
```js
xhr.send([body])
```

This method opens the connection and sends the request to server. The optional `body` parameter contains the request body. Some request methods like `GET` do not have a body. And some of them like `POST` use `body` to send the data. We'll see examples with a body in the next chapter.


## Cancel: abort and timeout

If we changed our mind, we can terminate the request at any time. The call to `xhr.abort()` does that:

```js
xhr.abort(); // terminate the request
```

We can also specify a timeout using the corresponding property:

```js
xhr.timeout = 10000;
```

The timeout is expressed in ms. If the request does not succeed within the given time, it gets canceled automatically.

## Events: onload, onerror etc

A request is asynchronous by default. In other words, the browser sends it out and allows other JavaScript code to execute.

After the request is sent, `xhr` starts to generate events. We can use `addEventListener` or `on<event>` properties to handle them, just like with DOM objects.

The modern [specification](https://xhr.spec.whatwg.org/#events) lists following events:

- `loadstart` -- the request has started.
- `progress` -- the browser received a data packet (can happen multiple times).
- `abort` -- the request was aborted by `xhr.abort()`.
- `error` -- an network error has occured, the request failed.
- `load` -- the request is successful, no errors.
- `timeout` -- the request was canceled due to timeout (if the timeout is set).
- `loadend` -- the request is done (with an error or without it)
- `readystatechange` -- the request state is changed (will cover later).

Using these events we can track successful loading (`onload`), errors (`onerror`) and the amount of the data loaded (`onprogress`).

Please note that errors here are "communication errors". In other words, if the connection is lost or the remote server does not respond at all -- then it's the error in the terms of XMLHttpRequest. Bad HTTP status like 500 or 404 are not considered errors.

Here's a more feature-full example, with errors and a timeout:

```html run
<script>
  function load(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.timeout = 1000;
    xhr.send();

    xhr.onload = function() {
      alert(`Loaded: ${this.status} ${this.responseText}`);
    };

    xhr.onerror = () => alert('Error');

    xhr.ontimeout = () => alert('Timeout!');
  }
</script>

<button onclick="load('/article/xmlhttprequest/hello.txt')">Load</button>
<button onclick="load('/article/xmlhttprequest/hello.txt?speed=0')">Load with timeout</button>
<button onclick="load('no-such-page')">Load 404</button>
<button onclick="load('http://example.com')">Load another domain</button>
```

1. The first button triggers only `onload` as it loads the file `hello.txt` normally.
2. The second button loads a very slow URL, so it calls only `ontimeout` (because `xhr.timeout` is set).
3. The third button loads a non-existant URL, but it also calls `onload` (with "Loaded: 404"), because there's no network error.
4. The last button tries to load a page from another domain. That's prohibited unless the remote server explicitly agrees by sending certain headers (to be covered later), so we have `onerror` here. The `onerror` handler would also trigger in other cases if we start a request, and then sever the network connection of our device.

## Response: status, responseText and others

Once the server has responded, we can receive the result in the following properties of the request object:

`status`
: HTTP status code: `200`, `404`, `403` and so on. Also can be `0` if an error occured.

`statusText`
: HTTP status message: usually `OK` for `200`, `Not Found` for `404`, `Forbidden` for `403` and so on.

`responseText`
: The text of the server response,

Есть и ещё одно свойство, которое используется гораздо реже:

`responseXML`
: Если сервер вернул XML, снабдив его правильным заголовком `Content-type: text/xml`, то браузер создаст из него XML-документ. По нему можно будет делать запросы `xhr.responseXml.querySelector("...")` и другие.

    Оно используется редко, так как обычно используют не XML, а JSON. То есть, сервер возвращает JSON в виде текста, который браузер превращает в объект вызовом `JSON.parse(xhr.responseText)`.

## Синхронные и асинхронные запросы

Если в методе `open` установить параметр `async` равным `false`, то запрос будет синхронным.

Синхронные вызовы используются чрезвычайно редко, так как блокируют взаимодействие со страницей до окончания загрузки. Посетитель не может даже прокручивать её. Никакой JavaScript не может быть выполнен, пока синхронный вызов не завершён -- в общем, в точности те же ограничения как `alert`.

```js
// Синхронный запрос
xhr.open('GET', 'phones.json', *!*false*/!*);

// Отсылаем его
xhr.send();
*!*
// ...весь JavaScript "подвиснет", пока запрос не завершится
*/!*
```

Если синхронный вызов занял слишком много времени, то браузер предложит закрыть "зависшую" страницу.

Из-за такой блокировки получается, что нельзя отослать два запроса одновременно. Кроме того, забегая вперёд, заметим, что ряд продвинутых возможностей, таких как возможность делать запросы на другой домен и указывать таймаут, в синхронном режиме не работают.

Из всего вышесказанного уже должно быть понятно, что синхронные запросы используются чрезвычайно редко, а асинхронные -- почти всегда.

Для того, чтобы запрос стал асинхронным, укажем параметр `async` равным `true`.

Изменённый JS-код:

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', 'phones.json', *!*true*/!*);

xhr.send(); // (1)

*!*
xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4) return;
*/!*

  button.innerHTML = 'Готово!';

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    alert(xhr.responseText);
  }

}

button.innerHTML = 'Загружаю...'; // (2)
button.disabled = true;
```

Если в `open` указан третий аргумент `true` (или если третьего аргумента нет), то запрос выполняется асинхронно. Это означает, что после вызова `xhr.send()` в строке `(1)` код не "зависает", а преспокойно продолжает выполняться, выполняется строка `(2)`, а результат приходит через событие `(3)`, мы изучим его чуть позже.

Полный пример в действии:

[codetabs src="phones-async"]

# Событие readystatechange

Событие `readystatechange` происходит несколько раз в процессе отсылки и получения ответа. При этом можно посмотреть "текущее состояние запроса" в свойстве `xhr.readyState`.

В примере выше мы использовали только состояние `4` (запрос завершён), но есть и другие.

Все состояния, по [спецификации](http://www.w3.org/TR/XMLHttpRequest/#states):

```js
const unsigned short UNSENT = 0; // начальное состояние
const unsigned short OPENED = 1; // вызван open
const unsigned short HEADERS_RECEIVED = 2; // получены заголовки
const unsigned short LOADING = 3; // загружается тело (получен очередной пакет данных)
const unsigned short DONE = 4; // запрос завершён
```

Запрос проходит их в порядке `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`, состояние `3` повторяется при каждом получении очередного пакета данных по сети.

Пример ниже демонстрирует переключение между состояниями. В нём сервер отвечает на запрос `digits`, пересылая по строке из 1000 цифр раз в секунду.

[codetabs src="readystate"]

```warn header="Точка разрыва пакетов не гарантирована"
При состоянии `readyState=3` (получен очередной пакет) мы можем посмотреть текущие данные в `responseText` и, казалось бы, могли бы работать с этими данными как с "ответом на текущий момент".

Однако, технически мы не управляем разрывами между сетевыми пакетами. Если протестировать пример выше в локальной сети, то в большинстве браузеров разрывы будут каждые 1000 символов, но в реальности пакет может прерваться на любом байте.

Чем это опасно? Хотя бы тем, что символы русского языка в кодировке UTF-8 кодируются двумя байтами каждый -- и разрыв может возникнуть *между ними*.

Получится, что при очередном `readyState` в конце `responseText` будет байт-полсимвола, то есть он не будет корректной строкой -- частью ответа! Если в скрипте как-то по-особому это не обработать, то неизбежны проблемы.
```

## HTTP-заголовки

`XMLHttpRequest` умеет как указывать свои заголовки в запросе, так и читать присланные в ответ.

Для работы с HTTP-заголовками есть 3 метода:

`setRequestHeader(name, value)`
: Устанавливает заголовок `name` запроса со значением `value`.

    Например:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

```warn header="Ограничения на заголовки"
Нельзя установить заголовки, которые контролирует браузер, например `Referer` или `Host` и ряд других (полный список [тут](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method)).

Это ограничение существует в целях безопасности и для контроля корректности запроса.
```

````warn header="Поставленный заголовок нельзя снять"
Особенностью `XMLHttpRequest` является то, что отменить `setRequestHeader` невозможно.

Повторные вызовы лишь добавляют информацию к заголовку, например:

```js
xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');

// в результате будет заголовок:
// X-Auth: 123, 456
```
````

`getResponseHeader(name)`
: Возвращает значение заголовка ответа `name`, кроме `Set-Cookie` и `Set-Cookie2`.

    Например:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Возвращает все заголовки ответа, кроме `Set-Cookie` и `Set-Cookie2`.

    Заголовки возвращаются в виде единой строки, например:

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    Между заголовками стоит перевод строки в два символа `"\r\n"` (не зависит от ОС), значение заголовка отделено двоеточием с пробелом `": "`. Этот формат задан стандартом.

    Таким образом, если хочется получить объект с парами заголовок-значение, то эту строку необходимо разбить и обработать.

## Таймаут

Максимальную продолжительность асинхронного запроса можно задать свойством `timeout`:

```js
xhr.timeout = 30000; // 30 секунд (в миллисекундах)
```

При превышении этого времени запрос будет оборван и сгенерировано событие `ontimeout`:

```js
xhr.ontimeout = function() {
  alert( 'Извините, запрос превысил максимальное время' );
}
```

## Полный список событий

Современная [спецификация](http://www.w3.org/TR/XMLHttpRequest/#events) предусматривает следующие события по ходу обработки запроса:

- `loadstart` -- запрос начат.
- `progress` -- браузер получил очередной пакет данных, можно прочитать текущие полученные данные в `responseText`.
- `abort` -- запрос был отменён вызовом `xhr.abort()`.
- `error` -- произошла ошибка.
- `load` -- запрос был успешно (без ошибок) завершён.
- `timeout` -- запрос был прекращён по таймауту.
- `loadend` -- запрос был завершён (успешно или неуспешно)

Используя эти события можно более удобно отслеживать загрузку (`onload`) и ошибку (`onerror`), а также количество загруженных данных (`onprogress`).

Ранее мы видели ещё одно событие -- `readystatechange`. Оно появилось гораздо раньше, ещё до появления текущего стандарта.

В современных браузерах от него можно отказаться в пользу других, необходимо лишь, как мы увидим далее,  учесть особенности IE8-9.

## IE8,9: XDomainRequest

В IE8 и IE9 поддержка `XMLHttpRequest` ограничена:

- Не поддерживаются события, кроме `onreadystatechange`.
- Некорректно поддерживается состояние `readyState = 3`: браузер может сгенерировать его только один раз во время запроса, а не при каждом пакете данных. Кроме того, он не даёт доступ к ответу `responseText` до того, как он будет до конца получен.

Дело в том, что, когда создавались эти браузеры, спецификации были не до конца проработаны. Поэтому разработчики браузера решили добавить свой объект `XDomainRequest`, который реализовывал часть возможностей современного стандарта.

А обычный `XMLHttpRequest` решили не трогать, чтобы ненароком не сломать существующий код.

Мы подробнее поговорим про `XDomainRequest` в главе <info:xhr-crossdomain>. Пока лишь заметим, что для того, чтобы получить некоторые из современных возможностей в IE8,9 -- вместо `new XMLHttpRequest()` нужно использовать `new XDomainRequest`.

Кросс-браузерно:

```js
var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();
```

Теперь в IE8,9 поддерживаются события `onload`, `onerror` и `onprogress`. Это именно для IE8,9. Для IE10 обычный `XMLHttpRequest` уже является полноценным.

### IE9- и кеширование

Обычно ответы на запросы `XMLHttpRequest` кешируются, как и обычные страницы.

Но IE9- по умолчанию кеширует все ответы, не снабжённые антикеш-заголовком. Другие браузеры этого не делают. Чтобы этого избежать, сервер должен добавить в ответ соответствующие антикеш-заголовки, например `Cache-Control: no-cache`.

Впрочем, использовать заголовки типа `Expires`, `Last-Modified` и `Cache-Control` рекомендуется в любом случае, чтобы дать понять браузеру (не обязательно IE), что ему следует делать.

Альтернативный вариант -- добавить в URL запроса случайный параметр, предотвращающий кеширование.

Например, вместо `xhr.open('GET', 'service', false)` написать:

```js
xhr.open('GET', *!*'service?r=' + Math.random()*/!*, false);
```

По историческим причинам такой способ предотвращения кеширования можно увидеть много где, так как старые браузеры плохо обрабатывали кеширующие заголовки. Сейчас серверные заголовки поддерживаются хорошо.

## Итого

Типовой код для GET-запроса при помощи `XMLHttpRequest`:

```js
var xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url', true);

xhr.send();

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  // по окончании запроса доступны:
  // status, statusText
  // responseText, responseXML (при content-type: text/xml)

  if (this.status != 200) {
    // обработать ошибку
    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
    return;
  }

  // получить результат из this.responseText или this.responseXML
}
```

Мы разобрали следующие методы `XMLHttpRequest`:

- `open(method, url, async, user, password)`
- `send(body)`
- `abort()`
- `setRequestHeader(name, value)`
- `getResponseHeader(name)`
- `getAllResponseHeaders()`

Свойства `XMLHttpRequest`:

- `timeout`
- `responseText`
- `responseXML`
- `status`
- `statusText`

События:

- `onreadystatechange`
- `ontimeout`
- `onerror`
- `onload`
- `onprogress`
- `onabort`
- `onloadstart`
- `onloadend`
