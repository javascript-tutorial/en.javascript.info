const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');

let router = new Router();

router.get('/hang', async (ctx) => {
  await new Promise(() => {});
});

app
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
