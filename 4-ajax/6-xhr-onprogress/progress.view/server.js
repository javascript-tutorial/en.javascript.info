var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  if (req.url == '/upload') {
    var length = 0;
    req.on('data', function(chunk) {
      // ничего не делаем с приходящими данными, просто считываем
      length += chunk.length;
      if (length > 50 * 1024 * 1024) {
        res.statusCode = 413;
        res.end("File too big");
      }
    }).on('end', function() {
      res.end('ok');
    });

  } else {
    file.serve(req, res);
  }

}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}