var archive = require('../helpers/archive-helpers');
var http_lib = require('http-request');
var fs = require('fs');
// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
(function() {
  var readArchives = fs.createReadStream(archive.paths.list);
  var result = '';

  readArchives.on('data', function(chunk) {
    result += chunk;
  });

  readArchives.on('end', function() {
    var sites = result.split('\n');
    for (var x = 0; x < sites.length; x++) {
      scrape(sites[x]);
    }
  });




  var scrape = function(url) {

    http_lib.get({
      url: url,
      progress: function (current, total) {
        console.log('downloaded %d bytes from %d', current, total);
      }
    }
    ,archive.paths.archivedSites + '/' + url, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("hi", res.code, res.headers, res.file);

    });
  }

}());
