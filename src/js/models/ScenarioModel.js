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



  return {
    create: function (name) {
      return new Scenario(name);
    }
  };
});