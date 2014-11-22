define(function () {
  'use strict';


  function getScenarioCVS (scenario) {
    var scnInfo = scenario.getInfo();
    // var scenarioResult = getScenarioStatus(scenario.steps);
    var scenarioCVS = String.concat(',', scnInfo.name);
    scenarioCVS += String.concat(',', scnInfo.status);
    scenarioCVS += String.concat(',',  scnInfo.tags);
    scenarioCVS += '\n';
    return scenarioCVS;
  }


  function getFeatureCVS (feature) {
    var featInfo = feature.getInfo();
    var featureCVS = String.concat(featInfo.name, ',', ',','\n');
    var scenarios = feature.getScenarios();


    scenarios.forEach(function (scenario) {
      var scenarioCVS = getScenarioCVS(scenario);
      featureCVS = featureCVS.concat(scenarioCVS);
    });

    return featureCVS;
  }


  return {
    getCVS: function (features) {
      var cvs = 'Feature name, Scenario name, Status, tags\n';
      cvs += getFeatureCVS(features[0]);
      return cvs;
    }
  };

});