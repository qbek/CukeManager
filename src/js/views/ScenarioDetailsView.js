define(['text!tmpl/ScenarioDetails.tmpl.html', 'text!tmpl/ScenarioDetailsStep.tmpl.html'], function (scenarioTmpl, stepTmpl) {

  function renderStepVariables(stepName) {
    return String(stepName)
      .replace(/\s"/g, ' <span class="step-variable">"')
      .replace(/"\s/g, '"</span> ')
      .replace(/",/g, '"</span>,')
      .replace(/"$/g, '"</span>');
  }

  function renderScenario(scn, $render) {
    renderScenarioBaseData(scn, $render);
    var $scn_steps = $('.scenario-steps', $render);
    $scn_steps.empty();
    //render scenario steps
    if(scn.steps) {
      var previousClass = {};
      scn.steps.forEach(function (step) {
        var $step = getRenderedStep(step, previousClass);
        $step.appendTo($scn_steps);
      });
    }
  }

  function renderScenarioBaseData(scn, $render) {
    var $scn_name = $('.scenario-name', $render);
    var $scn_tags = $('.scenario-tags', $render);
    var $scn_desc = $('.scenario-description', $render);

    var tagsString = null;
    if(scn.tags) {
      tagsString = scn.tags.join(' ');
    }
    //render base scenario data
    $scn_name.html(scn.name);

    $scn_tags.html(tagsString);
    $scn_desc.html(scn.description);
  }

  function renderScenarioStatus (scenario, $render) {
    var $scn_status = $('.scenario-status', $render);
    $scn_status.html(scenario.status);

    //color status labels
    //cleanup all status classes
    $scn_status.removeClass();
    $scn_status.addClass('scenario-status');

    switch (scenario.status) {
      case 'pass':
        $scn_status.addClass('scenario-status-pass');
        break;
      case 'fail':
        $scn_status.addClass('scenario-status-fail');
        break;
      case 'no run':
        $scn_status.addClass('scenario-status-norun');
        break;
      }
  }

  function renderScenarioBackground(background, $render) {
    var $scn_background = $('.scenario-background-steps', $render);
    $scn_background.empty();

    if(background) {
      var previousClass = {};
      background.forEach(function (step) {
        var $step = getRenderedStep(step, previousClass);
        $step.appendTo($scn_background);
      });
    }
  }

  function getRenderedStep(step, previousClass) {
    var $step = $(stepTmpl);
    var $step_datatable = $('.step-datatable', $step);
    $('.step-keyword', $step).html(step.keyword);

    if (step.keyword === 'Given') {
      $step.addClass('step-keyword-given');
      $step.addClass('step-block-first');
      previousClass.name = 'step-keyword-given';
    } else if (step.keyword === 'When') {
      $step.addClass('step-keyword-when');
      previousClass.name = 'step-keyword-when';
    } else if (step.keyword === 'Then') {
      $step.addClass('step-keyword-then');
      previousClass.name = 'step-keyword-then';
    } else {
      $step.addClass(previousClass.name);
    }
    var stepName = renderStepVariables(step.name);
    $('.step-name', $step).html(stepName);

    if(step.dataTable) {
      var dataHtml = String('');
      step.dataTable.forEach(function (row) {
        var rowHtml = '<tr>';
        row.forEach(function (cell) {
          rowHtml = rowHtml.concat('<td>', cell, '</td>');
        });
        rowHtml = rowHtml.concat('</tr>');
        // console.log(rowHtml);
        dataHtml = dataHtml.concat(rowHtml);
      });
      $('tbody', $step_datatable).html(dataHtml);
    }

    return $step;
  }

  function ScenarioView (features) {
    this.$render = $(scenarioTmpl);
    this.show =  function(featureId, scenarioId) {
      var scenario = features[featureId].scenarios[scenarioId];
      var background = features[featureId].background;
      var $render = this.$render;
      renderScenario(scenario, $render);
      renderScenarioStatus(scenario, $render);
      renderScenarioBackground(background, $render);
      $('#scenario-view').empty();
      $('#scenario-view').append(this.$render);
      $('#scenario-view').scrollTop(0);
      $('#scenario-enterresult textarea').val('');


      $(scenario).one('change:status', function () {
        renderScenarioStatus(scenario, $render);
      });
    };
  }

  return {
    createScenarioView: function (features) {
      return new ScenarioView(features);
    }
  };
});