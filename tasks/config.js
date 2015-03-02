
/*
 * grunt-config
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-config/blob/master/LICENSE-MIT
 */

'use strict';

// plugin

module.exports = function (grunt) {

  var util = require('util');
  var ce = require('cloneextend');

  grunt.registerMultiTask('config', 'Easy way to define specific target configuration.', function () {

    var taskOptions = grunt.config('config').options || {};

    // Default options:
    var options = {
      logOutput: true,
      variables: {}
    };

    // Extend with task options:
    ce.extend(options, grunt.config('config').options);

    // Extend with target options:
    ce.extend(options, this.options());

    // locals

    var variables = options.variables;

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      if (options.logOutput === true) {
        grunt.log.writeln('[grunt-config] ' + variable.cyan + ' → ' + util.inspect(value).green);
      }
      grunt.config.set(variable, value);
    });

  });

};
