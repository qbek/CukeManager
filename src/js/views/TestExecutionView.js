define(['text!tmpl/TestScenario.tmpl.html', 'text!tmpl/TestFeature.tmpl.html',
        'views/components/FeatureView', 'views/components/ScenarioView'],
function () {
  var $featureList = $('#feature-list');
  var $scenarioDetails = $('#scenario-view');

  var FeatureView = require('views/components/FeatureView');
  var ScenarioView = require('views/components/ScenarioView');


  function showFeatureList (features) {
    var $tmplFeature = $(require('text!tmpl/TestFeature.tmpl.html'));
    var $tmplScenario = $('[data-gr="scenario"]', $tmplFeature).detach();

    features.forEach(function (feature, featureID) {
      var featureView = new FeatureView(feature, $tmplFeature);
      feature.scenarios.forEach(function (scenario, scenarioID) {
        var scenarioView = new ScenarioView(scenario, null, $tmplScenario);
        //fill data-featureid and data-scenarioid
         scenarioView.$render.attr('data-featureid', featureID);
         scenarioView.$render.attr('data-scenarioid', scenarioID);

        //add new scenario $render to container in feature $render
        var $scenarioList = $('[data-gr="scenarios"]', featureView.$render);
        scenarioView.$render.appendTo($scenarioList);
      });
      featureView.$render.appendTo($featureList);
    });

    $(features).on('change.scenario.status', function (e) {

    });
  }

  function showScenario (scenario, background) {
    $scenarioDetails.empty();
    $scenarioDetails.scrollTop(0);
    var $tmpl = $(require('text!tmpl/TestScenario.tmpl.html'));
    var scenarioView = new ScenarioView (scenario, background, $tmpl);
    scenarioView.$render.appendTo($scenarioDetails);
  }


  return {
    showFeatureList: showFeatureList,
    showScenario: showScenario
  };

});