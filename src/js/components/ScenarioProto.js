define([], function () {

  function Scenario (scnObj) {
    this.data = scnObj;
  }

  $.extend(Scenario.prototype, {

  });

  return {
    create: function (scnObj) {
      return new Scenario(scnObj);
    }
  };

});