[![Build Status](https://travis-ci.org/miniflycn/url-har.png?branch=master)](https://travis-ci.org/miniflycn/url-har)
[![Coverage Status](https://coveralls.io/repos/miniflycn/url-har/badge.png?branch=master)](https://coveralls.io/r/miniflycn/url-har?branch=master)
# url-har
A library to get HTTP Archive files

## Usage
```javascript
var har = require('url-har');
har('http://www.google.com')
  .success(function (data) {
    // print the HAR data
    console.log(data);
  })
  .fail(function (code) {
    // print the fail reason code
    console.log(code);
  });
```

## License
(The MIT License)

Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>

Copyright (c) 2013 IMWEB TEAM

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.