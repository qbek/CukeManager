define(['text!tmpl/ScenarioViewTmpl.html'], function (tmpl) {

  function render(scn, $render) {
    var $scn_name = $('.scenario-name', $render);
    var $scn_tags = $('.scenario-tags', $render);
    var $scn_desc = $('.scenario-description', $render);
    var tagsString = null;
    if(scn.tags) {
      tagsString = scn.tags.join(' ');
    }

    $scn_name.html(scn.name);
    $scn_tags.html(tagsString);
    $scn_desc.html(scn.description);


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