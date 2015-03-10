if (!window.setImmediate) window.setImmediate = (function() {
  var head = {},
    tail = head; // очередь вызовов, 1-связный список

  var ID = Math.random(); // уникальный идентификатор

  function onmessage(e) {
    if (e.data != ID) return; // не наше сообщение
    head = head.next;
    var func = head.func;
    delete head.func;
    func();
  }

  if (window.addEventListener) { // IE9+, другие браузеры
    window.addEventListener('message', onmessage);
  } else { // IE8
    window.attachEvent('onmessage', onmessage);
  }

  return function(func) {
    tail = tail.next = {
      func: func
    };
    window.postMessage(ID, "*");
  };
}());