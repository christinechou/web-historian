var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
// require more modules/folders here!
var fs = require('fs');
var url = require('url'); // Source: http://www.colome.org/get-or-post-variables-in-node-js-server/

var objectIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  /*
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectIdCounter
  }
  */
];

var actions = {
  'GET': function(request, response) {
    httpHelpers.sendResponse(response, {results: 'messages'});
  },
  'POST': function(request, response) {
    httpHelpers.collectData(request, function(message) {
      message.objectId = ++objectIdCounter;
      messages.push(message);
      httpHelpers.sendResponse(response, {objectId: 'message.objectId'}, 201);
    });
  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response, null);
  }
};

var getHTMLContent = function(res, pathName) {
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      res.writeHead(404, exports.headers);
      // return console.log(err);
    }
    res.end(data);
  });
};

exports.handleRequest = function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var fullPath = '';
  if (pathname !== '/') {
    fullPath = archive.paths.archivedSites + pathname;    
  } else {
    console.log('directory is:', __dirname);
    fullPath = __dirname + '/public/index.html';
  }

  // console.log(fullPath);
  // httpHelpers.makeActionHandler(actions, req, res);
  // console.log('content? sure hope so.', getHTMLContent());
  getHTMLContent(res, fullPath);

  // + add headers
  // res.end();
};




