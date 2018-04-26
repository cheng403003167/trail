const Router = require('koa-router');
const glob = require('glob');
const { resolve } = require('path');
const _ = require('lodash');

const symbolPrefix = Symbol('prefix');
const routerMap = new Map();
const isArray = c => _.isArray(c) ? c : [c];


class Route {
    constructor(app,apiPath){
        console.log(324)
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }
    init(){
        console.log(4354)
        glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require);

        for (let [conf,controller] of routerMap){
            const controllers = isArray(controller);
            const prefixPath = conf.target[symbolPrefix];
            if(prefixPath) prefixPath = normalizePath(prefixPath);
            const routerPath = prefixPath + conf.path;
            this.router[conf.method](routerPath,...controllers)
            console.log(routerPath)
        }
        this.app.use(this.router.routes());
        this.app.use(this.router.all());
    }
}


const normalizePath = path => path.startsWith('/') ? path : `/${path}`;

const router = conf => (target,key,descriptor) => {
    conf.path = normalizePath(conf.path);

    routerMap.set({
        target:target,
        ...conf
    },target[key])
}

const controller = path => target => (target.prototype[symbolPrefix] = path) 

const get = path => router({
    method: 'get',
    path: path
})
const post = path => router({
    method: 'post',
    path: path
})
const put = path => router({
    method: 'put',
    path: path
})
const del = path => router({
    method: 'del',
    path: path
})
const use = path => router({
    method: 'use',
    path: path
})
const all = path => router({
    method: 'all',
    path: path
})

module.exports = {
    Route,
    controller,
    get,
    post,
    put,
    del,
    use,
    all
}