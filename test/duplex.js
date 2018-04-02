const { Duplex } = require('stream');
var fs = require('fs');
class MyDuplex extends Duplex {  
    constructor(options) {
      super(options);
      // ...
    }
    _write(chunk, encoding, callback) {
      this.data = chunk;
      callback();
    }
  
    _read(size) {
      this.push(this.data);
      delete this.data;
      this.push(null);
    }
  }
  
  const dp = new MyDuplex({  
    readableObjectMode: true
  })
  
 

module.exports = dp;