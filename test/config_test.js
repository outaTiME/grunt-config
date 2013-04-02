var grunt = require('grunt');

exports['config'] = {
  main: function(test) {

    'use strict';

    var expect, result, bool_result, re;

    test.expect(2);

    expect = 'development';
    result = grunt.config.get('environment');
    test.equal(expect, result, 'should environment development in config');

    expect = 'development';
    result = grunt.config.get('environment_template');
    test.equal(expect, result, 'should environment template development in config');

    test.done();
  }
};
