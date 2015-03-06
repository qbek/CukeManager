define(['views/TestExecutionView', 'modules/ExportToCVS', 'modules/DataCompile'], function () {
  'use strict';

  var _features;
  var _TestExecutionView = require('views/TestExecutionView');


  function _readFile (file) {
    var promise = $.Deferred();
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      var result = e.target.result;
      promise.resolve(result);
    };
    fileReader.readAsText(file);
    return promise;
  }

  function _enableOpenScenarioDetailsEvent () {
    var $featureList = $('#feature-list');
    $('[data-gr="scenario"]', $featureList).on('click', function (event) {
      var featureId = $(this).attr('data-featureid');
      var scenarioId = $(this).attr('data-scenarioid');
      window.location.hash = String.concat('#/testexecutor/scenario/', featureId, '/', scenarioId);
    });
  }

  function _showFeatures() {
    _TestExecutionView.showFeatureList(_features);
    _enableOpenScenarioDetailsEvent();
  }

  function _enableMenuHandlers () {
    var $loadTestSet = $('#loadTestSet');
    var $loadTestSetInput = $('#loadTestSetInput');

    var $storeProgress = $('#storeProgress');
    var $loadProgress = $('#loadProgress');
    var $downloadCVS = $('#downloadCVS');


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

    $loadTestSet.on('click', function (e) {
      e.preventDefault();
      $('#loadTestSetInput').click();
    });

    //attach handler to Browse button
    $loadTestSetInput.on('change', function (e) {
      var DataCompile = require('modules/DataCompile');
      var file = e.target.files[0];
      _readFile(file)
        .done (function (filecontent) {
          _features = DataCompile.compile(filecontent);
          _showFeatures();
        });
    });

    //attach handler to Load progress button
    $loadProgress.on('click', function (e) {
      e.preventDefault();
      var storage = $.localStorage;
      if(storage.isSet('features')) {
        var data = storage.get('features');
        var FeatureModel = require('models/FeatureModel');
        _features = [];
        data.forEach(function (featureObj) {
          var feature = FeatureModel.create(featureObj);
          _features.push(feature);
        });
        _showFeatures();
      } else {
        alert('There is nothing to load');
      }
    });
  }


  function initCtrl () {
    _enableMenuHandlers();
  }

  function showScenario (featureID, scenarioID) {
    if(_features) {
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
    } else {
      throw "Please first load a test set to execute";
    }
  }

  return {
    init: initCtrl,
    showScenario: showScenario
  };


});