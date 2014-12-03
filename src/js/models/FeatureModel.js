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

  $.extend(Feature.prototype, {
    //feature related function
    setTags: function (tags) {
      this.tags = tags;
    },

    //scenario related functions
    addScenario: function (name) {
      var scenario = Scenario.create(name);
      var scnCount = this.scenarios.push(scenario);
      return scnCount - 1;
    },

    setScenarioTags: function (id, tagsArray) {
      this.scenarios[id].setTags(tagsArray);
    }

  });

  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

