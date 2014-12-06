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

  $.extend(FeatureView.prototype, {
    addScenario: function (scnView) {
      var $scnRender = scnView.$render;
      $('.feature-scenarios', this.$render).append($scnRender);
    },

    toggleScenarios: function () {
      var $scenarios = $('.feature-scenarios', this.$render);

      if ($scenarios.hasClass('feature-scenarios-hidden')) {
        $scenarios.removeClass('feature-scenarios-hidden');
      } else {
        $scenarios.addClass('feature-scenarios-hidden');
      }
    }

  });








  function renderScenario(scenario, $render) {
    var $scn_name = $('.scenario-name', $render);
    var $scn_tags = $('.scenario-tags', $render);
    var $scn_desc = $('.scenario-description', $render);
    var $scn_status = $('.scenario-status', $render);
    var tagsString = null;
    if(scenario.tags) {
      tagsString = scenario.tags.join(' ');
    }

    $scn_name.html(scenario.name);
    $scn_tags.html(tagsString);
    $scn_desc.html(scenario.description);
    $scn_status.html(scenario.status);
  }

  function ScenarioView (scenario, featureId, scenarioId) {
    this.$render = $(scenarioTmpl);
    //render scenario data
    renderScenario(scenario, this.$render);
    //adds featureid and scenarioid
    $('.scenario-label', this.$render).attr('data-featureid', featureId);
    $('.scenario-label', this.$render).attr('data-scenarioid', scenarioId);

  }

  return {
    createFeatureView: function (feature) {return new FeatureView(feature);},
    createScenarioView: function (scenario, featureId, scenarioId) {return new ScenarioView(scenario, featureId, scenarioId);}
  };


});