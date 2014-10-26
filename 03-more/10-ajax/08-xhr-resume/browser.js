function Uploader(file, onSuccess, onError, onProgress) {
  
  // идентификатор загрузки, чтобы стыковать два потока
  var uploadId = Math.random();

  var xhrUpload;
  var xhrStatus;

  function upload() {
    runUpload();
    trackStatus();
  }

  // *!* Закачка: поток НА сервер */!*
  function runUpload() {
    xhrUpload = new XMLHttpRequest();
    xhrUpload.onload = xhrUpload.onerror = function() {
      xhrStatus.abort();
      if (this.status != 200) {
        onError("Upload error " + this.statusText);
      } else {
	onSuccess(); // не ждем xhrStatus, сервер не обязан хранить статус после завершения upload
      }
     
    };
    xhrUpload.open("POST", "upload", true); 
    xhrUpload.setRequestHeader('X-Upload-Id', uploadId);
    xhrUpload.send(file);
  }

  // *!* Получать статус: поток С сервера */!*  
  function trackStatus() {
    xhrStatus = new XMLHttpRequest(); 
    xhrStatus.onprogress = function() {
      onProgress( getLastProgress(xhrStatus.responseText), file.size );
    }

    xhrStatus.onerror = function() {
      onError("Upload status error " + this.statusText);
      xhrUpload.abort();    
    }

    xhrStatus.open("POST", "status-stream", true); 
    xhrStatus.setRequestHeader('X-Upload-Id', uploadId);
    xhrStatus.send('');
  }

  // *!* Функция для чтения количества байт из статуса сервера 12-345-... */!*
  function getLastProgress(response) {
    // читаем число между последним и предпоследним знаком -
    var lastDelimiter = response.lastIndexOf('-');
    if (lastDelimiter < 0) return 0;

    var prevDelimiter = response.lastIndexOf('-', lastDelimiter - 1);
    return response.slice(prevDelimiter+1, lastDelimiter);
  }

  // внешний интерфейс
  this.upload = upload;

}
