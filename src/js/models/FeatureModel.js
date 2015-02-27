define(['models/ScenarioModel', 'PrototypeExtends'], function (Scenario) {
  'use strict';

  if(String.getDescriptionElement === undefined) {
    require('PrototypeExtends');
  }

  function Feature (data) {
    if($.type(data) == 'string') {
      this.name = data;
      this.description = null;
      this.tags = null;
      this.background = null;
      this.scenarios = [];
    } else if ($.type(data) == 'object') {
      this.name = data.name;
      this.description = data.description;
      this.tags = data.tags;
      this.background = data.background;
      this.scenarios = [];

      var that = this;
      data.scenarios.forEach(function (scenarioObj) {
        var scenario = Scenario.create(scenarioObj);
        that.scenarios.push(scenario);
      });
    }

    Object.defineProperty(this, 'stats', {
      get: function () {
        var stats = {pass: 0, norun: 0, fail: 0, undef: 0};

        this.scenarios.forEach(function (scenario) {
          stats[scenario.status.result]++;
        });

        return stats;
      }
    });

    Object.defineProperty(this, 'author', {
      get: function () {
        return this.description.getDescriptionElement('!Author:');
      }
    });

    Object.defineProperty(this, 'reviewer', {
      get: function () {
        return this.description.getDescriptionElement('!Reviewer:');
      }
    });
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
    create: function (data) {
      return new Feature(data);
    }
  };
});

