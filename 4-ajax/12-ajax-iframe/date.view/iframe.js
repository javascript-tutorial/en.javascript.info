function createIframe(name, src, debug) {
  src = src || 'javascript:false'; // пустой src

  var tmpElem = document.createElement('div');

  // в старых IE нельзя присвоить name после создания iframe, поэтому создаём через innerHTML
  tmpElem.innerHTML = '<iframe name="' + name + '" id="' + name + '" src="' + src + '">';
  var iframe = tmpElem.firstChild;

  if (!debug) {
    iframe.style.display = 'none';
  }

  document.body.appendChild(iframe);

  return iframe;
}

// функция постит объект-хэш content в виде формы с нужным url , target
// напр. postToIframe('/count.php', {a:5,b:6}, 'frame1')

function postToIframe(url, data, target) {
  var phonyForm = document.getElementById('phonyForm');
  if (!phonyForm) {
    // временную форму создаем, если нет
    phonyForm = document.createElement("form");
    phonyForm.id = 'phonyForm';
    phonyForm.style.display = "none";
    phonyForm.method = "POST";
    phonyForm.enctype = "multipart/form-data";
    document.body.appendChild(phonyForm);
  }

  phonyForm.action = url;
  phonyForm.target = target;

  // заполнить форму данными из объекта
  var html = [];
  for (var key in data) {
    var value = String(data[key]).replace(/"/g, "&quot;");
    html.push("<input type='hidden' name=\"" + key + "\" value=\"" + value + "\">");
  }
  phonyForm.innerHTML = html.join('');

  phonyForm.submit();
}


var CallbackRegistry = {}; // реестр

function iframeGet(url, onSuccess, onError) {

  var iframeOk = false; // флаг успешного ответа сервера

  var iframeName = Math.random(); // случайное имя для ифрейма
  var iframe = createIframe(iframeName, url);

  CallbackRegistry[iframeName] = function(data) {
    iframeOk = true; // сервер ответил успешно
    onSuccess(data);
  }

  iframe.onload = function() {
    iframe.parentNode.removeChild(iframe); // очистка
    delete CallbackRegistry[iframeName];
    if (!iframeOk) onError(); // если сервер не ответил как надо - что-то не так
  }

}

// аналогично iframeGet, но в postToIframe передаются данные data
function iframePost(url, data, onSuccess, onError) {

  var iframeOk = false;

  var iframeName = Math.random();
  var iframe = createIframe(iframeName);

  CallbackRegistry[iframeName] = function(data) {
    iframeOk = true;
    onSuccess(data);
  }

  iframe.onload = function() {
    iframe.parentNode.removeChild(iframe); // очистка
    delete CallbackRegistry[iframeName];

    if (!iframeOk) onError(); // если коллбэк не вызвался - что-то не так
  }

  postToIframe(url, data, iframeName);
}