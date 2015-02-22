
if (!window.EventSource) {
  document.write('<b>В этом браузере нет поддержки EventSource.</b>');
} 

var eventSource;

function start() { // при нажатии на Старт
  eventSource = new EventSource('digits');

  var log = document.getElementById('log');

  eventSource.onopen = function(e) {
    log.innerHTML += "Соединение открыто<br>";
  };

  eventSource.onerror = function(e) {
    if (this.readyState == EventSource.CONNECTING) {      
      log.innerHTML += "Соединение порвалось, пересоединяемся...<br>";
    } else {
      log.innerHTML += "Ошибка, состояние: " + this.readyState;
    }
  };

  eventSource.addEventListener('bye', function(e) {
    log.innerHTML += "Bye<br>";
  }, false);

  eventSource.onmessage = function(e) {
    log.innerHTML += e.data + '<br>';
  };
}

function stop() { // при нажатии на Стоп
  eventSource.close();
}