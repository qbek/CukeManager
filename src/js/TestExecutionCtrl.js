define(['views/TestExecutionView', 'modules/ExportToCVS'], function () {
  'use strict';
  var views = [];
  var _features;
  var scnDetailsView;

  var _TestExecutionView = require('views/TestExecutionView');


  function _enableMainEvents () {
    var $downloadCVS = $('#downloadCVS');
    var $storeProgress = $('#storeProgress');

    $downloadCVS.on('click', function () {
      var ExportCVS = require('modules/ExportToCVS');
      var cvsString = ExportCVS.getCVS(_features);
      var base64 = btoa(cvsString);

      $downloadCVS.prop('href', 'data:text;base64,' + base64);
      $downloadCVS.prop('target', '_blank');
      $downloadCVS.prop('download', 'TestReport.csv');

      $downloadCVS.show();
    });

    $storeProgress.on('click', function (e) {
      e.preventDefault();
      var storage = $.localStorage;
      storage.set('features', _features);
    });
  }

  function _enableOpenScenarioDetailsEvent () {
    var $featureList = $('#feature-list');
    $('[data-gr="scenario"]', $featureList).on('click', function (event) {
      var featureId = $(this).attr('data-featureid');
      var scenarioId = $(this).attr('data-scenarioid');
      window.location.hash = String.concat('#/features/scenario/', featureId, '/', scenarioId);
    });
  }

  function initCtrl (featuresData) {
    _features = featuresData;
    _TestExecutionView.showFeatureList(_features);
    _enableOpenScenarioDetailsEvent();
    _enableMainEvents();
  }

  function showScenario (featureID, scenarioID) {
    var scenario = _features[featureID].scenarios[scenarioID];
    var background = _features[featureID].background;
    _TestExecutionView.showScenario (scenario, background);

    var $scenarioEnterResult = $('[data-eventBind="enter-scenario-status"]');
    $scenarioEnterResult.off('click');
    $scenarioEnterResult.on('click', 'button', function (e) {
      var status = $(this).val();
      var comment = $('textarea', $scenarioEnterResult).val();
      if (status === 'fail' && !comment) {
        alert('Please provide reason of fail in comment');
      } else {
        scenario.setStatus(status, comment);
      }
    });
  }

  return {
    init: initCtrl,
    showScenario: showScenario
  };


});