define(['views/FeatureListView'], function (FeatureListView) {
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
    }
  };


});