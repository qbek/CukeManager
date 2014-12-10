define(['models/ScenarioModel'], function (Scenario) {
  'use strict';

  function Feature (name) {
    var description = null;
    Object.defineProperty(this, 'description', {
      enumerable: false,
      configurable: false,
      get: function () { return description; }
    });

    var background = null;
    Object.defineProperty(this, 'background', {
      enumerable: false,
      configurable: false,
      get: function () { return background; }
    });

    //public variables
    this.name = name;
    this.tags = null;
    this.visible = true;
    this.scenarios = [];

    //private
    // this._tags = tagsData;




    this.setDescription = function(desc) {
      description = desc;
    };

    this.addBackgroundStep = function (keyword, name, datatable) {
      var step = {
        keyword: keyword,
        name: name
      };
      if(datatable) {
        step.dataTable = datatable;
      }
      if(background === null) {
        background = [];
      }

      background.push(step);
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
    },

    addScenarioStep: function (id, key, name, status, datatable) {
      this.scenarios[id].addStep(key, name, status, datatable);
    }
  });

  return {
    create: function (name) {
      return new Feature(name);
    }
  };
});

