var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');
const duplex = require('./duplex')

class GetWebData {
    downHttpData(url,encoding,fileName=null){
        if(url.startsWith('http:')){
            return this.getOthHttp(url,encoding,fileName);
        }else if(url.startsWith('https:')){
            return this.getOthHttps(url,encoding,fileName)
        }
    }
    getOthHttp(url,encoding,fileName=null){
        if(!fileName){
            fileName = path.basename(url);
        }
        return new Promise(function(resolve){
            http.get(url,(res)=>{
                var Data = '';
                res.setEncoding(encoding);
                res.on('data',(d)=>{
                    Data += d;
                }).on('end',()=>{
                    duplex.write(Data,'binary');
                    resolve({fileName,duplex});
                })
            })
        })
        
    }
    getOthHttps(url,encoding,fileName=null){
        if(!fileName){
            fileName = path.basename(url);
        }
        return new Promise(function(resolve){
            https.get(url,(res)=>{
                var Data = '';
                res.setEncoding(encoding);
                res.on('data',(d)=>{
                    Data += d;
                }).on('end',()=>{
                    duplex.write(Data,'binary');
                    resolve({fileName,duplex});
                })
            })
        })
    }
    writeStream(Data,fileName,encoding){
    }
}

var s = new GetWebData();
module.exports = s;
// s.downHttpData('http://vt1.doubanio.com/201803292143/3762e0c6699dae51014b1bc22399356e/view/movie/M/302160387.mp4','binary',fileName='ab.mp4');
// s.downHttpData('https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg','binary');
