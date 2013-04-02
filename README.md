# grunt-config [![Build Status](https://secure.travis-ci.org/outaTiME/grunt-config.png?branch=master)](http://travis-ci.org/outaTiME/grunt-config)

> Define specific configuration per rule for future tasks.



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

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Usage Examples

```js
config: {
  dev: {
    options: {
      'environment': 'development'
    }
  },
  prod: {
    options: {
      'environment': 'production'
    }
  }
}
```


## Release History

 * 2013-04-02   v0.1.0   Initial version.

---

Task submitted by [Ariel Falduto](http://outa.im/)
