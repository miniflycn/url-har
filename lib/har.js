/*!
 * url-har
 * Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>
 * Copyright (c) 2013 IMWEB TEAM
 * MIT Licensed
 */
module.exports = (function () {
  "use strict";
  var spawn = require('child_process').spawn
    , noop = function () {}
    , _string = '';

  function _check(string) {
    _string += string.toString();
    if (!~_string.indexOf('{{end}}')) return null;
    var match = _string.match(/\{\{start\}\}(.*?)\{\{end\}\}/);
    _string = '';
    return match ? match[1] : null;
  }

  /**
   * Har
   * @class
   * @param {String | Array} address
   */
  function Har(address) {
    var init = this.init.bind(this);
    process.nextTick(function () {
      init(address);
    });
  }
  Har.prototype = {
    constructor: Har,
    init: function (address) {
      var worker = spawn('phantomjs', [__dirname + '/netsiff.js'].concat(address))
        , that = this;
      worker.stdout.on('data', function (data) {
        data = _check(data);
        data && that.onsuccess(data);
      });
      worker.stderr.on('data', function (data) {
        // console.log('PhantomJS worker has occur a error: ' + data);
        that.onfail(data.toString());
      });
      worker.on('close', function (code) {
        // worker close
      });
      return this;
    },
    success: function (cb) {
      this.onsuccess = cb;
      return this;
    },
    fail: function (cb) {
      this.onfail = cb;
      return this;
    },
    onsuccess: noop,
    onfail: noop
  }

  return function (address) {
    return (new Har(address));
  };

})();