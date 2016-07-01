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
  'GET': function(request, response, fullPath) {
    getHTMLContent(response, fullPath);
    // httpHelpers.sendResponse(response, {results: 'messages'});
  },
  'POST': function(request, response) {
    console.log('hello')

  },
  'OPTIONS': function(request, response) {
    httpHelpers.sendResponse(response, null);
  }
};

var getHTMLContent = function(response, pathName) {
  fs.readFile(pathName, 'utf-8', function (err, data) {
    if (err) {
      response.writeHead(404, exports.headers);
    }
    response.end(data);
  });
};

exports.handleRequest = function (req, res) {

  //grabbing url path
  var pathname = url.parse(req.url).pathname;
  var fullPath = '';
  if (pathname !== '/') {
    fullPath = archive.paths.archivedSites + pathname;    
  } else {
    fullPath = __dirname + '/public/index.html';
  }

  

  actions[req.method](req, res, fullPath);

  // httpHelpers.makeActionHandler(actions, req, res);

  //grabs and posts html contents of url page

  // + add headers
  // res.end();
};




