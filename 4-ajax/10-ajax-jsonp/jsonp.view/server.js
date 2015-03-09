var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  var urlParsed = url.parse(req.url, true);

  if (urlParsed.pathname == '/user') {
    var id = urlParsed.query.id;
    var callback = urlParsed.query.callback;

    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');

    var user = {
      name: "Вася",
      id: id
    };

    res.end(callback + '(' + JSON.stringify(user) + ')');

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