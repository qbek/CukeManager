define(['modules/DataCompile', 'modules/ExportToCVS', 'TestExecutionCtrl'], function (DataCompile, ExportCVS, TestExecutionCtrl) {
  'use strict';

  // Array.prototype.clone = function() {
  //   return this.slice(0);
  // };

  function setBodyDimensions() {
    $('body').css('height', $(window).height());
    $('body').css('width', $(window).width());
  }
  setBodyDimensions();
  $(window).on('resize', setBodyDimensions);

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

  //sets display:none to all view type containers
  function resetScreen() {
    $('#load-file').hide();
    $('#feature-list').hide();
    $('#scenario-view').hide();
  }

  function handleLoadFileReoute() {
    //close all other and show load-file section
    resetScreen();
    $('#load-file').show();

    //function which reads files and responses with file content (string)
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

    //attach handler to Browse button
  	$('input').on('change', function (e) {
  		var file = e.target.files[0];
      readFile(file)
        .done (function (filecontent) {
          features = DataCompile.compile(filecontent);
          router.setRoute('/features');
        });
  	});
  }

  function handleFeaturesRoute() {
    //show features-list section
    resetScreen();
    $('#feature-list').attr('class', 'wide');
    $('#feature-list').show();

    //start TestExecutionCtrl
    if(features) {
      TestExecutionCtrl.init(features);
    } else {
      router.setRoute('/');
    }
  }

  function handleScenarioDetailRoute(featureId, scenarioId) {
    if(features) {
      //first to prepare section to show - filing with data
      TestExecutionCtrl.showScenario(featureId, scenarioId);

      //show features-list and scenarios-list sections
      resetScreen();
      $('#feature-list').show();
      $('#feature-list').attr('class', 'narrow');
      $('#scenario-view').show();
    } else {
      router.setRoute('/');
    }

  }



  var routes = {
    '': handleLoadFileReoute,
    '/features': handleFeaturesRoute,
    '/features/scenario/:featureId/:scenarioId': handleScenarioDetailRoute
  };

  var router = Router(routes);
  router.init('/');
});