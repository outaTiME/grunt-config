# grunt-config [![Build Status](https://secure.travis-ci.org/outaTiME/grunt-config.png?branch=master)](http://travis-ci.org/outaTiME/grunt-config)

> Easy way to define specific target configuration.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-config');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4).*



## Config task
_Run this task with the `grunt config` command._

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

##### variables
Type: `Object`

This option is used to define the variables to be exported in [grunt.config](http://gruntjs.com/api/grunt.config) object.

```javascript
options: {
  variables: {
    'foo': 'bar'
  }
}
```

#### silent
Type: `Boolean`
Default: `false`

If set to `true`, removes the output from stdout.

### Usage Examples

```js
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
```

#### Environment variable in source (with [grunt-replace](http://github.com/outaTiME/grunt-replace))

File `build/environment.txt`:

```
@@environment
```

Gruntfile:

```js
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
      {expand: true, flatten: true, src: ['build/environment.txt'], dest: 'public/'}
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'replace']);

// production
grunt.registerTask('prod', ['config:prod', 'replace']);
```

#### Handlebars environment partials (with [assemble](https://github.com/assemble/assemble))

Gruntfile:

```js
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
      {expand: true, cwd: 'assets/templates', src: ['**/*.hbs'], dest: 'tmp/templates'}
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'assemble']);

// production
grunt.registerTask('prod', ['config:prod', 'assemble']);
```

#### Dynamic options (with [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat))

Gruntfile:

```js
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
        return concatOptions.banner + '\n' + src +
          concatOptions.footer + '\n';
      }
    },
    files: [
      {expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'tmp/'}
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'concat']);

// production
grunt.registerTask('prod', ['config:prod', 'concat']);
```

Gruntfile (using grunt templates):

```js
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
      {expand: true, flatten: true, src: ['test/fixtures/concat.txt'], dest: 'tmp/'}
    ]
  }
}

// development
grunt.registerTask('dev', ['config:dev', 'concat']);

// production
grunt.registerTask('prod', ['config:prod', 'concat']);
```

#### Prevent stdout in production environment

Gruntfile:

```js
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

## Release History

 * 2015-05-01   v0.3.1   Third party dependencies updated.
 * 2015-05-01   v0.3.0   Better output management. The logOutput flag now updated to silent. Third party dependencies updated.
 * 2014-08-26   v0.2.2   Fixes backwards incompatible changes introduced in NPM.
 * 2014-07-13   v0.2.1   Readme updated and new logOutput flag (thanks [@kylerush](https://github.com/kylerush)).
 * 2014-06-09   v0.2.0   No way, finally remove support for 8.x of node.
 * 2014-06-09   v0.1.8   Update grunt-contrib-jshint version to support node 8.x versions.
 * 2014-06-09   v0.1.7   Support for node v8.x versions.
 * 2014-06-09   v0.1.6   Third party updated, and few examples.
 * 2014-03-06   v0.1.5   Update dependencies.
 * 2013-04-07   v0.1.4   Fix log for complex object with util.inspect.
 * 2013-04-02   v0.1.3   Add peerDependencies.
 * 2013-04-02   v0.1.2   Update description and README.md.
 * 2013-04-02   v0.1.1   Update variable definition object.
 * 2013-04-02   v0.1.0   Initial version.

---

Task submitted by [Ariel Falduto](http://outa.im/)
