var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html' // change to application.json?
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  console.log('statusCode:', statusCode);
  response.writeHead(statusCode, exports.headers);
  response.end(JSON.stringify(data));
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

exports.makeActionHandler = function(actionMap, request, response) {
  return exports.sendResponse(request, response);

  // var fcnAction = function(request, response) {
  //   var action = actionMap[request.method];
  //   if (action) {
  //     console.log('execute action:', action);
  //     action(request, response);
  //   } else {
  //     console.log('fail action');
  //     exports.sendResponse(response, '', 404);
  //   }
  // };

  // console.log('action function:', fcnAction);

  // return fcnAction;
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
