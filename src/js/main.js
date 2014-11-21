define(['jquery', 'DataCompile'], function ($, DataCompilation) {
  'use strict';

	var dataCompilation = DataCompilation.init();

	$('input').on('change', function (e) {
		var file = e.target.files[0];
		dataCompilation.readFile(file)
      .done (function (cvsString) {
        var base64 = btoa(cvsString)
        var $a = $('a');
        $a.prop('href', 'data:text;base64,' + base64);
        $a.prop('target', '_blank');
        $a.prop('download', 'myFile.csv');
      });
    // $a.trigger('click');
	});
});