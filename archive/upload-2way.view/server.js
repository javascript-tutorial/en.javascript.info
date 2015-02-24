var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('.');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');

var uploads = {};

function onUpload(req, res) {

	var fileId = req.headers['x-file-id'];
	if (!fileId) {
		res.writeHead(400, "No file id");
		res.end();
	}

	// инициализация новой загрузки
	var upload = uploads[fileId];
	if (!upload) {
		res.writeHead(400, "No such upload");
		res.end();
		return;
	}

	upload.bytesWritten = 0;

	var filePath = '/dev/null'; //path.join("/tmp", fileId);

	// будем сохранять в файл с именем fileId
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
		delete uploads[fileId];

		// здесь обработка успешной загрузки
	});

}

function onStatusStream(req, res) {

	var fileId = req.headers['x-file-id'];
	var upload = uploads[fileId];

	if (!upload) {
		upload = uploads[fileId] = new EventEmitter();
		upload.bytesWritten = 0;
	}

	console.log("upload bytesWritten", upload.bytesWritten);

	// сразу же пишем текущий прогресс
	res.write(upload.bytesWritten + '-');

	// и по мере загрузки дописываем
	upload.on('progress', function() {
		res.write(upload.bytesWritten + '-');
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

