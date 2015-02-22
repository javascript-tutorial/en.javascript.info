# XMLHttpRequest: индикация прогресса

Запрос `XMLHttpRequest` состоит из двух фаз:
<ol>
<li>На первой фазе данные загружаются на сервер. Эта фаза может быть долгой для POST-запросов.</li>
<li>После того, как данные загружены, браузер скачивает ответ с сервера. Если он большой, то это может занять существенное время.</li>
</ol>

Для каждой стадии предусмотрены события, "рассказывающие" о процессе выполнения.
[cut]
## XMLHttpRequestUpload

На стадии загрузки обработчики нужно ставить на объект `xhr.upload`. Например:

```js
xhr.upload.onprogress = function(event) {
  alert('Загружено ' + event.loaded + ' байт из '+ event.total);
}

xhr.upload.onload = function() {
  alert('Данные полностью загружены на сервер!');
}
```

Объект `xhr.upload` ничего не делает, у него нет методов, он предназначен исключительно для обработки событий при загрузке.

После того, как загрузка завершена, будет начато скачивание ответа.

**Обработчик `xhr.onprogress` даёт прогресс на фазе скачивания, а за ней наступает фаза закачки, для которой работает xhr.upload.onprogress.** 

## Загрузка файла с индикатором прогресса

Современный `XMLHttpRequest` позволяет отправить на сервер всё, что угодно. Текст, файл, форму.

Мы, для примера, рассмотрим загрузку файла с индикацией прогресса. Это требует от браузера поддержки [File API](http://www.w3.org/TR/FileAPI/), то есть исключает IE9-.

File API позволяет получить доступ к содержимому файла, который перенесён в браузер при помощи Drag'n'Drop или выбран в поле формы.

Форма для выбора файла:

```html
<form name="upload">
	<input type="file" name="file1">
	<input type="submit" value="Загрузить">
</form>
```

Обработчик на её `submit`:

```js
var form = document.forms.upload;
form.onsubmit = function() {
  var file = this.elements.file1.files[0];	
  if (file) *!*upload(file, onSuccess, onError, onProgress)*/!*;	
  return false;
}
```

Все, больше нам здесь File API не нужно. Мы получили файл из формы и отправляем его:

```js
function upload(file, onSuccess, onError, onProgress) {

  var xhr = new XMLHttpRequest();

  xhr.onload = xhr.onerror = function() {
    if(this.status != 200 || this.responseText != 'OK') {
      onError(this);
      return;
    }
    onSuccess();
  };

*!*
  xhr.upload.onprogress = function(event) { 
    onProgress(event.loaded, event.total);
  }
*/!*

  xhr.open("POST", "upload.php", true); 
  xhr.send(file);

}
```

## Демо

Полный пример, основанный на коде выше, в котором функции `onSuccess`, `onError`, `onProgress` выводят результат на экран:

[iframe border=1 src="progress" link zip]

## Событие onprogress в деталях

Событие `onprogress` имеет одинаковый вид при закачке на сервер (`xhr.upload.onprogress`) и при получении ответа (`xhr.onprogress`).

Оно получает объект `event` типа [ProgressEvent](http://www.w3.org/TR/progress-events/) со свойствами:

<dl>
<dt>`loaded`</dt>
<dd>Сколько байт загружено. 

Имеется в виду только тело запроса, заголовки не учитываются.</dd>
<dt>`lengthComputable`</dt>
<dd>Если `true`, то известна полное количество байт и оно хранится в свойстве `total`.
</dd>
<dd>`total`</dd>
<dd>Общее количество байт для загрузки, если известно.

При HTTP-запросах оно передаётся в заголовке `Content-Length`. 
<ul>
<li>При закачке на сервер браузер всегда точно знает размер пересылаемого фрагмента, поэтому отправляет этот заголовок и учитывает его в `xhr.upload.onprogress`.</li>
<li>При скачивании данных -- уже задача сервера поставить этот заголовок, если конечно это возможно.</li>
</ul>
</dd>
</dl>

Ещё особенности, которые необходимо учитывать при использовании `onprogress`:

<ul>
<li>**Событие происходит при каждом полученном/отправленном байте, но не чаще чем раз в 50мс.**

Это обозначено в [спецификации progress notifications](http://www.w3.org/TR/XMLHttpRequest/#make-progress-notifications).
</li>
<li>**При получении данных доступен `xhr.responseText`.**

Можно заглянуть в него и прочитать текущие, неоконченные данные. Они будут оборваны на каком-то символе, на каком именно -- предсказать сложно, это зависит от сети.</li>
<li>**При посылке данных не гарантируется обработка загрузки сервером.**

Событие `xhr.upload.onprogress` срабатывает, когда данные отправлены браузером. Но оно не гарантирует, что сервер получил, обработал и записал данные на диск. 

Поэтому прогресс-индикатор, получаемый при его помощи, носит приблизительный и оптимистичный характер.</li>
</ul>





## Серверная часть: файлы и формы

При вызове `xhr.send(file)`, файл пересылается в теле запроса, как будто отправлен через форму.

Если нужно дополнительно передать имя файла или что-то ещё -- это можно сделать в заголовках, через `xhr.setRequestHeader`. И, конечно же, серверный фреймворк должен понимать, как это обработать.

А что, если серверный фреймворк умеет нормально работать только с обычными формами, а как-то модифицировать его ну совсем нет желания и времени? 

Нам поможет объект [FormData](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/FormData/Using_FormData_Objects):

```js
var formData = new FormData();
formData.append("file", file);
xhr.send(formData);
```

Данные будут отправлены в кодировке `multipart/form-data`. Серверный фреймворк обработает это как обычную форму. 



[head]
<script src="/files/tutorial/ajax/script/scriptRequest.js"></script>
[/head]