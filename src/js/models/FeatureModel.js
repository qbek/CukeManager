define(['models/ScenarioModel'], function (Scenario) {
  'use strict';

  function Feature (name) {
    //public variables
    this.name = name;
    this.tags = null;
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

  Feature.prototype.addTags = function (tags) {
    this.tags = tags;
  };


  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

