const doSync = (sth,time)=> new Promise(resolve =>{
    setTimeout(()=>{
        console.log(sth+'用了'+time);
        resolve()
    },time)
})

const doAsync = (sth,time,cb) =>{
    setTimeout(()=>{
        console.log(sth+'用了'+time);
        cb && cb()
    },time)
}

const doElse = (sth) =>{
    console.log(sth);
}

const Scott = { doSync,doAsync};
const Meizi = {doSync,doAsync,doElse};

(async ()=>{
    console.log('case1:妹子来到门口');
    await Scott.doSync('Scott 刷到处',1000)
    console.log('等');
    await Meizi.doSync('妹子洗澡',2000)
    console.log('妹子忙别的');
    
    console.log('case3:妹子来到门口');
    Scott.doAsync('Scott 刷到',1000,()=>{
        console.log('通知妹子来洗澡');
        Meizi.doAsync('妹子洗澡',2000)
    })
    console.log('妹子忙别的');
})()