const Koa = require('koa2');
const app = new Koa();
const ejs = require('ejs');
const pug = require('pug')
const { html,ejsTpl,pugTpl } = require('./tpl');

app.use(async (ctx,next) =>{
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = pug.render(pugTpl,{
        you:'chen',
        me:'pug'
    })
})
app.listen(8089);