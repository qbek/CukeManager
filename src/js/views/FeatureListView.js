define(['text!tmpl/ScenarioViewTmpl.html', 'text!tmpl/FeatureViewTmpl.html'], function (scenarioTmpl, featureTmpl) {

  function renderFeature (feature, $render) {
    var $name = $('.feature-name', $render);
    var $tags = $('.feature-tags', $render);
    var $desc = $('.feature-description', $render);
    var tagsString = '';
    if(feature.tags) {
      tagsString = feature.tags.join(' ');
    }
    $name.html(feature.name);
    $tags.html(tagsString);
    $desc.html(feature.description);
  }

  function FeatureView (feature) {
    this.$render = $(featureTmpl);
    renderFeature(feature, this.$render);
  }

  FeatureView.prototype.addScenario = function (scnView) {
    var $scnRender = scnView.$render;
    $('.feature-scenarios', this.$render).append($scnRender);
  };

  function renderScenario(scn, $render) {
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
    this.$render = $(scenarioTmpl);
    renderScenario(scenario, this.$render);
  }

  return {
    createFeatureView: function (feature) {return new FeatureView(feature);},
    createScenarioView: function (scenario) {return new ScenarioView(scenario);}
  };


});