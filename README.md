[![Build Status](https://travis-ci.org/miniflycn/url-har.png?branch=master)](https://travis-ci.org/miniflycn/url-har)
[![Coverage Status](https://coveralls.io/repos/miniflycn/url-har/badge.png?branch=master)](https://coveralls.io/r/miniflycn/url-har?branch=master)
# url-har
A library to get HTTP Archive files

## Dependence
Make sure PhantomJS is insalled. This module expects the phantomjs binary to be in PATH somewhere and must be greater than 1.9.0. In other words, type this:

	$ phantomjs -v

if it print 1.9.x. you can do next.

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

(The WTFPL)

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE

Version 2, December 2004

Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>

Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0. You just DO WHAT THE FUCK YOU WANT TO.