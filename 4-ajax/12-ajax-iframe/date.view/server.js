var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});
var multiparty = require('multiparty');

function accept(req, res) {

  var urlParsed = url.parse(req.url, true);
  res.setHeader('Cache-Control', 'no-cache');

  if (urlParsed.pathname == '/server') {
    res.end(wrap(new Date()));
    return;
  } else if (urlParsed.pathname == '/diff') {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var diff = new Date() - fields.clientDate[0];
      res.end(wrap(diff));
    });

  } else {
    file.serve(req, res);
  }

}

function wrap(data) {
  return '<script>parent.CallbackRegistry[window.name](' + JSON.stringify(data) + ')</script>';
}


// ------ запустить сервер -------

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}