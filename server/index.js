const Koa = require('koa2');
const app = new Koa();
const { normal } = require('./tpl')

app.use(async (ctx,next) =>{
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = normal
})
app.listen(8089);