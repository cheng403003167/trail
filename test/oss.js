var co = require('co');
var OSS = require('ali-oss');
var fs = require('fs');
var writeFile = require('./getData');


var url = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg';
var client = new OSS({
  accessKeyId: 'LTAIOs2a0NczRHfB',
  accessKeySecret: 'Tl9ohhSUrFIFyRHmrBSMAryzjJWOzV',
  bucket:'traile',
  endpoint:'oss-cn-shenzhen.aliyuncs.com'
});
var Data = '';
// http.get(url,(res)=>{
//   res.setEncoding('binary');
//   res.on('data',(d)=>{
//       Data += d;
//   });
//   res.on('end',()=>{
//     db.write(Data,'binary');
//     db.pipe(fs.createWriteStream('ab.mp4'))
//   })
// });
co(function* () {
  yield writeFile.downHttpData(url,'binary').then(function(stra){
    Data = stra;
  });
  var result = yield client.putStream(Data.fileName,Data.duplex);
  console.log(result.name);
  
}).catch(function (err) {
  console.error(err);
});





