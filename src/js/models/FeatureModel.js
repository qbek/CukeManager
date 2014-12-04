define(['models/ScenarioModel'], function (Scenario) {
  'use strict';

  function Feature (name) {
    var description = null;

    //public variables
    this.name = name;
    this.tags = null;
    this.visible = true;
    this.scenarios = [];

    //private
    // this._tags = tagsData;

    Object.defineProperty(this, 'description', {
      enumerable: false,
      configurable: false,
      get: function () { return description; }
    });


    this.setDescription = function(desc) {
      description = desc;
    };

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
    },

    setScenarioSteps: function (id, stepsArray) {
      this.scenarios[id].setSteps(stepsArray);
    },

    setScenarioDescription: function (id, desc) {
      this.scenarios[id].setDescription(desc);
    }
  });

  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

