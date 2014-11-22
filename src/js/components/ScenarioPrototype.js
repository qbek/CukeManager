define([], function () {
  'use strict';

  function Scenario (scnName, scnDescription, scnTags, scnSteps) {

    var scenario = {
      name: scnName,
      decription: scnDescription,
      tags: scnTags,
      steps: scnSteps
    };

    return {
      exportToCVS: function () {
        var scenarioCVS = String.concat(',', scenario.name, ',', scenario.tags, '\n');
        return scenarioCVS;
      }
    };
  }

  return {
    create: function (scnName, scnDescription, scnTags, scnSteps) {
      return new Scenario(scnName, scnDescription, scnTags, scnSteps);
    }
  };
});