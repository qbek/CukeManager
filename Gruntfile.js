module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine', 'requirejs'],
        files: [{pattern: 'js/models/*.js', included: false},
                {pattern: 'js/views/*.js', included: false},
                {pattern: 'js/vendor/text.js', included: false},
                {pattern: '../test/*.spec.js', included: false},
                {pattern: 'tmpl/**', included: false},
                'js/vendor/jquery-2.1.1.js',
                '../test/jasmine-jquery.js',
        				'../test/test-main.js'],

        browsers: ['Firefox'],
        // browsers: ['PhantomJS'],
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