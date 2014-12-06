define(['views/FeatureListView', 'ctrls/FeatureCtrl', 'views/ScenarioDetailsView'], function (FeatureListView, FeatureCtrl, ScenarioDetailsView) {
  'use strict';
  var views = [];
  var ctrls = [];
  var scnDetailsView;


  return {
    init: function (features) {
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
    }
  };


});