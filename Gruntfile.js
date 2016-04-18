
/*
 * grunt-config
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-config/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    config: {
      dev: {
        options: {
          variables: {
            'environment': 'development',
            'environment_template': '<%= "development" %>',
            'concatOptions': {
              banner: '(function dev () {',
              footer: '}());'
            }
          }
        }
      },
      prod: {
        options: {
          silent: true,
          variables: {
            'environment': 'production',
            'environment_template': '<%= "production" %>',
            'concatOptions': {
              banner: '(function prod () {',
              footer: '}());'
            }
          }
        }
      }
    },

    concat: {
      dist: {
        options: {
          process: function (src, filepath) {
            var concatOptions = grunt.config.get('concatOptions');
            return concatOptions.banner + '\n' + src +
              concatOptions.footer + '\n';
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'tmp/'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      files: '<config:lint.all>',
      tasks: 'default'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load helper plugins for testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'config:dev', 'concat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
