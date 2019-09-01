let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');
let file = new static.Server('.');

function accept(req, res) {

  if (req.url == '/load') {

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
      'Content-Length': 90000
    });

    let i = 0;

    let timer = setInterval(write, 1000);
    write();

    function write() {
      res.write(String(i).repeat(10000));
      i++;
      if (i == 9) {
        clearInterval(timer);
        res.end();
      }

    }
  } else if (req.url == '/json') {
    res.writeHead(200, {
      // 'Content-Type': 'application/json;charset=utf-8',
      'Cache-Control': 'no-cache'
    });

    res.write(JSON.stringify({message: "Hello, world!"}));
    res.end();
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
