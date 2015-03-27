define(function () {
  'use strict';
  //style definitions used in this module
  var GIVEN_KEYWORD_CLASS = 'step-keyword-given';
  var WHEN_KEYWORD_CLASS = 'step-keyword-when';
  var THEN_KEYWORD_CLASS = 'step-keyword-then';
  var STEP_VAR_CLASS = 'step-variable';

  //returns jQuery object with data-gr=value in $render
  function _getGrElement (selector, $render) {
    var jquery = '[data-gr="' + selector + '"]';
    return $(jquery, $render);
  }

  function _htmlEscape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

    //converts all '\n' chars into HTML <br/> for given element gr selector
  function _convertLineBreaksToHTML(content) {
    return content.replace(/\n/g, '<br>');
  }


  function _updateGrElement (selector, data, $render) {
    var $element = _getGrElement(selector, $render);
    if(data != null) {
      var escapedData = _htmlEscape(data);
      escapedData = _convertLineBreaksToHTML(escapedData);
      $element.html(escapedData);
    } else {
      $element.parent().detach();
    }
  }

  //renders name, status, tags and description of scenario
  function _fillScenarioBaseData (scenario, $render) {
    var $tags = _getGrElement('scn-tags', $render);
    var $description = _getGrElement('scn-description', $render);

    //fill scenario name
    _updateGrElement('scn-name', scenario.name, $render);
    _updateGrElement('scn-overview', scenario.overview, $render);
    _updateGrElement('scn-preconditions', scenario.preconditions, $render);
    _updateGrElement('scn-passcriteria', scenario.passcriteria, $render);

    //not all scenarios have tags
    if (scenario.tags) {
      _updateGrElement('scn-tags', scenario.tags.join(' '), $render);
    }
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
    } else {
      $('div.scenario-background', $render).detach();
    }

    //render main steps
    scenario.steps.forEach(function (step, i) {
      var $newStep = _renderScenarioStep(step, $step);
      $newStep.appendTo($steps);
    });
  }

  //stores last step keyword css class. Starts with GIVEN
  var _keywordClass = GIVEN_KEYWORD_CLASS;
  //renders and returns new step jQuery object, based on delivered $step template
  function _renderScenarioStep (step, $step) {
    var $newStep = $step.clone();
    var $dataTable = _getGrElement('step-datatable', $newStep);
    var $keyword = _getGrElement('step-keyword', $newStep);
    $keyword.html(step.keyword);
    switch (step.keyword) {
      case 'Given':
        _keywordClass = GIVEN_KEYWORD_CLASS;
        break;
      case 'When':
        _keywordClass = WHEN_KEYWORD_CLASS;
        break;
      case 'Then':
        _keywordClass = THEN_KEYWORD_CLASS;
    }
    $keyword.addClass(_keywordClass);

    var stepName = _markScenarioStepVariables(step.name);
    _getGrElement('step-name', $newStep).html(stepName);

    //render data table if exists
    if(step.dataTable) {
      var dataHtml = String('');
      step.dataTable.forEach(function (row) {
        var rowHtml = '<tr>';
        row.forEach(function (cell) {
          var dataCell = _htmlEscape(cell);
          rowHtml = rowHtml.concat('<td>', dataCell, '</td>');
        });
        rowHtml = rowHtml.concat('</tr>');
        // console.log(rowHtml);
        dataHtml = dataHtml.concat(rowHtml);
      });
      $('tbody', $dataTable).html(dataHtml);
    }

    return $newStep;
  }

  //surrounds variables in step with span.step-variable
  function _markScenarioStepVariables(stepName) {
    return String(stepName)
      .replace(/\s"/g, ' <span class="'+ STEP_VAR_CLASS +'">"')
      .replace(/"\s/g, '"</span> ')
      .replace(/",/g, '"</span>,')
      .replace(/"$/g, '"</span>');
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
    _updateGrElement('feat-name', feature.name, $render);
    _updateGrElement('feat-author', feature.author, $render);
    _updateGrElement('feat-reviewer', feature.reviewer, $render);
    _updateGrElement('feat-overview', feature.overview, $render);
    _updateGrElement('feat-preconditions', feature.preconditions, $render);

    return $render;
  }

  return {
    renderScenario: renderScenario,
    renderFeature: renderFeature
  };
});