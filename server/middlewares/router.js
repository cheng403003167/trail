
const {Route} = require('../lib/decorator')
const { resolve } = require('path');
console.log(Route)
export const router = app => {
    console.log(Route)
    const apiPath = resolve(__dirname,'../routes')
    const router = new Route(app,apiPath)
    router.init()
}

// module.exports = router;