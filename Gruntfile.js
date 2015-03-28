module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: {
      deploy: ['deploy']
    },

    copy: {
      deploy: {
        expand: 'false',
        cwd: 'src',
        src: ['index.html', 'css/normalize.css', 'js/vendor/*.js', 'icon/*'],
        dest: 'deploy'
      }
    },

    requirejs: {
      deploy: {
        options: {
          baseUrl: 'src/js',
          paths: {
            'text': 'vendor/text',
            'tmpl': '../tmpl',
          },
          name: 'main',
          out: 'deploy/js/main.js',
          optimize: 'uglify2'
        }
      }
    },

    karma: {
      options: {
        frameworks: ['jasmine', 'requirejs'],
        files: [{pattern: 'src/js/models/*.js', included: false},
                {pattern: 'src/js/views/*.js', included: false},
                {pattern: 'src/js/views/components/*.js', included: false},
                {pattern: 'src/js/modules/*.js', included: false},
                {pattern: 'src/js/*.js', included: false},
                {pattern: 'src/js/vendor/text.js', included: false},
                {pattern: 'test/*.spec.js', included: false},
                {pattern: 'test/testdata/*.*', included: false},
                {pattern: 'src/tmpl/**', included: false},
                'src/js/vendor/jquery-2.1.1.js',
                'test/jasmine-jquery.js',
        				'test/test-main.js'],
      },
      all: {
        options: {
          browsers: ['Firefox', 'Chrome'],
          singleRun: true
        }
      },
      firefox: {
        options: {
          browsers: ['Firefox'],
          basePath: './',
          singleRun: false,
          autoWatch: true,
        }
      },
      phantom: {
        options: {
          browsers: ['PhantomJS'],
          basePath: './',
          singleRun: false,
          autoWatch: true,
        }
      },
    },

    sass: {
      dist: {
        options: {
          update: true,
        },

        files: {
          'src/css/main.css': 'src/sass/main.scss'
        }
      },

      deploy: {
        options: {
          sourcemap: 'none',
          style: 'compresed'

        },
        files: {
          'deploy/css/main.css': 'src/sass/main.scss'
        }
      }
    },

    watch: {
      sass: {
        expand: true,
        files: 'src/sass/**',
        tasks: ['sass'],
      }
    }

  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('deploy',['clean:deploy', 'copy:deploy', 'requirejs:deploy', 'sass:deploy']);
};