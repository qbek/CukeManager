define([], function () {
  'use strict';

  function Scenario (name) {
    this.name = name;
    this.tags = [];
    this.description = null;
    this.steps = [];
    this.status = {
      result: 'undefined',
      comment: null
    };
  }

  $.extend(Scenario.prototype, {
    setTags: function (tagsArray) {
      this.tags = tagsArray;
    },

    setDescription: function(desc) {
      this.description = desc;
    },

    addStep: function(key, name, result, datatable) {
      var step = {
        keyword: key,
        name: name,
        result: result,
      };

      if(datatable) { step.dataTable = datatable; }
      this.steps.push(step);
    },

    setStatus: function(stat, comment) {
      this.status.result = stat;
      if(comment) {
        this.status.comment = comment;
      } else {
        this.status.comment = null;
      }

      $(this).trigger('change.status');
    }
  });

  return {
    create: function (name) {
      return new Scenario(name);
    }
  };
});