define(['text!tmpl/ScenarioViewTmpl.html'], function (tmpl) {

  function render(scn, $render) {
    var $scn_name = $('.scenario-name', $render);
    $scn_name.html(scn.name);

    if (scn.visible) {
      $render.show();
    } else {
      $render.hide();
    }
  }


  function ScenarioView (scenario) {
    this.$render = $(tmpl);
    render(scenario, this.$render);
  }


  return {
    create: function (scenario) {
      return new ScenarioView(scenario);
    }
  };
});