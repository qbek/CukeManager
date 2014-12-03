define([], function () {
  'use strict';

  function Scenario (name) {
    this.name = name;
    this.decription = null;
    this.status = 'undefined';
    this.tags = null;
    this.steps = null;
    this.visible = true;
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