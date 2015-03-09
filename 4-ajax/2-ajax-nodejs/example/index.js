var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');


function accept(req, res) {

  // если URL запроса /vote, то...
  if (req.url == '/vote') {
    // через 1.5 секунды ответить сообщением
    setTimeout(function() {
      res.end('Ваш голос принят: ' + new Date());
    }, 1500);
  } else {
    // иначе считаем это запросом к обычному файлу и выводим его
    file.serve(req, res); // (если он есть)
  }

}


// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}