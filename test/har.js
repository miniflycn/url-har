var har = require('../lib/har')
  , connect = require('connect');

var testServer = connect()
                  .use('/available', function (req, res, next) {
                    res.writeHead(200, {
                      'Content-Type': 'text/html; charset=UTF-8'
                    });
                    res.statusCode = 200;
                    res.end('<html><head><title>test</title></head><body>hello world!</body></html>');
                  })
                  .use('/unavailable', function (req, res, next) {
                    res.writeHead(404, {
                      'Content-Type': 'text/html; charset=UTF-8'
                    });
                    res.statusCode = 404;
                    res.end('Page Not Found!');
                  })
                  .listen(7777);

describe('har', function () {
  it('should able to get a har data', function (done) {
    har('http://127.0.0.1:7777/available').success(function (data) {
      var page = data.log.pages[0];
      page.title.should.equal('test');
      page.id.should.equal('http://127.0.0.1:7777/available');
      done();
    });
  });

  it('should occur a error', function (done) {
    har('wrongaddress').fail(function (data) {
      data.should.equal('ADDRESS is wrong!');
      done();
    });
  });
});