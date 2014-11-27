var allTestFiles = [];
var TEST_REGEXP = /spec.js$/i;

var pathToModule = function(path) {
  // console.log(path);
  return path;
  // return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  // console.log(file);
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

requirejs.config({
  "baseUrl": "js",
  paths: {
    'jquery': 'vendor/jquery-2.1.1',
    'mustache': 'vendor/mustache',
    'text': 'vendor/text',
    'tmpl': '../tmpl'
  },

  shim: {
    jquery: { exports: '$' }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
