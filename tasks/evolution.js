/*
 * grunt-evolution
 * https://github.com/llkats/grunt-evolution
 *
 * Copyright (c) 2013 Lydia
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var phantom = require('phantom');

  grunt.registerMultiTask('evolution', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      url: 'http://www.google.com',
      filename: 'google',
      path: 'tmp/default/screenshots',
      extension: 'png',
      unique: false
    });


    var randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
      }
      return result;
    };


    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // I feel like this should work without the timeout. the async stuff is doing my head in.
    setTimeout(function() {
      phantom.create(function(ph) {
        ph.createPage(function(page) {
          page.open(options.url, function(status) {
            console.log(options.url);
            var newID;
            if (options.unique) {
             newID = '-' + randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            } else {
              newID = '';
            }
            page.render(options.path + '/' + options.filename + newID + '.' + options.extension);
            page.close();
            ph.exit();
            done();
          });
        });
      });

      // done();
    }, 5000);

  });

};
