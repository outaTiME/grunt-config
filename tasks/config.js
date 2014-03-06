
/*
 * grunt-config
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-config/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {

  'use strict';

  var util = require('util');
  var chalk = require('chalk');

  grunt.registerMultiTask('config', 'Define specific target task configuration.', function () {

    // took options

    var options = this.options({
      variables: {}
    });

    // locals

    var variables = options.variables;

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      grunt.log.writeln('Config ' + chalk.cyan(variable) + ' → ' +
        chalk.cyan(util.inspect(value)));
      grunt.config.set(variable, value);
    });
  });

};
