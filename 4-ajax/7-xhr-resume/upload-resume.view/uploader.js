function Uploader(file, onSuccess, onFail, onProgress) {

  // fileId уникальным образом идентифицирует файл
  // можно добавить идентификатор сессии посетителя, но он и так будет в заголовках
  var fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;

  // сделать из fileId число (хеш, алгоритм неважен), мы будем передавать его в заголовке,
  // в заголовках разрешены только ASCII-символы
  fileId = hashCode(fileId);

  var errorCount = 0;

  // если количество ошибок подряд превысит MAX_ERROR_COUNT, то стоп
  var MAX_ERROR_COUNT = 6;

  var startByte = 0;

  var xhrUpload;
  var xhrStatus;

  function upload() {
    console.log("upload: check status");
    xhrStatus = new XMLHttpRequest();

    xhrStatus.onload = xhrStatus.onerror = function() {

      if (this.status == 200) {
        startByte = +this.responseText || 0;
        console.log("upload: startByte=" + startByte);
        send();
        return;
      }

      // что-то не так
      if (errorCount++ < MAX_ERROR_COUNT) {
        setTimeout(upload, 1000 * errorCount); // через 1 сек пробуем ещё раз
      } else {
        onError(this.statusText);
      }

    };

    xhrStatus.open("GET", "status", true);
    xhrStatus.setRequestHeader('X-File-Id', fileId);
    xhrStatus.send();
  }


  function send() {

    xhrUpload = new XMLHttpRequest();
    xhrUpload.onload = xhrUpload.onerror = function() {
      console.log("upload end status:" + this.status + " text:" + this.statusText);

      if (this.status == 200) {
        // успешное завершение загрузки
        onSuccess();
        return;
      }

      // что-то не так
      if (errorCount++ < MAX_ERROR_COUNT) {
        setTimeout(resume, 1000 * errorCount); // через 1,2,4,8,16 сек пробуем ещё раз
      } else {
        onError(this.statusText);
      }
    };

    xhrUpload.open("POST", "upload", true);
    // какой файл догружаем /загружаем
    xhrUpload.setRequestHeader('X-File-Id', fileId);

    xhrUpload.upload.onprogress = function(e) {
      errorCount = 0;
      onProgress(startByte + e.loaded, startByte + e.total);
    }

    // отослать, начиная с байта startByte
    xhrUpload.send(file.slice(startByte));
  }

  function pause() {
    xhrStatus && xhrStatus.abort();
    xhrUpload && xhrUpload.abort();
  }


  this.upload = upload;
  this.pause = pause;
}

// вспомогательная функция: получение 32-битного числа из строки

function hashCode(str) {
  if (str.length == 0) return 0;

  var hash = 0,
    i, chr, len;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};