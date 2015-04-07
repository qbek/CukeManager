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

    Object.defineProperty(this, 'passcriteria', {
      get: function () {
        var preconditions = null;
        if(this.description) {
          preconditions = this.description.getDescriptionElement('!Pass Criteria:');
        }
        return preconditions;
      }
    });

  }

  $.extend(Scenario.prototype, {
    setTags: function (tagsArray) {
      this.tags = tagsArray;
    },

    setDescription: function(desc) {
      this.description = desc;
    },

    addStep: function(key, name, datatable) {
      var step = {
        keyword: key,
        name: name,
      };

      if(datatable) { step.dataTable = datatable; }
      this.steps.push(step);
    },

    setStatus: function(stat) {
      this.status.result = stat;
      $(this).trigger('change.status');
    },

    setComment: function(comment) {
      if(comment) {
        this.status.comment = comment;
      } else {
        this.status.comment = null;
      }
    }
  });

  return {
    create: function (data) {
      return new Scenario(data);
    }
  };
});