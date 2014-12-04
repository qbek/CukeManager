define([], function () {
  'use strict';

  function Scenario (name) {
    //stores scenario description
    var description = null;

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


    this.setDescription = function(desc) {
      description = desc;
    };

  }

  $.extend(Scenario.prototype, {
    setTags: function (tagsArray) {
      this.tags = tagsArray;
    },

    setSteps: function (stepsArray) {
      this.steps = stepsArray;
    }
  });




  return {
    create: function (name) {
      return new Scenario(name);
    }
  };
});