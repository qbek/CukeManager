define([], function () {
  'use strict';

  function Scenario (scnName, scnDescription, scnTags, scnSteps) {

    this.name = scnName;
    this.decription = scnDescription;
    this.tags = scnTags;
    this.steps = scnSteps;

    Object.defineProperty(this, "status",
      {
        get: function () {
          var result;
          //check if we have any steps defined for scenario
          var lastStep = this.steps.length - 1;
          if(lastStep >= 0) {
            result = this.steps[lastStep].result.status;
            if ( result == "Skip" ) {
              result = "failed";
            }
          }
          return result;
        }
      });
  }

  return {
    create: function (scnName, scnDescription, scnTags, scnSteps) {
      return new Scenario(scnName, scnDescription, scnTags, scnSteps);
    }
  };
});