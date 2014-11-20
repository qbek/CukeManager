define(['jquery', 'DataCompile'], function ($, DataCompilation) {


	var dataCompilation = DataCompilation.init();

	$('input').on('change', function (e) {
		var file = e.target.files[0];
		dataCompilation.readFile(file);
	});
});