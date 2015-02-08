define([], function () {
  'use strict';

  function Scenario (data) {
    if($.type(data) == 'string') {
      this.name = data;
      this.tags = [];
      this.description = null;
      this.steps = [];
      this.status = {
        result: 'undef',
        comment: null
      };
    } else if ($.type(data) == 'object') {
      this.name = data.name;
      this.tags = data.tags;
      this.description = data.description;
      this.steps = data.steps;
      this.status = data.status;
    } else throw 'Scenario model constructor invoked with invalid data type';

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
    create: function (data) {
      return new Scenario(data);
    }
  };
});