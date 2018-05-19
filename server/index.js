const Koa = require('koa2');
const cors = require('koa2-cors');
const mongoose = require('mongoose');
const views = require('koa-views');
const { resolve } = require('path');
const {connect,initAdmin,initSchemas}= require('./database/init');
const R = require('ramda');
const MIDDLEWARES = ['common','router'];


const useMiddlewares = (app) =>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname,`./middlewares/${name}`)
        )
    )(MIDDLEWARES)
};
;(async ()=>{
    await connect();
    await initSchemas();
    await initAdmin();
    // require('./tasks/movie');
    // require('./tasks/api');
    // require('./tasks/trailer');
    // require('./tasks/qiniu');
    const app = new Koa();
    app.use(cors({
        origin: function(ctx) {
          if (ctx.url === '/test') {
            return false;
          }
          return '*';
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      }));
    await useMiddlewares(app);
    app.listen(8089);
})()


