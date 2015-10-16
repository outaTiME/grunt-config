
/*
 * grunt-config
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-config/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {

  var util = require('util');
  var ce = require('cloneextend');

  grunt.registerMultiTask('config', 'Easy way to define specific target configuration.', function () {

    var taskOptions = grunt.config('config').options || {};

    // Default options:
    var options = {
      silent: false,
      variables: {}
    };

    // Extend with task options:
    ce.extend(options, taskOptions);

    // Extend with target options:
    ce.extend(options, this.options());

    // Configure Grunt with variables:
    var variables = options.variables;
    var count = 0;

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      if (options.silent !== true) {
        grunt.log.writeln('[grunt-config] ' + variable.cyan + ' → ' + util.inspect(value).green);
      }
      grunt.config.set(variable, value);
      count++;
    });

    // Log output?
    if (options.silent !== true) {
      var str = [
        'Configured ',
        count,
        count === 1 ? ' variable' : ' variables',
        ' for current target.'
      ];
      grunt.log.ok(str.join(''));
    }

  });

};
