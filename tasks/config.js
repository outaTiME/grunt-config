
/*
 * grunt-config
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-config/blob/master/LICENSE-MIT
 */

'use strict';

// plugin

module.exports = function (grunt) {

  var util = require('util');
  var chalk = require('chalk');

  grunt.registerMultiTask('config', 'Easy way to define specific target configuration.', function () {

    // took options

    var options = this.options({
      silent: false,
      variables: {}
    });

    // locals

    var variables = options.variables;
    var count = 0;

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      grunt.verbose.writeln(chalk.cyan(variable) + ' → ' +
        chalk.green(util.inspect(value)));
      grunt.config.set(variable, value);
      count++;
    });

    if (options.silent !== true) {
      var str = [
        'Configure ',
        count,
        count === 1 ? ' variable' : ' variables',
        ' for current target.',
        // this.target,
      ];
      grunt.log.ok(str.join(''));
    }

  });

};
