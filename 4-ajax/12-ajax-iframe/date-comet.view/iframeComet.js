var IframeComet = new function() {
  var self = this;

  var connectTries = 0,
    reconnectTimer;
  var htmlfile; // for ie only
  var iframe;

  this.onConnected = function() {
    connectTries = 0;
    clearTimeout(reconnectTimer);
  };

  this.onMessage = function(message) { /* ... */ };

  this.onError = function(err) { /* ... */ };

  this.open = function(url) {
    connectTries++;

    if (connectTries > 3) {
      self.onError("Unable to connect");
    }

    if ("ActiveXObject" in window) { // IE
      createActiveXFrame(url);
    } else {
      createIframe(url);
    }

    reconnectTimer = setTimeout(function() {
      if (!self.isConnected()) {
        self.open(url);
      }
    }, connectTries * 2000);

    // в Chrome не срабатывает при обрыве соединения,
    // так что используем там другой =) транспорт
    iframe.onload = function() {
      self.open(url);
    };

  };

  this.isConnected = function() {
    return connectTries == 0; // onConnect обнуляет connectTries
  }

  function cleanIframe() {
    if (iframe) {
      iframe.src = "javascript:false";
      iframe.parentNode.removeChild(iframe); // очистка
    }
  }

  function createIframe(src) {
    cleanIframe();

    iframe = document.createElement('iframe');
    iframe.src = src || 'javascript:false';
    iframe.style.display = 'none';

    document.body.appendChild(iframe);
  }


  function createActiveXFrame(src) {
    cleanIframe();

    if (!htmlfile) {
      htmlfile = new ActiveXObject("htmlfile");
      htmlfile.open();
      htmlfile.write("<html><body></body></html>");
      htmlfile.close();
      htmlfile.parentWindow.IframeComet = self;
    }

    src = src || 'javascript:false'; // пустой src  
    htmlfile.body.insertAdjacentHTML('beforeEnd', "<iframe src='" + src + "'></iframe>");
    iframe = htmlfile.body.lastChild; // window in .document.parentWindow
  }

}