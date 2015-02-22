var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('.');
var fs = require('fs');
var path = require('path');

var uploads = {};

var filesDir = '/tmp';

function onUpload(req, res) {

	var uploadId = req.headers['x-upload-id'];
	var startByte = req.headers['x-start-byte'];

	if (!uploadId) {
		res.writeHead(400, "No upload id");
		res.end();
	}

	var filePath = path.join(filesDir, uploadId); // можно положить файл и в другое место

	//console.log("onUpload uploadId: ", uploadId);
	// инициализация новой загрузки
	if (!uploads[uploadId]) uploads[uploadId] = {};
	var upload = uploads[uploadId];
	
	console.log("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

	// если байт 0, то создать новый файл, иначе проверить размер и дописать
	if (startByte == 0) {
		upload.bytesReceived = 0;
		var fileStream = fs.createWriteStream(filePath, {flags: 'w'});
		console.log("New file created: " + filePath);
	} else {
		if (upload.bytesReceived != startByte) {
			res.writeHead(400, "Wrong start byte");
			res.end(upload.bytesReceived);
			return;
		}
		fileStream = fs.createWriteStream(filePath, {flags: 'a'});
		console.log("File reopened: " + filePath);
	}


	req.on('data', function(data) {
		upload.bytesReceived += data.length;
	});

	// отправить тело запроса в файл
	req.pipe(fileStream);

	// в конце -- событие end
	fileStream.on('close', function() {
		if (upload.bytesReceived == req.headers['x-file-size']) {
			// полностью загрузили
			console.log("File finished");
			delete uploads[uploadId];

			fs.unlinkSync(filePath); // удаляю загруженный файл (а мог бы делать с ним что-то еще)

			res.end("Success " + upload.bytesReceived);
		} else {
			// соединение оборвано, дескриптор закрылся но файл оставляем
			console.log("File unfinished, stopped at " + upload.bytesReceived);
			res.end();
		}
	});

	// при ошибках - завершение запроса
	fileStream.on('error', function (err) {
		console.log("fileStream error");
		res.writeHead(500, "File error");
		res.end();
	});

}

function onStatus(req, res) {
	var uploadId = req.headers['x-upload-id'];
	var upload = uploads[uploadId];
	console.log("onStatus uploadId:", uploadId, " upload:", upload);
	if (!upload) {
		res.writeHead(404);
		res.end("No such upload");
		return;
	}

	res.end(String(upload.bytesReceived));
}


function accept(req, res) {
	if (req.url == '/status') {
		onStatus(req, res);
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

