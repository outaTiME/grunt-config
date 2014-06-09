
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
  var chalk = require('chalk');

  grunt.registerMultiTask('config', 'Define specific target configuration.', function () {

    // took options

    var options = this.options({
      variables: {}
    });

    // locals

    var variables = options.variables;

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      grunt.log.writeln('Config ' + chalk.cyan(variable) + ' → ' +
        chalk.green(util.inspect(value)));
      grunt.config.set(variable, value);
    });
  });

};
