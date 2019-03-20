const Koa = require('koa');
const app = new Koa();
const ws = require('ws');
const Router = require('koa-router');

let router = new Router();

const wss = new ws.Server({noServer: true})

router.get('/hello', handleWebsocket(hello));


function handleWebsocket(handler) {
  return async (ctx, next) => {

    const upgradeHeader = (ctx.request.headers.upgrade || '').split(',').map(s => s.trim())

    // console.log(`websocket middleware called on route ${ctx.path}`);
    // console.log(ctx.request.headers);
    // console.log(upgradeHeader);

    if (upgradeHeader.includes('websocket')) {
      ctx.respond = false;
      wss.handleUpgrade(ctx.req, ctx.request.socket, Buffer.alloc(0), handler);
    } else {
      await next();
    }
  };
}

async function hello(ws) {
  ws.on('message', function (message) {
    let name = message.match(/\w+$/) || "Guest";
    ws.send(`Hello, ${name}!`);

    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

app
  .use(router.routes())
  .use(router.allowedMethods());

if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
