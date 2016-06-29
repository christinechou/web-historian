var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
// require more modules/folders here!
var fs = require('fs');

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

var getHTMLContent = function() {
  var content = '';
  fs.readFile(__dirname + '/public/index.html', 'utf-8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data); 
    content = data;
  });
  return content;
};

exports.handleRequest = function (req, res) {
  console.log('request handling method:', req.method);
  // httpHelpers.makeActionHandler(actions, req, res);
  var htmlContent = getHTMLContent();
console.log('content? sure hope so.', htmlContent);
  res.end(htmlContent);
};




