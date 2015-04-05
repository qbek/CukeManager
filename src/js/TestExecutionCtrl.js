define(['views/TestExecutionView', 'modules/ExportToCVS', 'modules/DataCompile', 'models/TestSetModel'], function () {
  'use strict';

  var TestSetModel = require('models/TestSetModel');
  var testSet = TestSetModel.create({});
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
      window.location.hash = '#/testexecutor/scenario/' + featureId + '/' + scenarioId;
    });
  }

  function _showFeatures() {
    _TestExecutionView.showFeatureList(testSet.features);
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
      var cvsString = ExportCVS.getCVS(testSet.features);
      var base64 = btoa(cvsString);
      var filename = "TestReport-".concat(testSet.desc.verUnderTest, '_', testSet.desc.moduleUnderTest, '-', testSet.desc.testType, '.cvs');

      $downloadCVS.prop('href', 'data:text;base64,' + base64);
      $downloadCVS.prop('target', '_blank');
      $downloadCVS.prop('download', filename);

      $downloadCVS.show();
    });

    $storeProgress.on('click', function (e) {
      e.preventDefault();
      var storage = $.localStorage;
      storage.set('testSetProgress', testSet);
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
          var features = DataCompile.compile(filecontent);
          testSet = TestSetModel.create(features);
          var name = prompt('Name of engineer');
          var module = prompt('System/Module under test');
          var version = prompt('Version under test');
          var type = prompt('Test type');
          testSet.setDescription(name, module, version, type);
          _showFeatures();
        });
    });

    //attach handler to Load progress button
    $loadProgress.on('click', function (e) {
      e.preventDefault();
      var storage = $.localStorage;
      if(storage.isSet('testSetProgress')) {
        var data = storage.get('testSetProgress');
        var FeatureModel = require('models/FeatureModel');
        var features = [];
        data.features.forEach(function (featureObj) {
          var feature = FeatureModel.create(featureObj);
          features.push(feature);
        });
        testSet = TestSetModel.create(features);
        testSet.setDescription(data.desc);
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
    var scenario, background;
    try {
      scenario = testSet.features[featureID].scenarios[scenarioID];
      background = testSet.features[featureID].background;
    } catch (e) {
      throw "Please first load a test set to execute";
    }

    _TestExecutionView.highlightScenario(featureID, scenarioID);
    _TestExecutionView.showScenario (scenario, background);

    var $scenarioEnterResult = $('[data-eventBind="enter-scenario-status"]');
    $scenarioEnterResult.off('click');
    $scenarioEnterResult.on('click', 'button', function (e) {
      var status = $(this).val();
      var comment = $('textarea', $scenarioEnterResult).val();
      if (status === 'fail' && !comment) {
        alert('Please provide reason of fail in comment');
      } else {
        scenario.setStatus(status);
      }
    });
    $($scenarioEnterResult).off('focusout');
    $($scenarioEnterResult).on('focusout', 'textarea', function (e) {
      var comment = $('textarea', $scenarioEnterResult).val();
      scenario.setComment(comment);
    });
  }

  return {
    init: initCtrl,
    showScenario: showScenario
  };


});