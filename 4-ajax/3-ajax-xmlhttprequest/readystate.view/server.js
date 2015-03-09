var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');

function accept(req, res) {

  if (req.url == '/digits') {

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache'
    });

    var i = 0;

    var timer = setInterval(write, 1000);
    write();

    function write() {
      res.write(new Array(1000).join(++i + '') + ' ');
      if (i == 9) {
        clearInterval(timer);
        res.end();
      }

    }
  } else {
    file.serve(req, res);
  }
}



// ----- запуск accept как сервера из консоли или как модуля ------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}