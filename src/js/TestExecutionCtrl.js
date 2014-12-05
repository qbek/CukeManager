define(['views/FeatureListView', 'views/ScenarioDetailsView'], function (FeatureListView, ScenarioDetailsView) {
  'use strict';
  var views = [];
  var scnDetailsView;


  return {
    init: function (features) {
      features.forEach(function (feature) {
        var featureView = FeatureListView.createFeatureView(feature);

        feature.scenarios.forEach(function (scenario) {
          var scenarioView = FeatureListView.createScenarioView(scenario);
          featureView.addScenario(scenarioView);
        });
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