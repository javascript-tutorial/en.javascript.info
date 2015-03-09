function Uploader(file, onSuccess, onError, onProgress) {

  // идентификатор загрузки, чтобы стыковать два потока
  var fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
  fileId = hashCode(fileId);

  var xhrUpload;
  var xhrStatus;

  // *!* Закачка: поток НА сервер */!*
  function runUpload(startByte) {
    console.log("run upload from ", startByte);
    xhrUpload = new XMLHttpRequest();
    xhrUpload.onload = xhrUpload.onerror = function() {
      xhrStatus.abort(); // остановить отслеживание прогресса по завершении загрузки
      if (this.status != 200) {
        onError("Upload error " + this.statusText);
      } else {
        onSuccess();
      }

    };
    xhrUpload.open("POST", "upload", true);
    xhrUpload.setRequestHeader('X-File-Id', fileId);
    xhrUpload.send(file.slice(startByte));
  }

  // *!* Получать статус: поток С сервера */!*  
  function upload() {
    xhrStatus = new XMLHttpRequest();
    xhrStatus.onreadystatechange = function(e) {
      console.log(this);
    }

    xhrStatus.onprogress = function() {
      var lastByte = getLastProgress(xhrStatus.responseText);
      console.log("lastByte", lastByte);
      if (!xhrUpload) {
        runUpload(lastByte + 1);
      }
      onProgress(lastByte, file.size);
    }

    xhrStatus.onerror = function() {
      onError("Upload status error " + this.statusText);
      xhrUpload.abort();
    }

    xhrStatus.open("POST", "status-stream", true);
    xhrStatus.setRequestHeader('X-File-Id', fileId);
    xhrStatus.send();
  }

  // *!* Функция для чтения количества байт из статуса сервера 12-345-... */!*
  function getLastProgress(response) {
    // читаем число между последним и предпоследним знаком -
    var lastDelimiter = response.lastIndexOf('-');
    if (lastDelimiter < 0) return 0;

    var prevDelimiter = response.lastIndexOf('-', lastDelimiter - 1);
    return response.slice(prevDelimiter + 1, lastDelimiter);
  }

  // внешний интерфейс
  this.upload = upload;

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