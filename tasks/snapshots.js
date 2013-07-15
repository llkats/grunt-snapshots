/*
 * grunt-snapshots
 * https://github.com/llkats/grunt-snapshots
 *
 * Copyright (c) 2013 Lydia Katsamberis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var phantom = require('phantom');

  grunt.registerMultiTask('snapshots', 'Take a screenshot of a URL', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      url: 'http://www.google.com',
      filename: 'google',
      path: 'tmp/default/screenshots',
      extension: 'png',
      timestamp: false,
      unique: false
    });

    // function for generating random strings so files don't get overwritten
    var randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
    };

    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open(options.url, function(status) {
          var newID;
          if (options.unique) {
           newID = '-' + randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          } else if (options.timestamp) {  // timestamp option for filenames
            newID = '-' + Date.now();
          } else {
            newID = '';
          }
          page.render(options.path + '/' + options.filename + newID + '.' + options.extension, function() {
            page.close();
            ph.exit();
          });
          setTimeout(function() { // set a timeout to make sure phantom is done finishing up
            done();
          }, 1000);
        });
      });
    });
  });

};
