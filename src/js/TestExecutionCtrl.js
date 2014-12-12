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
        setScenarioStatus(scenario, 'fail', comment);
      });
      $scenarioEnterResult.on('click', '.button-norun', function (e) {
        var comment = $('textarea', $scenarioEnterResult).val();
        setScenarioStatus(scenario, 'no run', comment);
      });
    }
  };


});