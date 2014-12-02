define(['jquery', 'modules/DataCompile', 'modules/ExportToCVS', 'TestExecutionCtrl'], function ($, DataCompile, ExportCVS, TestExecutionCtrl) {
  'use strict';

  // Array.prototype.clone = function() {
  //   return this.slice(0);
  // };

  var features;

  function startEventHandlers() {
    $('body').on('click', 'a',  function (e) {
      // e.preventDefault();
      var cvsString = ExportCVS.getCVS(features);
      var base64 = btoa(cvsString);
      var $a = $('a');
      $a.prop('href', 'data:text;base64,' + base64);
      $a.prop('target', '_blank');
      $a.prop('download', 'myFile.csv');

    });
  }

  function readFile (file) {
    var promise = $.Deferred();
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      var result = e.target.result;
      promise.resolve(result);
    };
    fileReader.readAsText(file);
    return promise;
  }

	$('input').on('change', function (e) {
		var file = e.target.files[0];
    readFile(file)
      .done (function (filecontent) {
        features = DataCompile.compile(filecontent);
        startEventHandlers();
        TestExecutionCtrl.init(features);
      });
	});
});