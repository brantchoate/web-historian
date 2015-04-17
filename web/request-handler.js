var path = require('path');
var archive = require('../helpers/archive-helpers');
var http_helpers = require('./http-helpers.js');

exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    var headers = http_helpers.headers;
    console.log("url", req.url.slice(0,6));
    if (req.url.slice(0,6) === '/sites') {
      var website = req.url.slice(7,req.url.length);
      console.log("website: ", website);
      //use another helper function to check if the site is in our test file (accepts req.body)
      http_helpers.serveAssets(res, archive.paths.archivedSites + '/' + website);
    }

    else if (req.url === '/') {
      http_helpers.serveAssets(res, archive.paths.siteAssets + '/index.html');
    } else {
      http_helpers.serveAssets(res, archive.paths.siteAssets + req.url);
    }

  }

  if (req.method === 'POST' && req.url.slice(0,6) === '/sites') {
    console.log("post", req.body);
    data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
    http_helpers.checkArchives(res, req, data);
    });
  }
};
