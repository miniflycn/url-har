var har = require('../lib/har')
  , connect = require('connect');

var testServer = connect()
                  .use(function (req, res, next) {
                    res.writeHead(200, {
                      'Content-Type': 'text/html; charset=UTF-8'
                    });
                    res.statusCode = 200;
                    res.end('<html><head><title>test</title></head><body>hello world!</body></html>');
                  })
                  .listen(7777);

describe('har', function () {
  it('should able to get a har data', function (done) {
    var a = har('http://127.0.0.1:7777/').success(function (data) {
      var page = data.log.pages[0];
      page.title.should.equal('test');
      page.id.should.equal('http://127.0.0.1:7777/');
      done();
    });
  });
});