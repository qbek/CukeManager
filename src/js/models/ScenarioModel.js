define([], function () {
  'use strict';

  function Scenario (name) {
    //stores scenario description
    var description = null;
    //stores scenario steps
    var steps = null;
    //stores scenario status
    var status = {
      result: 'undefined',
      comment: null
    };


    this.name = name;
    this.tags = null;
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

    Object.defineProperty(this, 'status', {
      enumerable: false,
      configurable: false,
      get: function () { return status.result; }
    });

    Object.defineProperty(this, 'statusComment', {
      enumerable: false,
      configurable: false,
      get: function () { return status.comment; }
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

    this.setStatus = function(stat, comment) {
      status.result = stat;
      if(comment) {
        status.comment = comment;
      } else {
        status.comment = null;
      }

      $(this).trigger('change.status');
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