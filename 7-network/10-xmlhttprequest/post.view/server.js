let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');
let file = new static.Server('.', {
  cache: 0
});


function accept(req, res) {

  if (req.method == 'POST') {
    let chunks = [];
    let length = 0;

    req.on('data', function (data) {
      chunks.push(data);
      length += data.length;

      // More than 10mb, kill the connection!
      if (length > 1e8) {
        req.connection.destroy();
      }
    });

    req.on('end', function() {
      // let post = JSON.parse(chunks.join(''));

      if (req.url == '/user') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User saved' }));
      } else if (req.url == '/image') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Image saved", imageSize: length }));
      } else if (req.url == '/upload') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Upload complete", size: length }));
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
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
