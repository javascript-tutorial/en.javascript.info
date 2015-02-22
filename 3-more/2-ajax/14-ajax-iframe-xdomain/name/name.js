
function iframePost(url, data, onSuccess, onError) {

  var iframeName = Math.random();
  var iframe = createIframe(iframeName);  

  // onload после append, чтобы не срабатывал лишний раз
  iframe.onload = function() {  
  
    var newName = iframe.contentWindow.name;

    if (newName == iframeName) {
      // имя получили, но оно осталось тем же - значит сервер его не заменил
      // значит что-то не так в ответе (ошибка сервера или неверный формат)
      onError();
      return;
    }

    // имя получено, коммуникация завершена
    iframe.parentNode.removeChild(iframe); // очистка

    // такой eval можно использовать вместо JSON.parse для старых IE, 
    // при условии доверия содержимому к newName
    // если доверия нет -- используйте библиотеку json2.js
    onSuccess( eval('(' + newName +')') ); 
  };

  // для IE8- нужно использовать attachEvent вместо iframe.onload 
  if (iframe.attachEvent && !iframe.addEventListener) {
    iframe.attachEvent("onload", iframe.onload);
    iframe.onload = null;
  }

  postToIframe(url, data, iframeName);
}

