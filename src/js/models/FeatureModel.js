define(['models/ScenarioModel'], function (Scenario) {
  'use strict';

  function Feature (name) {
    this.name = name;
    this.description = null;
    this.tags = null;
    this.background = null;
    this.scenarios = [];
    this.stats = null;
  }

  $.extend(Feature.prototype, {
    //feature related function
    setTags: function (tags) {
      this.tags = tags;
    },

    setDescription: function(desc) {
      this.description = desc;
    },

    //scenario related functions
    addScenario: function (name, desc, tagsArray) {
      var feature = this;
      var scenario = Scenario.create(name);
      scenario.setDescription(desc);
      scenario.setTags(tagsArray);
      var scnCount = this.scenarios.push(scenario);
      return scnCount - 1;
    },

    // setScenarioSteps: function (id, stepsArray) {
    //   this.scenarios[id].setSteps(stepsArray);
    // },

    addScenarioStep: function (id, key, name, status, datatable) {
      this.scenarios[id].addStep(key, name, status, datatable);
    },

    addBackgroundStep: function (keyword, name, datatable) {
      var step = {
        keyword: keyword,
        name: name
      };
      if(datatable) {
        step.datatable = datatable;
      }
      if(this.background === null) {
        this.background = [];
      }

      this.background.push(step);
    }
  });

  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

