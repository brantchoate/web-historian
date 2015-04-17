var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

headers = exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  console.log("asset: ", asset);
  var readStream = fs.createReadStream(asset);
  var result = '';
  readStream.on('error', function() {
    res.writeHead(404, headers);
    res.end();
  });
  readStream.on('data', function(chunk) {
    result += chunk;
  });
  readStream.on('end', function() {
    res.writeHead(200, headers);
    res.end(result);
  });

};

exports.checkArchives = function(res, req, url) {
  var readArchives = fs.createReadStream(archive.paths.archivedSites + '/' + url);
  var result = '';

  readArchives.on('error', function() {
    fs.appendFileSync(archive.paths.list, url +'\n');
    res.writeHead(302, headers);
    res.end()
  });

  readArchives.on('data', function(chunk) {
    result += chunk;
  });

  readArchives.on('end', function() {
    headers['Location'] =  url;
    res.writeHead(302, {
    'Location': '/sites/' + url
    //add other headers here...
    });
    res.end();
    // res.writeHead(302, headers);
    // res.redirect('/sites/' + url);
  });

}
