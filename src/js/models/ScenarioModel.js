define([], function () {
  'use strict';

  function Scenario (name) {
    //stores scenario description
    var description = null;
    //stores scenario steps
    var steps = null;

    this.name = name;
    this.status = 'undefined';
    this.tags = null;
    this.steps = null;
    this.visible = true;

    Object.defineProperty(this, 'description', {
      enumerable: false,
      configurable: false,
      get: function () { return description; }
    });

    Object.defineProperty(this, 'steps', {
      enumerable: false,
      configurable: false,
      get: function () { return steps; }
    });

    this.setDescription = function(desc) {
      description = desc;
    };

    this.addStep = function(key, name, result, datatable) {
      if(steps === null) { steps = []; }
      var step = {
        keyword: key,
        name: name,
        result: result,
      };

      if(datatable) { step.dataTable = datatable; }
      steps.push(step);
    };

  }

  $.extend(Scenario.prototype, {
    setTags: function (tagsArray) {
      this.tags = tagsArray;
    },

    // setSteps: function (stepsArray) {
    //   this.steps = stepsArray;
    // }
  });




  return {
    create: function (name) {
      return new Scenario(name);
    }
  };
});