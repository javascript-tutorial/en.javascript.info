var CallbackRegistry = {}; // реестр

function iframeGet(url, onSuccess, onError) {

  var iframeOk = false;

  var iframeName = Math.random();
  var iframe = createIframe(iframeName, url);
  
  CallbackRegistry[iframeName] = function(data) {
      iframeOk = true;  
    onSuccess(data);
  }

  function iframeOnLoad() { // onload всегда после обработки скриптов в ифрейме
    iframe.parentNode.removeChild(iframe); // очистка
    delete CallbackRegistry[iframeName];   
    if (!iframeOk) onError(); // если коллбэк не вызвался - что-то не так
  }
  iframe.onload = function() { // перенести onload на "после postMessage"
    setTimeout(iframeOnLoad, 0);
  };

}

window.onmessage = function(event) {
  var message = JSON.parse(event.data);
  CallbackRegistry[message.name](message.body);
}
