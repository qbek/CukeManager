define(function () {
  'use strict';

  function _getQuoted(str) {
    var output = '';
    return output.concat('\"', str, '\"');
  }

  function _getTestSetDescCVS(description) {
    var cvs = 'Test Set information \n';
    cvs = cvs.concat('"Tested version";', _getQuoted(description.verUnderTest), '\n');
    cvs = cvs.concat('"Module name";', _getQuoted(description.moduleUnderTest), '\n');
    cvs = cvs.concat('"Test type";', _getQuoted(description.testType), '\n');
    cvs = cvs.concat('"Executing engineer";', _getQuoted(description.executorName), '\n');
    cvs = cvs.concat('\n');
    return cvs;
  }

  function _getTestSetStatsCVS(stats) {
    var cvs = 'Summary statistics \n';
    cvs = cvs.concat('"Pass";', _getQuoted(stats.pass), '\n');
    cvs = cvs.concat('"Fail";', _getQuoted(stats.fail), '\n');
    cvs = cvs.concat('"No run";', _getQuoted(stats.norun), '\n');
    cvs = cvs.concat('\n');
    return cvs;
  }


  function _getScenarioCVS (scenario) {
    var name = _getQuoted(scenario.name);
    var result = _getQuoted(scenario.status.result);
    var comment = _getQuoted(scenario.status.comment || '');
    var cvs = ''.concat(';', name, ';', result, ';', comment, '\n');
    return cvs;
  }

  function _getFeatureCVS (feature) {
    var name = _getQuoted(feature.name);
    var cvs = ''.concat(name, '\n');
    var scenarios = feature.scenarios;
    scenarios.forEach(function (scenario) {
      var scenarioCVS = _getScenarioCVS(scenario);
      cvs = cvs.concat(scenarioCVS);
    });

    return cvs;
  }

  return {
    getCVS: function (testSet) {
      var cvs = _getTestSetDescCVS(testSet.desc);
      cvs += _getTestSetStatsCVS(testSet.stats);
      cvs += '"Feature name";"Scenario name";"Status";"Comments"\n';
      testSet.features.forEach(function (feature) {
        cvs += _getFeatureCVS(feature);
      });
      return cvs;
    }
  };

});