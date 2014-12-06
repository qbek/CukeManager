define(['text!tmpl/ScenarioDetails.tmpl.html', 'text!tmpl/ScenarioDetailsStep.tmpl.html'], function (scenarioTmpl, stepTmpl) {

  function renderScenario(scn, $render) {
    var $scn_name = $('.scenario-name', $render);
    var $scn_tags = $('.scenario-tags', $render);
    var $scn_desc = $('.scenario-description', $render);
    var $scn_steps = $('.scenario-steps', $render);

    var tagsString = null;
    if(scn.tags) {
      tagsString = scn.tags.join(' ');
    }

    //render base scenario data
    $scn_name.html(scn.name);
    $scn_tags.html(tagsString);
    $scn_desc.html(scn.description);
    $scn_steps.empty();
    //render scenario steps
    if(scn.steps) {
      var previousClass;
      scn.steps.forEach(function (step) {
        var $step = $(stepTmpl);
        $('.step-keyword', $step).html(step.keyword);

        if (step.keyword === 'Given') {
          $step.addClass('step-keyword-given');
          $step.addClass('step-block-first');
          previousClass = 'step-keyword-given';
        } else if (step.keyword === 'When') {
          $step.addClass('step-keyword-when');
          $step.addClass('step-block-first');
          previousClass = 'step-keyword-when';
        } else if (step.keyword === 'Then') {
          $step.addClass('step-keyword-then');
          $step.addClass('step-block-first');
          previousClass = 'step-keyword-then';
        } else {
          $step.addClass(previousClass);
        }



        $('.step-name', $step).html(step.name);
        $step.appendTo($scn_steps);
      });
    }
  }

  function ScenarioView (features) {
    this.$render = $(scenarioTmpl);
    this.show =  function(featureId, scenarioId) {
      var scenario = features[featureId].scenarios[scenarioId];
      renderScenario(scenario, this.$render);
      $('#scenario-view').empty();
      $('#scenario-view').append(this.$render);
    };
  }

  return {
    createScenarioView: function (features) {
      return new ScenarioView(features);
    }
  };
});