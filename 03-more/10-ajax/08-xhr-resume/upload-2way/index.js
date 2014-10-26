var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('.');
var events = require('events');
var fs = require('fs');
var path = require('path');

var uploads = {};

var filesDir = '/tmp';

function onUpload(req, res) {

	var uploadId = req.headers['x-upload-id'];
	if (!uploadId) {
		res.writeHead(400, "No upload id");
		res.end();
	}

	// инициализация новой загрузки
	var upload = uploads[uploadId] = new events.EventEmitter();
	upload.bytesWritten = 0;
	
	var filePath = path.join(filesDir, uploadId);

	// будем сохранять в файл с именем uploadId
	var fileStream = fs.createWriteStream(filePath);

	// отправить тело запроса в файл
	req.pipe(fileStream);

	// при записи очередного фрагмента событие progress
	fileStream.on('drain', function() {
		upload.bytesWritten = fileStream.bytesWritten;
		upload.emit("progress");
	});

	// в конце -- событие end
	fileStream.on('close', function() {
		upload.finished = true;
		upload.emit("end");
	});

	// при ошибках - завершение запроса
	fileStream.on('error', function (err) {
		res.writeHead(500, "File error");
		res.end('error');
	});

	// в конце запроса - очистка
	req.on('end', function() {	
		res.end();
		delete uploads[uploadId]; 
		// в этой демке мы не оставляем файл на диске, 
		// в реальности здесь будет обработка успешной загрузки
		fs.unlinkSync(filePath);
	});

}

function onStatusStream(req, res) {

	var uploadId = req.headers['x-upload-id'];
	var upload = uploads[uploadId];

	// нет такой загрузки?
	// подождём немного, может почему-то запрос на статус дошёл до сервера раньше,
	// и она ещё не началась
	if (!upload) {
		var interval = setTimeout(function() {
			onStatusStream(req, res)
		}, 500);
		return;
	}

	// ..при окончании запроса на статус - прекращаем ждать
	req.on('end', function() {
		clearInterval(interval); 
	});

	// есть загрузка

	// сразу же пишем текущий прогресс
	res.write(upload.bytesWritten+'-');

	// и по мере загрузки дописываем
	upload.on('progress', function() {
		res.write(upload.bytesWritten+'-');		
	});

	upload.on('end', function() {
		res.end();
	});
}



function accept(req, res) {
	if (req.url == '/status-stream') {
		onStatusStream(req, res);
	} else if (req.url == '/upload' && req.method == 'POST') {
		onUpload(req, res);
	} else {
		fileServer.serve(req, res);
	}

}


// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Сервер запущен на порту 8080');
} else {
  exports.accept = accept;
}

