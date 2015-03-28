define(function () {
  'use strict';

  function _getQuoted(str) {
    var output = '';
    return output.concat('\"', str, '\"');
  }


  function getScenarioCVS (scenario) {
    var name = _getQuoted(scenario.name);
    var result = _getQuoted(scenario.status.result);
    var comment = _getQuoted(scenario.status.comment);
    var scenarioCVS = ''.concat(';', name, ';', result, ';', comment, '\n');
    return scenarioCVS;
  }

  function getFeatureCVS (feature) {
    var name = _getQuoted(feature.name);
    var featureCVS = ''.concat(name, ';', ';', ';', '\n');
    var scenarios = feature.scenarios;
    scenarios.forEach(function (scenario) {
      var scenarioCVS = getScenarioCVS(scenario);
      featureCVS = featureCVS.concat(scenarioCVS);
    });

    return featureCVS;
  }

  return {
    getCVS: function (features) {
      var cvs = '"Feature name";"Scenario name";"Status";"Comments"\n';

      features.forEach(function (feature) {
        cvs += getFeatureCVS(feature);
      });
      return cvs;
    }
  };

});