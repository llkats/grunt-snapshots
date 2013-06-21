'use strict';

var grunt = require('grunt');

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
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.exists('tmp/default/screenshots/google.png');
    test.ok(actual, 'A screenshot of http://www.google.com should exist in the correct folder.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.exists('tmp/custom/pics/pic.png');
    test.ok(actual, 'A screenshot of http://localhost:9001/ should exist in the correct folder.');

    test.done();
  },
};
