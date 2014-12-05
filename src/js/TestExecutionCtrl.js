define(['views/FeatureListView', 'views/ScenarioDetailsView'], function (FeatureListView, ScenarioDetailsView) {
  var views = [];

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
      scnDetailsView.render(0, 0);

      $('#scenario-view').append(scnDetailsView.$render);
    }
  };


});