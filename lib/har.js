/*!
 * url-har
 * Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>
 * Copyright (c) 2013 IMWEB TEAM
 * MIT Licensed
 */
module.exports = (function () {
  "use strict";
  var spawn = require('child_process').spawn
    , noop = function () {};

  /**
   * Har
   * @class
   * @param {String} address
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
      var worker = spawn('phantomjs', [__dirname + '/netsiff.js', address])
        , that = this;
      worker.stdout.on('data', function (data) {
        that.onsuccess(JSON.parse(data.toString()));
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