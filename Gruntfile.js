module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    karma: {
      options: {
        frameworks: ['jasmine', 'requirejs'],
        files: ['js/vendor/jquery.min.js', 
        				{pattern: 'js/data/*.js', included: false}, 
        				{pattern: 'test/*.spec.js', included: false},
        				'test/test-main.js'
        				],
        				
        browsers: ['PhantomJS'],
      },
      build: {
        basePath: 'build/',
        singleRun: true
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