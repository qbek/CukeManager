define(['jquery', 'modules/DataCompile', 'modules/ExportToCVS', 'TestExecutionCtrl'], function ($, DataCompilation, ExportCVS, TestExecutionCtrl) {
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

	$('input').on('change', function (e) {
		var file = e.target.files[0];
		DataCompilation.readFile(file)
      .done (function (compiled) {
        features = compiled;
        startEventHandlers();
        TestExecutionCtrl.init(features);
      });
    // $a.trigger('click');
	});
});