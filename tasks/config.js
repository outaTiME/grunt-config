'use strict';

const util = require('util');
const chalk = require('chalk');

module.exports = function (grunt) {
  grunt.registerMultiTask('config',
    'Easy way to define specific target configuration.',
    function () {
      // Took options
      const options = this.options({
        silent: false,
        variables: {}
      });
      // Locals
      const {variables} = options;
      let count = 0;
      Object.keys(variables).forEach(variable => {
        const value = variables[variable];
        grunt.verbose.writeln(chalk.cyan(variable) + ' → ' +
        chalk.green(util.inspect(value)));
        grunt.config.set(variable, value);
        count++;
      });
      if (options.silent !== true) {
        const str = [
          'Configure ',
          count,
          count === 1 ? ' variable' : ' variables',
          ' for current target.'
        ];
        grunt.log.ok(str.join(''));
      }
    });
};
