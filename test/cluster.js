const cluster = require('cluster');
const cpus = require('os').cpus();

let Workers = []

const masterProcess = ()=>{
    console.log(`一共有 ${cpus.length} 个核`)
    console.log(`Master 主进程 ${process.pid} 启动`)

    for(let i = 0;i<cpus.length;i++){
        console.log(`正在 Fork 子进程 ${i}`)
        const worker = cluster.fork()

        Workers.push(worker)

        worker.on('message',message =>{
            console.log(`主进程 ${process.pid} 收到 '${JSON.stringify(message)}' 来自 ${worker.process.pid}`)
        })
    }
    Workers.forEach(worker =>{
        console.log(`主进程 ${process.pid} 发消息给子进程 ${worker.process.pid}`)
        worker.send({msg:`来自主进程的消息 ${process.pid}`})
    },this)
}

const childProcess = ()=>{
    console.log(`Worker 子进程 ${process.pid} 启动`)
    process.on('message',message =>{
        console.log(`Worker 子进程 ${process.pid} 收到消息 '${JSON.stringify(message)}'`)
    })
    console.log(`Worker 子进程 ${process.pid} 发消息给主进程`)
    process.send({msg:`来自子进程的消息 ${process.pid}`})
    console.log(`Worker 子进程 ${process.pid} 结束`)
}

if(cluster.isMaster){
    masterProcess()
}else{
    childProcess()
}