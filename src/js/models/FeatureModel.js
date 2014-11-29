define(['models/ScenarioModel'], function (Scenario) {
  'use strict';

  function Feature (name) {
    //public variables
    this.name = name;
    this.visible = true;
    this.scenarios = [];
    //private
    // this._tags = tagsData;
  }


  Feature.prototype.addScenario = function (name) {
    var scenario = Scenario.create(name);
    var scnCount = this.scenarios.push(scenario);
    return scnCount - 1;
  };



  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

