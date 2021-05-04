# grunt-config

[![Build Status](https://img.shields.io/github/workflow/status/outaTiME/grunt-config/CI)](https://github.com/outaTiME/grunt-config/actions/workflows/main.yml)
[![Version](https://img.shields.io/npm/v/grunt-config.svg)](https://www.npmjs.com/package/grunt-config)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Twitter: outa7iME](https://img.shields.io/twitter/follow/outa7iME.svg?style=social)](https://twitter.com/outa7iME)

> Easy way to define target specific settings.

## Install

From NPM:

```shell
npm install grunt-config --save-dev
```

## Usage

Assuming installation via NPM, you can use `grunt-config` in your gruntfile like this:

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    config: {
      dev: {
        options: {
          variables: {
            'environment': 'development'
          }
        }
      },
      prod: {
        options: {
          variables: {
            'environment': 'production'
          }
        }
      }
    }
  });
  grunt.registerTask('trace', function () {
    grunt.log.writeln('Using environment: ' + grunt.config.get('environment'));
  });
  grunt.loadNpmTasks('grunt-config');
  grunt.registerTask('default', ['config:dev', 'trace']);
};
```

## Options

### variables
Type: `Object`

This option is used to define the variables to be exported in [grunt.config](http://gruntjs.com/api/grunt.config) object.

```javascript
options: {
  variables: {
    'foo': 'bar'
  }
}
```

### silent
Type: `Boolean`
Default: `false`

If set to `true`, removes the output from stdout.

## Examples

### Environment variable in source (with [grunt-replace](http://github.com/outaTiME/grunt-replace))

File `build/environment.txt`:

```
@@environment
```

gruntfile:

```javascript
config: {
  dev: {
    options: {
      variables: {
        'environment': 'development'
      }
    }
  },
  prod: {
    options: {
      variables: {
        'environment': 'production'
      }
    }
  }
},

replace: {
  dist: {
    options: {
      variables: {
        'environment': '<%= grunt.config.get("environment") %>'
      },
      force: true
    },
    files: [
      {
        expand: true, flatten: true, src: ['build/environment.txt'], dest: 'public/'
      }
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'replace']);

// production
grunt.registerTask('prod', ['config:prod', 'replace']);
```

### Handlebars environment partials (with [assemble](https://github.com/assemble/assemble))

gruntfile:

```javascript
config: {
  dev: {
    options: {
      variables: {
        'partials': ['assets/partials/dev/*.hbs']
      }
    }
  },
  dist: {
    options: {
      variables: {
        'partials': ['assets/partials/dist/*.hbs']
      }
    }
  }
},

assemble: {
  dist: {
    options: {
      partials: '<%= grunt.config.get("partials") %>',
      ext: '.html'
    },
    files: [
      {
        expand: true, cwd: 'assets/templates', src: ['**/*.hbs'], dest: 'temp/templates'
      }
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'assemble']);

// production
grunt.registerTask('prod', ['config:prod', 'assemble']);
```

### Dynamic options (with [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))

gruntfile:

```javascript
config: {
  dev: {
    options: {
      variables: {
        'concatOptions': {
          banner: '(function dev () {',
          footer: '}());'
        }
      }
    }
  },
  prod: {
    options: {
      variables: {
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
        return concatOptions.banner + '\n' + src + concatOptions.footer + '\n';
      }
    },
    files: [
      {
        expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'temp/'
      }
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'concat']);

// production
grunt.registerTask('prod', ['config:prod', 'concat']);
```

### Dynamic options using grunt templates (with [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))

```javascript
config: {
  dev: {
    options: {
      variables: {
        'concatOptions': {
          banner: '(function dev () {',
          footer: '}());'
        }
      }
    }
  },
  prod: {
    options: {
      variables: {
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
      banner: '<%= grunt.config.get("concatOptions").banner %>',
      footer: '<%= grunt.config.get("concatOptions").footer %>'
    },
    files: [
      {
        expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'temp/'
      }
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'concat']);

// production
grunt.registerTask('prod', ['config:prod', 'concat']);
```

### Prevent stdout on production environment

gruntfile:

```javascript
config: {
  dev: {
    options: {
      variables: {
        'environment': 'development'
      }
    }
  },
  prod: {
    silent: true,
    options: {
      variables: {
        'environment': 'production'
      }
    }
  }
}
```

## License

MIT © [outaTiME](https://outa.im)
