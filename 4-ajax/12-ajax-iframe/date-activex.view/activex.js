var CallbackRegistry = {}; // реестр

function iframeActiveXGet(url, onSuccess, onError) {

  var iframeOk = false;

  var iframeName = Math.random();
  var iframe = createActiveXFrame(iframeName, url);

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


function createActiveXFrame(name, src) {
  var htmlfile = window.htmlfile;
  if (!htmlfile) {
    htmlfile = window.htmlfile = new ActiveXObject("htmlfile");
    htmlfile.open();
    htmlfile.write("<html><body></body></html>");
    htmlfile.close();
    htmlfile.parentWindow.CallbackRegistry = CallbackRegistry;
  }

  src = src || 'javascript:false'; // пустой src  
  htmlfile.body.insertAdjacentHTML('beforeEnd', "<iframe name='" + name + "' src='" + src + "'></iframe>");
  return htmlfile.body.lastChild; // window in .document.parentWindow
}