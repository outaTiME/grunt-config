
var grunt = require('grunt');

exports['config'] = {

  main: function (test) {

    'use strict';

    var expect;
    var result;
    var bool_result;
    var re;

    test.expect(3);

    expect = 'development';
    result = grunt.config.get('environment');
    test.equal(expect, result, 'should environment development in config');

    expect = 'development';
    result = grunt.config.get('environment_template');
    test.equal(expect, result, 'should environment template development in config');

    expect = '(function dev () {\nalert(\'test\');\n}());\n';
    result = grunt.file.read('tmp/concat.txt');
    test.equal(expect, result, 'should use object as value and then use it with concat rule');

    test.done();

  }

};
