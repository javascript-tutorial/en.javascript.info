var http = require('http');
var url = require('url');
var querystring = require('querystring');

var fileServer = new (require('node-static')).Server('.');

function onDigits(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  var i=0;

  var timer = setInterval(write, 1000);
  write();

  function write() {
    i++;

    if (i == 4) {
      res.write('event: bye\ndata: до свидания\n\n');
      clearInterval(timer);
      res.end();
      return;
    }

    res.write('data: ' + i + '\n\n');
    
  }
}

function accept(req, res) {

  if (req.url == '/digits') {
    onDigits(req, res);
    return;
  }

  // всё остальное -- статика
  fileServer.serve(req, res);


}



// ----- запуск accept как сервера из консоли или как модуля ------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}
