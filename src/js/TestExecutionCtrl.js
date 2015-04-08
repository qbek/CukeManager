define(['views/TestExecutionView', 'modules/ExportToCVS', 'modules/DataCompile', 'models/TestSetModel'], function () {
  'use strict';

  var TestSetModel = require('models/TestSetModel');
  var testSet = TestSetModel.create();
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

  function _openScenarioDetailsEventOn () {
    var $featureList = $('#feature-list');
    var handleScenarioClick = function (event) {
      var featureId = $(this).attr('data-featureid');
      var scenarioId = $(this).attr('data-scenarioid');
      window.location.hash = '#/testexecutor/scenario/' + featureId + '/' + scenarioId;
    };

    $('[data-gr="scenario"]', $featureList).on('click', handleScenarioClick);
  }

  function _showFeatures() {
    _TestExecutionView.showFeatureList(testSet.features);
    _openScenarioDetailsEventOn();
  }

  function _menuClickEventsOn () {
    var $loadTestSet = $('#loadTestSet');
    var $loadTestSetInput = $('#loadTestSetInput');

    var $downloadCVS = $('#downloadCVS');
    var $storeProgress = $('#storeProgress');
    var $loadProgress = $('#loadProgress');

    var handleDownloadCvsClick = function (event) {
      var ExportCVS = require('modules/ExportToCVS');
      var cvsString = ExportCVS.getCVS(testSet);
      var base64 = btoa(cvsString);
      var filename = "TestReport-".concat(testSet.desc.verUnderTest, '_', testSet.desc.moduleUnderTest, '-', testSet.desc.testType, '.cvs');

      $downloadCVS.prop('href', 'data:text;base64,' + base64);
      $downloadCVS.prop('target', '_blank');
      $downloadCVS.prop('download', filename);
      $downloadCVS.show();
    };

    var handleStoreProgressClick = function (event) {
      event.preventDefault();
      //check if there are features in testSet
      if(testSet.features.length) {
        var storage = $.localStorage;
        storage.set('testSetProgress', testSet);
      } else {
        alert('There is nothing to store');
      }
    };

    var handleLoadProgressClick = function (event) {
      event.preventDefault();
      var storage = $.localStorage;
      if(storage.isSet('testSetProgress')) {
        var data = storage.get('testSetProgress');
        testSet = TestSetModel.create();
        testSet.setDescription(data.desc);
        data.features.forEach(function (featureObj) {
          var feature = testSet.createNewFeature(featureObj);
          testSet.addFeature(feature);
        });
        _showFeatures();
      } else {
        alert('There is nothing to load');
      }
    };

    var handleLoadTestSetClick = function (event) {
      event.preventDefault();
      $('#loadTestSetInput').click();
    };

    var handleLoadTestSetChange = function (event) {
      var DataCompile = require('modules/DataCompile');
      var file = event.target.files[0];
      _readFile(file)
        .done (function (filecontent) {
          testSet = TestSetModel.create();
          testSet = DataCompile.compile(filecontent, testSet);

          var name = prompt('Name of engineer');
          var module = prompt('System/Module under test');
          var version = prompt('Version under test');
          var type = prompt('Test type');
          testSet.setDescription(name, module, version, type);
          _showFeatures();
        });
    };

    //attach handler function to events on menu items
    $downloadCVS.on('click', handleDownloadCvsClick);
    $storeProgress.on('click', handleStoreProgressClick);
    $loadProgress.on('click', handleLoadProgressClick);
    $loadTestSet.on('click', handleLoadTestSetClick);
    //attach handler to Browse button
    $loadTestSetInput.on('change', handleLoadTestSetChange);
  }

  function init () {
    _menuClickEventsOn();
  }

  function showScenario (featureID, scenarioID) {
    var scenario, background;
    var $scenarioEnterResult;

    var getComment = function () {
      return $('textarea', $scenarioEnterResult).val();
    };

    var handleResultFormButtonClick = function () {
      var status = $(this).val();
      var comment = getComment();
      if (status === 'fail' && !comment) {
        alert('Please provide reason of fail in comment');
      } else {
        scenario.setStatus(status);
      }
    };

    var handleCommentFocusout = function () {
      var comment = getComment();
      scenario.setComment(comment);
    };

    try {
      scenario = testSet.features[featureID].scenarios[scenarioID];
      background = testSet.features[featureID].background;
    } catch (e) {
      throw "Please first load a test set to execute";
    }

    _TestExecutionView.highlightScenario(featureID, scenarioID);
    _TestExecutionView.showScenario (scenario, background);

    $scenarioEnterResult = $('[data-eventBind="enter-scenario-status"]');
    $scenarioEnterResult.off('click');
    $scenarioEnterResult.on('click', 'button', handleResultFormButtonClick);
    $scenarioEnterResult.off('focusout');
    $scenarioEnterResult.on('focusout', 'textarea', handleCommentFocusout);
  }

  return {
    init: init,
    showScenario: showScenario
  };


});