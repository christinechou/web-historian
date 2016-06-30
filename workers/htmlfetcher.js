// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var fs = require('fs');
var _ = require('underscore');
var archive = require('../helpers/archive-helpers');
var request = require('request');

// set interval
// check all items on the list (sites.txt)
  // check against all files (stored in sites folder)
    // start at the end of the url array and move forward until an existing file is found
      // if new website is in txt file and not in folder...
        // Trigger request for data at that filepath / url
        // add a file to sites with that information and name


  setInterval(function() {
    var 
    for () {
      
    }
  }, 300)


// https://github.com/request/request


  url = 'www.google.com';
  request(url, function (error, response, body) {
    // if (!error && response.statusCode === 200) {
    if (!error) {
      console.log(body); // Show the HTML for the Modulus homepage.
    }
  });