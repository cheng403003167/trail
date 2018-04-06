var co = require('co');
var OSS = require('ali-oss');
var fs = require('fs');
const chalk = require('chalk');
var writeFile = require('./getData');


// var url = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg';
var client = new OSS({
  accessKeyId: 'LTAIOs2a0NczRHfB',
  accessKeySecret: 'Tl9ohhSUrFIFyRHmrBSMAryzjJWOzV',
  bucket:'traile',
  endpoint:'oss-cn-shenzhen.aliyuncs.com'
});
function upDate(url){
  var Data = '';
  co(function* () {
    yield writeFile.downHttpData(url,'binary').then(function(stra){
      Data = stra;
    });
    var result = yield client.putStream(Data.fileName,Data.duplex);
    console.log(chalk.green(Data.fileName + '上传成功'))
  }).catch(function (err) {
    console.error(chalk.blue(Data.fileName + '上传失败' + err));
  });
}
module.exports = upDate;





