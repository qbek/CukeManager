module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine', 'requirejs'],
        files: [{pattern: 'js/**', included: false},
                {pattern: '../test/*.spec.js', included: false},
                {pattern: 'tmpl/**', included: false},
        				'../test/test-main.js'],

        browsers: ['PhantomJS'],
        proxies: {'/': '/base/'}
      },
      watch: {
        basePath: 'src/',
        singleRun: false,
        autoWatch: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};