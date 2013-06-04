'use strict';

var grunt = require('grunt'),
    server = require('server');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.evolution = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default/screenshots');
    var expected = grunt.file.read('test/expected/screenshots');
    test.equal(actual, expected, 'A screenshot of http://www.google.com should exist in the correct folder.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('pics/');
    var expected = grunt.file.read('test/expected/custom');
    test.equal(actual, expected, 'A screenshot of http://www.google.com should exist in the correct folder.');

    test.done();
  },
};
