define(['text!tmpl/ScenarioDetails.tmpl.html', 'text!tmpl/ScenarioDetailsStep.tmpl.html'], function (scenarioTmpl, stepTmpl) {

  function renderStepVariables(stepName) {
    return String(stepName)
      .replace(/\s"/g, ' <span class="step-variable">"')
      .replace(/"\s/g, '"</span> ')
      .replace(/",/g, '"</span>,')
      .replace(/"$/g, '"</span>');
  }


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
        var $step_datatable = $('.step-datatable', $step);
        $('.step-keyword', $step).html(step.keyword);

        if (step.keyword === 'Given') {
          $step.addClass('step-keyword-given');
          $step.addClass('step-block-first');
          previousClass = 'step-keyword-given';
        } else if (step.keyword === 'When') {
          $step.addClass('step-keyword-when');
          previousClass = 'step-keyword-when';
        } else if (step.keyword === 'Then') {
          $step.addClass('step-keyword-then');
          previousClass = 'step-keyword-then';
        } else {
          $step.addClass(previousClass);
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