import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'

export const addBodyParser = app => {
    app.use(bodyParser())
}
export const addLogger = app => {
    app.use(logger())
}
export const addSession = app => {
    app.keys = ['imooc-trailer']
    const CONFIG = {
        key: 'koa:sess',
        maxAge: 864000000,
        overwrite: true,
        httpOnly: false,
        signed: true,
        rolling: false
    }
    app.use(session(CONFIG,app))
    
}