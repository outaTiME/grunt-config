'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    config: {
      dev: {
        options: {
          variables: {
            environment: 'development',
            environmentTemplate: '<%= "development" %>',
            concatOptions: {
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
            environment: 'production',
            environmentTemplate: '<%= "production" %>',
            concatOptions: {
              banner: '(function prod () {',
              footer: '}());'
            }
          }
        }
      }
    },
    concat: {
      environment: {
        options: {
          process(src) {
            return src + '\n' + grunt.config.get('environment') + '\n' + grunt.config.get('environmentTemplate') + '\n';
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/environment.txt'], dest: 'temp/'}
        ]
      },
      dist: {
        options: {
          process(src) {
            const concatOptions = grunt.config.get('concatOptions');
            return concatOptions.banner + '\n' + src +
              concatOptions.footer + '\n';
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'temp/'}
        ]
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['config:dev', 'concat']);
};
