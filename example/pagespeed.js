!function () { 

  var har = require('../')
    , fs = require('fs')
    , spawn = require('child_process').spawn
    , http = require('http');

  var filePath = __dirname + '/har_to_pagespeed.exe'
    , file;

  // http://page-speed.googlecode.com/files/har_to_pagespeed.exe
  fs.exists(filePath, function (exists) {
    if (exists) {
      harUrl('http://ke.qq.com');
    } else {
      file = fs.createWriteStream(filePath);
      http.get('http://page-speed.googlecode.com/files/har_to_pagespeed.exe', function (res) {
        res.on('data', function (data) {
          file.write(data);
        }).on('end', function () {
          file.end();
          harUrl('http://ke.qq.com');
        });
      });
    }
  });
  
  function harUrl(url) {
    har(url)
      .success(function (data) {
        fs.writeFile('tmp.har', data, function () {
          var worker = spawn('har_to_pagespeed', [__dirname + '/tmp.har'])
            , that = this;
          worker.stdout.on('data', function (data) {
            console.log(data.toString());
          });
          worker.stderr.on('data', function (data) {
            
          });
          worker.on('close', function (code) {
            
          });
        });
      });
  }
}();