define([], function () {
  'use strict';

  function getStatus(steps) {

    var lastStep = steps.length - 1;
    var result = steps[lastStep].result.status;

    if ( result == "Skip" ) {
      result = "failed";
    }

    return result;
  }


  function Scenario (scnName, scnDescription, scnTags, scnSteps) {

    var scenario = {
      name: scnName,
      decription: scnDescription,
      tags: scnTags,
      steps: scnSteps
    };

    return {
      getInfo: function () {
        return {
          name: scenario.name,
          description: scenario.description,
          status: getStatus(scenario.steps)
        };
      }
    };

  }

  return {
    create: function (scnName, scnDescription, scnTags, scnSteps) {
      return new Scenario(scnName, scnDescription, scnTags, scnSteps);
    }
  };
});