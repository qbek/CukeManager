define(['views/ScenarioView', 'views/FeatureView'], function (ScenarioView, FeatureView) {
  var views = [];



  return {
    init: function (features) {
      features.forEach(function (feature) {
        var featureView = FeatureView.create(feature);

        feature.scenarios.forEach(function (scenario) {
          var scenarioView = ScenarioView.create(scenario);
          featureView.addScenario(scenarioView);
        });
        views.push(featureView);

        $('#feature-list').append(featureView.$render);

      });
    }
  };


});