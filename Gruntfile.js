module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine', 'requirejs'],
        files: [{pattern: 'src/js/models/*.js', included: false},
                {pattern: 'src/js/views/*.js', included: false},
                {pattern: 'src/js/views/components/*.js', included: false},
                {pattern: 'src/js/modules/*.js', included: false},
                {pattern: 'src/js/vendor/text.js', included: false},
                {pattern: 'test/*.spec.js', included: false},
                {pattern: 'test/testdata/*.*', included: false},
                {pattern: 'src/tmpl/**', included: false},
                'src/js/vendor/jquery-2.1.1.js',
                'test/jasmine-jquery.js',
        				'test/test-main.js'],

        browsers: ['Firefox'],
        // browsers: ['PhantomJS'],
        // proxies: {'/': '/base/'}
      },
      watch: {
        basePath: './',
        singleRun: false,
        autoWatch: true,
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
};