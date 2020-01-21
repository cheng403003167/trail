var co = require('co');
var OSS = require('ali-oss');
var fs = require('fs');
const chalk = require('chalk');
var writeFile = require('./getData');


var url = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg';
var url2 = 'https://img1.doubanio.com/img/trailer/medium/2457624899.jpg';
var client = new OSS.Wrapper({
  accessKeyId: '',
  accessKeySecret: '',
  bucket:'traile',
  endpoint:'oss-cn-shenzhen.aliyuncs.com'
});
function upDate(url){
  writeFile.downHttpData(url,'binary').then(function(stra){
    client.putStream('first/'+stra.fileName,stra.dup).then(function(res){
      console.log(res.name)
    }).catch(err=>{
      console.error(chalk.blue(Data.fileName + '上传失败' + err));
    });
  });
}
// function UpDate(url){
//   var Data = '';
//   co(function* () {
//     let write = new writeFile();
//     yield write.downHttpData(url,'binary').then(function(stra){
//       Data = stra;
//     });
//     let result = yield client.putStream(Data.fileName,Data.dup);
    
//     console.log(chalk.green(Data.fileName + '上传成功'))
//   }).catch(function (err) {
//     console.error(chalk.blue(Data.fileName + '上传失败' + err));
//   });
// }

upDate(url)
upDate(url2)

exports.upDate;





