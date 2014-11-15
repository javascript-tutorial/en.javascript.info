var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');

var fileServer = new static.Server('.');

var subscribers = {};

function onSubscribe(req, res) {
  var id = Math.random();
  
  subscribers[id] = res;
  console.log("новый клиент " + id + ", клиентов:" + Object.keys(subscribers).length);

  req.on('close', function() {
    delete subscribers[id];
    console.log("клиент "+id+" отсоединился, клиентов:" + Object.keys(subscribers).length);
  });

}

function onPublish(req, res, message) {

  console.log("есть сообщение, клиентов:" + Object.keys(subscribers).length);    

  for(var id in subscribers) {
    console.log("отсылаю сообщение " + id);
    var res = subscribers[id];

    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=utf-8',
        "Cache-Control": "no-cache, must-revalidate"
    });

    res.write(message, 'utf-8');    
    res.end();
  }
  
  subscribers = {};
}

function accept(req, res) {
  var urlParsed = url.parse(req.url, true);

  // новый клиент хочет получать сообщения
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res); // собственно, подписка
    return;
  } 

  // отправка сообщения
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // принять POST-запрос
    var post;
    req.addListener('data', function (chunk) {
      post = querystring.parse(chunk.toString());
    }).addListener('end', function () {
      onPublish(req, res, post.message.toString()); // собственно, отправка
    });
  
    return;
  } 

  // всё остальное -- статика
  fileServer.serve(req, res);

}


// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Сервер запущен на порту 8080');
} else {
  exports.accept = accept;
}

