var CallbackRegistry = {}; // реестр

function iframeGet(url, onSuccess, onError) {

  var iframeOk = false; // флаг успешного ответа сервера

  var iframeName = Math.random(); // случайное имя для ифрейма
  var iframe = createIframe(iframeName, url); 
  
  CallbackRegistry[iframeName] = function(data) {
    iframeOk = true;  // сервер ответил успешно
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

