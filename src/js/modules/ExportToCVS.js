define(function () {
  'use strict';

  function getScenarioCVS (scenario) {
    var scenarioCVS = String.concat(';', scenario.name);
    scenarioCVS += String.concat(';', scenario.status);
    scenarioCVS += String.concat(';',  scenario.tags);
    scenarioCVS += '\n';
    return scenarioCVS;
  }

  function getFeatureCVS (feature) {
    var featureCVS = String.concat(feature.name, ';', ';','\n');
    var scenarios = feature.scenarios;

    scenarios.forEach(function (scenario) {
      var scenarioCVS = getScenarioCVS(scenario);
      featureCVS = featureCVS.concat(scenarioCVS);
    });

    return featureCVS;
  }

  return {
    getCVS: function (features) {
      var cvs = 'Feature name, Scenario name, Status, tags\n';

      features.forEach(function (feature) {
        cvs += getFeatureCVS(feature);
      });
      return cvs;
    }
  };

});