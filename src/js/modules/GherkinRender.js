define(function () {

  //returns jQuery object with data-gr=value in $render
  function _getGrElement (value, $render) {
    var jquery = String.concat('[data-gr="', value, '"]');
    return $(jquery, $render);
  }

  //renders name, status, tags and description of scenario
  function _fillScenarioBaseData (scenario, $render) {
    var $name = _getGrElement('scn-name', $render);
    var $status = _getGrElement('scn-status', $render);
    var $tags = _getGrElement('scn-tags', $render);
    var $description = _getGrElement('scn-description', $render);

    $name.html(scenario.name);
    $status.html(scenario.status);
    //not all scenarios have tags
    if (scenario.tags) {
      $tags.html(scenario.tags.join(' '));
    }
    $description.html(scenario.description);
  }

  //renders all steps: scenario steps and background steps
  function _fillScenarioSteps (scenario, background, $render) {
    var $steps = _getGrElement('scn-steps', $render);
    var $bg_steps = _getGrElement('scn-bg-steps', $render);
    var $step = _getGrElement('scn-step', $render);
    $step.detach();
    //render background if defined
    if(background) {
      background.forEach(function (step, i) {
        var $newStep = _renderScenarioStep(step, $step);
        $newStep.appendTo($bg_steps);
      });
    }

    //render main steps
    scenario.steps.forEach(function (step, i) {
      var $newStep = _renderScenarioStep(step, $step);
      $newStep.appendTo($steps);
    });
  }

  //renders and returns new step jQuery object, based on delivered $step template
  function _renderScenarioStep (step, $step) {
    var $newStep = $step.clone();
    _getGrElement('step-keyword', $newStep).html(step.keyword);
    _getGrElement('step-name', $newStep).html(step.name);

    return $newStep;
  }

  function renderScenario (scenario, background, $template) {
    var $render = $template.clone();
    _fillScenarioBaseData(scenario, $render);
    if (scenario.steps) {
      _fillScenarioSteps(scenario, background, $render);
    }
    return $render;
  }

  function renderFeature(feature, $template) {
    var $render = $template.clone();
    var $scn_template = _getGrElement('scenario', $render);
    $scn_template.detach();
    var $scenarios = _getGrElement('scenarios', $render);
    var $name = _getGrElement('feat-name', $render);


    $name.html(feature.name);
    //loop through scenarios and render them
    feature.scenarios.forEach(function (scenario) {
      var $newScenario = renderScenario(scenario, null, $scn_template);
      $newScenario.appendTo($scenarios);
    });
    return $render;
  }

  return {
    renderScenario: renderScenario,
    renderFeature: renderFeature
  };
});