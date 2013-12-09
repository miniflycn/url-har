/*!
 * url-har - netsiff
 * Copyright (c) 2013 Daniel Yang <miniflycn@justany.net>
 * Copyright (c) 2013 IMWEB TEAM
 * MIT Licensed
 */
var webpage = require('webpage')
  , write = require('system').stdout.write
  , error = require('system').stderr.write
  , ads = require('system').args.slice(1);

function begin() {
  return siff(ads.shift());
}
begin();

/**
 * siff
 * @param {String} address
 */
function siff(address) {
  if (!/^https?:\/\//.test(address)) return error('ADDRESS is wrong!');
  var page = webpage.create();
  page.address = address;
  page.resources = [];

  page.onLoadStarted = function () {
    page.startTime = new Date();
  };

  page.onResourceRequested = function (req) {
    page.resources[req.id] = {
      request: req,
      startReply: null,
      endReply: null
    };
  };

  page.onResourceReceived = function (res) {
    if (res.stage === 'start') {
      page.resources[res.id].startReply = res;
    }
    if (res.stage === 'end') {
      page.resources[res.id].endReply = res;
    }
  };

  page.open(page.address, function (status) {
    var har;
    if (status !== 'success') {
      error('FAIL to load the address: ' + address);
    } else {
      page.endTime = new Date();
      page.title = page.evaluate(function () {
        return document.title;
      });
      har = createHAR(page.address, page.title, page.resources, page.startTime, page.endTime);
      write('{{start}}' + JSON.stringify(har) + '{{end}}');
    }
    page.close();

    setTimeout(function () {
      ads.length ? begin() : phantom.exit();
    }, 200);
  });
}

/**
 * createHar
 */
function createHAR(address, title, resources, startTime, endTime) {
  var entries = [];

  resources.forEach(function (resource) {
    var request = resource.request
      , startReply = resource.startReply
      , endReply = resource.endReply;

    if (!request || !startReply || !endReply) return;

    entries.push({
      startedDateTime: request.time.toISOString(),
      time: endReply.time - request.time,
      request: {
        method: request.method,
        url: request.url,
        httpVersion: 'HTTP/1.1',
        cookies: [],
        headers: request.headers,
        queryString: [],
        headersSize: -1,
        bodySize: -1
      },
      response: {
        status: endReply.status,
        statusText: endReply.statusText,
        httpVersion: 'HTTP/1.1',
        cookies: [],
        headers: endReply.headers,
        redirectURL: '',
        headersSize: -1,
        bodySize: startReply.bodySize,
        content: {
          size: startReply.bodySize,
          mimeType: endReply.contentType
        }
      },
      cache: {},
      timings: {
        blocked: 0,
        dns: -1,
        connect: -1,
        send: 0,
        wait: startReply.time - request.time,
        receive: endReply.time - startReply.time,
        ssl: -1
      },
      pageref: address
    });
  });

  return {
    log: {
      version: '1.2',
      creator: {
        name: 'PhantomJS',
        version: phantom.version.major + '.' + phantom.version.minor + 
          '.' + phantom.version.path
      },
      pages: [{
        startDateTime: startTime.toISOString(),
        id: address,
        title: title,
        pageTimings: {
          onLoad: endTime - startTime
        }
      }],
      entries: entries
    }
  };
}