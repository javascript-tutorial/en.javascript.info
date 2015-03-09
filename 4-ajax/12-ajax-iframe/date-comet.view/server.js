var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  if (req.url == '/comet') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });

    res.write('<!DOCTYPE HTML><html> \
			<head><meta junk="' + new Array(2000).join('*') + '"/> \
			<script> \
			  var i = parent.IframeComet; \
			  i.onConnected()</script> \
			</head><body>');

    setInterval(function() {
      var now = new Date();
      var timeStr = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
      res.write('<script>i.onMessage("' + timeStr + '")</script>');
    }, 1000);

    return;
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