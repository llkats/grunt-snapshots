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
      extension: 'png'
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

    // And some async stuff.
    setTimeout(function() {
      phantom.create(function(ph) {
        ph.createPage(function(page) {
          page.open(options.url, function(status) {
            var newID = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            page.render(options.path + '/' + options.filename + '-' + newID + '.' + options.extension);
            console.log('rendered url ', status);
            ph.exit();
          });
        });
      });

      done();
    }, 5000);


    // Iterate over all specified file groups.
 /**   this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
*/
  });

};
