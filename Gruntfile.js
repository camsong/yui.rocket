var ChildProcess = require('child_process'),
    exec = ChildProcess.spawn,
    path = require('path'),
    File = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    YUIVersion: '3.11.0',
    moduleVersion: '0.1.0'
  });


  // build task: use shifter to build.
  grunt.registerTask('build', 'Building Rocket modules.', function(arg1, arg2) {
    var shifter = path.join(process.cwd(), 'node_modules/shifter/bin/shifter'),
        moduleVersion = grunt.option('moduleVersion') || grunt.config.get('moduleVersion'),
        done = this.async(),
        child;

    grunt.log.ok("BEGIN BUILD all modules");

    child = exec(process.execPath, [shifter, '--replace-version=' + moduleVersion, '--walk'], {
      stdio: 'inherit',
      env: process.env,
      cwd: path.join(process.cwd(), 'src')
    });

    child.on('exit', function(code) {
      if (code) {
        grunt.fail.fatal('Running shifter build failed with code: ' + code);
      }
      done();
    });
  });

  grunt.registerTask('test', 'Run tests using yogi.', function(arg1, arg2) {
    var yogi = path.join(process.cwd(), 'node_modules/yogi/bin/yogi'),
        done = this.async(),
        child;

    grunt.log.ok("Run tests");

    child = exec(process.execPath, [yogi, 'test', '--coverage', '--istanbul'], {
      stdio: 'inherit',
      env: process.env,
      cwd: path.join(process.cwd(), 'src')
    });
    child.on('exit', function(code) {
      if (code) {
        grunt.fail.fatal('Running yogi test failed with code: ' + code);
      }
      done();
    });
  });

  grunt.registerTask('default', ['build', 'test']);
};
