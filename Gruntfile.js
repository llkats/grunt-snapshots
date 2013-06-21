/*
 * grunt-snapshots
 * https://github.com/llkats/grunt-snapshots
 *
 * Copyright (c) 2013 Lydia Katsamberis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001,
          base: 'test/fixtures',
        },
      },
    },

    // Configuration to be run (and then tested).
    snapshots: {
      default_options: {
        options: {
        },
      },
      custom_options: {
        options: {
          filename: 'pic',
          path: 'tmp/custom/pics',
          extension: 'png',
          url: 'http://localhost:9001',
          unique: false
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'connect', 'snapshots', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'snapshots']);

};
