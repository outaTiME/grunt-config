const test = require('ava');
const grunt = require('grunt');
const rimraf = require('rimraf');

test('should environment development in config', function (t) {
  const result = grunt.file.read('temp/environment.txt');
  t.is(result, '\ndevelopment\ndevelopment\n');
});

test('should use object as value and then use it with concat rule', function (t) {
  const result = grunt.file.read('temp/concat.txt');
  t.is(result, '(function dev () {\nalert(\'test\');\n}());\n');
});

test.after.always.cb(function (t) {
  rimraf('temp', t.end);
});
