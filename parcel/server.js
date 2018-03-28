const Koa = require('koa2');
const { resolve } = require('path')
const serve = require('koa-static');

const app = new Koa();
app.use(serve(resolve(__dirname,'./')))
app.listen(8080);