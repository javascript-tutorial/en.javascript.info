function Uploader(file, onSuccess, onFail, onProgress) {

  // fileId уникальным образом идентифицирует файл
  // можно добавить идентификатор сессии посетителя, но он и так будет в заголовках
  // использование: можно добавить в localstorage состояние загрузки по этому ключу
  var fileId = file.name + '-' + file.size + '-' + (+file.lastModifiedDate);

  // uploadId уникальным образом идентифицирует попытку загрузки
  var uploadId = Math.random();
  var errorCount = 0; 
  var MAX_ERROR_COUNT = 6; // максимальное количество ошибок, между которыми нет успешной загрузки
  var startByte = 0;

  var xhrUpload;
  var xhrStatus;

  function resume() {
    //console.log("resume: check status");
    xhrStatus = new XMLHttpRequest();

    xhrStatus.onload = xhrStatus.onerror = function() {
      if (this.status == 200) {
        startByte = +this.responseText || 0;
        //console.log("resume: startByte=" + startByte);
        upload();
        return;
      }

      // что-то не так
      if (errorCount++ < MAX_ERROR_COUNT) {
        setTimeout(resume, 1000); // через 1 сек пробуем ещё раз
      } else {
        onError(this.statusText);  
      }  
    };

    xhrStatus.open("GET", "status", true); 
    xhrStatus.setRequestHeader('X-Upload-Id', uploadId);
    xhrStatus.send('');
  }


  function upload() {
    
    xhrUpload = new XMLHttpRequest();
    xhrUpload.onload = xhrUpload.onerror = function() {
      //console.log("upload end status:" + this.status + " text:"+this.statusText);

      if (this.status == 200) {
        // успешное завершение загрузки
        onSuccess();
        return; 
      }

      // что-то не так
      if (errorCount++ < MAX_ERROR_COUNT) {
        setTimeout(resume, 1000); // через 1 сек пробуем ещё раз
      } else {
        onError(this.statusText);  
      }      
    };

    xhrUpload.open("POST", "upload", true); 
    // какой файл догружаем /загружаем
    xhrUpload.setRequestHeader('X-Upload-Id', uploadId); 
    // с какого байта (сервер сверит со своим размером для надёжности)
    xhrUpload.setRequestHeader('X-Start-Byte', startByte); 
    // полный размер загружаемого файла
    xhrUpload.setRequestHeader('X-File-Size', file.size);

    xhrUpload.upload.onprogress = function(e) {
      errorCount = 0; 
      onProgress( startByte + e.loaded, startByte + e.total);
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
  this.resume = resume;

}
