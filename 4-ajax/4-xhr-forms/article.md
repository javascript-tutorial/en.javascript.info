# XMLHttpRequest POST, формы и кодировка

Во время обычной отправки формы `<form>` браузер собирает значения её полей, делает из них строку и составляет тело GET/POST-запроса для посылки на сервер. 

При отправке данных через `XMLHttpRequest`, это нужно делать самим, в JS-коде. Большинство проблем и вопросов здесь связано с непониманием, где и какое кодирование нужно осуществлять.

[cut]

## Кодировка urlencoded

Основной способ кодировки запросов -- это *urlencoded*, то есть -- стандартное кодирование URL. 

Например, форма:

```html
<form action="/submit" method="GET"> 
  <input name="*!*name*/!*" value="*!*Ivan*/!*">
  <input name="*!*surname*/!*" value="*!*Ivanov*/!*">
</form>
```

Здесь есть два поля: `name=Ivan` и `surname=Ivanov`. 

Браузер перечисляет такие пары "имя=значение" через символ амперсанда `&` и, так как метод GET, итоговый запрос выглядит как `/submit?name=Ivan&surname=Ivanov`.

Все символы, кроме английских букв, цифр и `- _ . ! ~ * ' ( )` заменяются на их цифровой код в UTF-8 со знаком %.

Например, пробел заменяется на `%20`, символ `/` на `%2F`, русские буквы кодируются двумя байтами в UTF-8, поэтому, к примеру, `Ц` заменится на `%D0%A6`.

Например, форма:

```html
<form action="/submit" method="GET"> 
  <input name="*!*name*/!*" value="*!*Виктор*/!*">
  <input name="*!*surname*/!*" value="*!*Цой*/!*">
</form>
```

Будет отправлена так: `/submit?name=%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80&surname=%D0%A6%D0%BE%D0%B9`.

в JavaScript есть функция [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) для получения такой кодировки "вручную":

```js
//+ run
alert( encodeURIComponent(' ') ); // %20 
alert( encodeURIComponent('/') ); // %2F
alert( encodeURIComponent('В') ); // %D0%92
alert( encodeURIComponent('Виктор') ); // %D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80
```

Эта кодировка используется в основном для метода GET, то есть для передачи параметра в строке запроса. По стандарту строка запроса не может содержать произвольные Unicode-символы, поэтому они кодируются как показано выше.

## GET-запрос 

Формируя XMLHttpRequest, мы должны формировать запрос "руками", кодируя поля функцией `encodeURIComponent`.

Например, для посылки GET-запроса с параметрами `name` и `surname`, аналогично форме выше, их необходимо закодировать так:

```js
// Передаём name и surname в параметрах запроса

var xhr = new XMLHttpRequest();

var params = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("GET", '/submit?' + params, true);

xhr.onreadystatechange = ...;

xhr.send();
```

[smart header="Прочие заголовки"]
Браузер автоматически добавит к запросу важнейшие HTTP-заголовки, такие как `Content-Length` и `Connection`.

По спецификации браузер запрещает их явную установку, как и некоторых других низкоуровневых HTTP-заголовков, которые могли бы ввести в заблуждение сервер относительно того, кто и сколько данных ему прислал, например `Referer`. Это сделано в целях контроля правильности запроса и для безопасности. 
[/smart]

[smart header="Сообщаем про AJAX"]
Запрос, отправленный кодом выше через `XMLHttpRequest`, никак не отличается от обычной отправки формы. Сервер не в состоянии их отличить.

Поэтому в некоторых фреймворках, чтобы сказать серверу, что это AJAX, добавляют специальный заголовок, например такой:

```js
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
```
[/smart]

## POST с urlencoded 

В методе POST параметры передаются не в URL, а в теле запроса. Оно указывается в вызове `send(body)`. 

В стандартных HTTP-формах для метода POST доступны [три кодировки](https://html.spec.whatwg.org/multipage/forms.html#submit-body), задаваемые через атрибут `enctype`:
<ul>
<li>`application/x-www-form-urlencoded`</li>
<li>`multipart/form-data`</li>
<li>`text-plain`</li>
</ul>

В зависимости от `enctype` браузер кодирует данные соответствующим способом перед отправкой на сервер.

В случае с `XMLHttpRequest` мы, вообще говоря, не обязаны использовать ни один из этих способов. Главное, чтобы сервер наш запрос понял. Но обычно проще всего выбрать какой-то из стандартных.

В частности, при POST обязателен заголовок `Content-Type`, содержащий кодировку. Это указание для сервера -- как обрабатывать (раскодировать) пришедший запрос.

Для примера отправим запрос в кодировке `application/x-www-form-urlencoded`:

```js
var xhr = new XMLHttpRequest();

var body = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("POST", '/submit', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

xhr.onreadystatechange = ...;

xhr.send(body);
```

[warn header="Только UTF-8"]
Всегда используется только кодировка UTF-8, независимо от языка и кодировки страницы.

Если сервер вдруг ожидает данные в другой кодировке, к примеру windows-1251, то их нужно будет перекодировать.
[/warn]

## Кодировка multipart/form-data

Кодировка urlencoded за счёт замены символов на `%код` может сильно "раздуть" общий объём пересылаемых данных. Поэтому для пересылки файлов используется другая кодировка: [multipart/form-data](http://ru.wikipedia.org/wiki/Multipart_form-data). 

В этой кодировке поля пересылаются одно за другим, через строку-разделитель.

Чтобы использовать этот способ, нужно указат его в атрибуте `enctype` и метод должен быть POST:

```html
<form action="/submit" method="POST" enctype="multipart/form-data"> 
  <input name="*!*name*/!*" value="*!*Виктор*/!*">
  <input name="*!*surname*/!*" value="*!*Цой*/!*">
</form>
```

Форма при такой кодировке будет выглядеть примерно так:

```
...Заголовки...
Content-Type: *!*multipart/form-data; boundary=RaNdOmDeLiMiTeR*/!*

--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="*!*name*/!*"

*!*Виктор*/!*
--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="*!*surname*/!*"

*!*Цой*/!*
--RaNdOmDeLiMiTeR--
```

...То есть, поля передаются одно за другим, значения не кодируются, а чтобы было чётко понятно, какое значение где -- поля разделены случайно сгенерированной строкой, которую называют "boundary" (англ. граница), в примере выше это `RaNdOmDeLiMiTeR`:

Сервер видит заголовок `Content-Type: multipart/form-data`, читает из него границу и раскодирует поля формы.

Такой способ используется в первую очередь при пересылке файлов, так перекодировка мегабайтов через urlencoded существенно загрузила бы браузер. Да и объём данных после неё сильно вырос бы. 

Однако, никто не мешает использовать эту кодировку всегда для POST запросов. Для GET доступна только urlencoded.

## POST с multipart/form-data

Сделать POST-запрос в кодировке `multipart/form-data` можно и через XMLHttpRequest.

Достаточно указать в заголовке `Content-Type` кодировку и границу, и далее сформировать тело запроса, удовлетворяющее требованиям кодировки.

Пример кода для пересылке того же запроса, что и раньше, в кодировке `multipart/form-data`:

```js
var data = {
  name: 'Виктор',
  surname: 'Цой'
};

var boundary = String(Math.random()).slice(2);
var boundaryMiddle = '--' + boundary + '\r\n';
var boundaryLast = '--' + boundary + '--\r\n'

var body = ['\r\n'];
for (var key in data) {
  // добавление поля
  body.push('Content-Disposition: form-data; name="'+key+'"\r\n\r\n'+data[key]+'\r\n');
}

body = body.join(boundaryMiddle) + boundaryLast;

// Тело запроса готово, отправляем

var xhr = new XMLHttpRequest();
xhr.open('POST', '/submit', true);

xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  alert(this.responseText);
}

xhr.send(body);
```

Тело запроса будет иметь вид, описанный выше, то есть поля через разделитель. 

[smart header="Отправка файла"]
Можно создать запрос, который сервер воспримет как загрузку файла. 

Для добавления файла нужно использовать тот же код, что выше, модифицировав заголовки перед полем, которое является файлом, так:

```js
Content-Disposition: form-data; name="myfile"; filename="pic.jpg"
Content-Type: image/jpeg
(пустая строка)
содержимое файла
```
[/smart]

## FormData

Современные браузеры, исключая IE9- (впрочем, есть полифилл), поддерживают встроенный объект [FormData](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/FormData/Using_FormData_Objects), который кодирует формы для отправки на сервер.

Это очень удобно. Например:

```html
<form name="person"> 
  <input name="name" value="Виктор">
  <input name="surname" value="Цой">
</form>

<script>
// создать объект для формы
*!*
var formData = new FormData(document.forms.person);  
*/!*

// добавить к пересылке ещё пару ключ - значение
formData.append("patronym", "Робертович");

// отослать
var xhr = new XMLHttpRequest();
xhr.open("POST", "/url");
*!*
xhr.send(formData);
*/!*
</script>
```

Этот код отправит на сервер форму с полями `name`, `surname` и `patronym`.

Интерфейс:
<ul>
<li>Конструктор `new FormData([form])` вызывается либо без аргументов, либо с DOM-элементом формы. </li>
<li>Метод `formData.append(name, value)` добавляет данные к форме.</li>
</ul>

Объект `formData` можно сразу отсылать, интеграция `FormData` с `XMLHttpRequest` встроена в браузер. Кодировка при этом будет `multipart/form-data`.

## Другие кодировки

XMLHttpRequest сам по себе не ограничивает кодировку и формат пересылаемых данных.

Поэтому просто для обмена данными JS <-> сервер, без всяких форма, часто используется POST с JSON:

```js
var xhr = new XMLHttpRequest();

var json = JSON.stringify({
  name: "Виктор",
  surname: "Цой"
});

xhr.open("POST", '/submit', true)
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

xhr.onreadystatechange = ...;

xhr.send(json);
```

## Итого

<ul>
<li>У форм есть две основные кодировки: `application/x-www-form-urlencoded` -- по умолчанию и `multipart/form-data` -- для POST запросов, если явно указана в `enctype`. Вторая кодировка обычно используется для больших данных и только для тела запроса.</li>
<li>Для составления запроса в `application/x-www-form-urlencoded` используется функция `encodeURIComponent`.</li>
<li>Для отправки запроса в `multipart/form-data` -- объект `FormData`.</li>
<li>Для обмена данными JS <-> сервер можно использовать и просто JSON, желательно с указанием кодировки в заголовке `Content-Type`.</li>
</ul>

В XMLHttpRequest можно использовать и другие HTTP-методы, например PUT, DELETE, TRACE. К ним применимы все те же принципы, что описаны выше.
