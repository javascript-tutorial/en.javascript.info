const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getRawBody = require('raw-body')
const Router = require('koa-router');

let router = new Router();

router.post('/user', async (ctx) => {
  ctx.body = {
    message: "User saved."
  };
});

router.post('/image', async (ctx) => {
  let body = await getRawBody(ctx.req, {
    limit: '1mb'
  });
  ctx.body = {
    message: `Image saved, size:${body.length}.`
  };
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());


if (!module.parent) {
  http.createServer(app.callback()).listen(8080);
} else {
  exports.accept = app.callback();
}
