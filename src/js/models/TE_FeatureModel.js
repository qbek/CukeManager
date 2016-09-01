/**
* TestExecution FeatureModel
* @module TE_FeatureModel
*/

define(['models/TE_ScenarioModel', 'PrototypeExtends'], function (Scenario) {
  'use strict';

  if(String.getDescriptionElement === undefined) {
    require('PrototypeExtends');
  }

  /**
  * TestExecution FeatureModel
  * @constructs Feature
  * @alias module:TE_FeatureModel
  * @param {String | Object} data - name of the feature, or plain object with feature details
  */

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
        var author = null;
        if(this.description) {
          author =  this.description.getDescriptionElement('!Author:');
        }
        return author;
      }
    });

    Object.defineProperty(this, 'reviewer', {
      get: function () {
        var reviewer = null;
        if(this.description) {
          reviewer = this.description.getDescriptionElement('!Reviewer:');
        }
        return reviewer;
      }
    });

    Object.defineProperty(this, 'overview', {
      get: function () {
        var overview = null;
        if(this.description) {
          overview = this.description.getDescriptionElement('!Overview:');
        }
        return overview;
      }
    });

    Object.defineProperty(this, 'preconditions', {
      get: function () {
        var preconditions = null;
        if(this.description) {
          preconditions = this.description.getDescriptionElement('!Preconditions:');
        }
        return preconditions;
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

    addBackgroundStep: function (keyword, name, datatable) {
      var step = {
        keyword: keyword,
        name: name
      };
      if(datatable) {
        step.dataTable = datatable;
      }
      if(this.background === null) {
        this.background = [];
      }

      this.background.push(step);
    },

    /**
    * Creates new Scenario object
    * @return Scenario object
    * @param {String|Object} data - name of new scenario, or plain object with Scenario details
    */
    createNewScenario: function (data) {
      return Scenario.create(data);
    },

    /**
    * Adds scenario to Feature's scenarios table
    * @param {Object} scenario - Scenario object
    */
    addScenario: function (scenario) {
      this.scenarios.push(scenario);
    }
  });

  return {
    create: function (data) {
      return new Feature(data);
    }
  };
});

