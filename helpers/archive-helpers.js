var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */


// Check archive for website
  // if it exists:
    // return html from file
  // otherwise
    // send client 'loading html' message
    // add to worker queue
      // Worker creates a new file for it
      // Add the html  

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// http://stackoverflow.com/questions/34719693/node-js-fs-accesssync-set-global-variable-path-fail/35965950
// http://stackoverflow.com/questions/34719693/node-js-fs-accesssync-set-global-variable-path-fail
// https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=fs.readfile+get+specific+element


exports.readListOfUrls = function(callback) {
  
  return fs.readFile(exports.paths.list, 'UTF-8', function(err, data) {
    var arr = data.split('\n');
      // console.log('arr[i]:',arr[i], 'data',data)
    return callback(arr);
  });

};

exports.isUrlInList = function(targetUrl, callback) {   // will URL contain just path name or full path?

  return exports.readListOfUrls(function(arr) {
    var contains = false;
    arr.forEach(function(value, index) {
      if (value === targetUrl) { contains = true; }
    });
    return callback(contains);
  }); 
};

exports.addUrlToList = function(newUrl, callback) {
  fs.writeFile(exports.paths.list, newUrl, 'UTF-8', function () {
    return callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  // 1 search to see if file path exists in archives
  var fullPath = exports.paths.archivedSites + '/' + url;
  fs.exists(fullPath, function(exists) {
    return callback(exists);
  });
};

exports.downloadUrls = function(urlArray) { 
  // set 'data to append' to body
  for (var i = 0; i < urlArray.length; i++) {
    var fullPath = exports.paths.archivedSites + '/' + urlArray[i];  
    fs.appendFile(fullPath, 'data to append', function (err) {
      console.log('trying to add:', fullPath);
    });
  }
};









