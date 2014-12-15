define(['views/FeatureListView', 'ctrls/FeatureCtrl', 'views/ScenarioDetailsView'], function (FeatureListView, FeatureCtrl, ScenarioDetailsView) {
  'use strict';
  var views = [];
  var features;
  var scnDetailsView;

  function setScenarioStatus (scenario, status, comment) {
    if(comment) {
      scenario.setStatus(status, comment);
    } else {
      scenario.setStatus(status);
    }
  }

  function enableMainEvents () {
    var $downloadCVS = $('#downloadCVS');


    $downloadCVS.on('click', function () {
      var ExportCVS = require('modules/ExportToCVS');
      var cvsString = ExportCVS.getCVS(features);
      var base64 = btoa(cvsString);

      $downloadCVS.prop('href', 'data:text;base64,' + base64);
      $downloadCVS.prop('target', '_blank');
      $downloadCVS.prop('download', 'TestReport.csv');

      $downloadCVS.show();
    });

  }

  return {
    init: function (featuresData) {
      features = featuresData;
      features.forEach(function (feature, featureId) {
        var featureView = FeatureListView.createFeatureView(feature);
        feature.scenarios.forEach(function (scenario, scenarioId) {
          var scenarioView = FeatureListView.createScenarioView(scenario, featureId, scenarioId);
          featureView.addScenario(scenarioView);
        });
        var featureCtrl = FeatureCtrl.create(featureView);
        views.push(featureView);

        $('#feature-list').append(featureView.$render);
      });
      scnDetailsView = ScenarioDetailsView.createScenarioView(features);

      enableMainEvents();
    },

    showScenario: function(featureId, scenarioId) {
      scnDetailsView.show(featureId, scenarioId);
      var $scenarioEnterResult = $('#scenario-enterresult');
      var scenario = features[featureId].scenarios[scenarioId];
      $scenarioEnterResult.off();
      $scenarioEnterResult.on('click', '.button-pass', function (e) {
        var comment = $('textarea', $scenarioEnterResult).val();
        setScenarioStatus(scenario, 'pass', comment);
      });
      $scenarioEnterResult.on('click', '.button-fail', function (e) {
        var comment = $('textarea', $scenarioEnterResult).val();
        if(comment) {
          setScenarioStatus(scenario, 'fail', comment);
        } else {
          alert('Please provide reason of fail in comment');
        }
      });
      $scenarioEnterResult.on('click', '.button-norun', function (e) {
        var comment = $('textarea', $scenarioEnterResult).val();
        setScenarioStatus(scenario, 'no run', comment);
      });
    }
  };


});