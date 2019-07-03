const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');

let router = new Router();

router.get('/script', async (ctx) => {
  let callback = ctx.query.callback;

  if (!callback) {
    ctx.throw(400, 'Callback required!');
  }

  ctx.type = 'application/javascript';
  ctx.body = `${callback}({
    temperature: 25,
    humidity: 78
  })`;
});

app
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
