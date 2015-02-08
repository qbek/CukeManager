define(['modules/GherkinRender'], function () {
  var GherkinRender = require('modules/GherkinRender');

  var STATUS_CLASS = 'scenario-status';
  var STATUS_PASS_CLASS = 'scenario-status-pass';
  var STATUS_FAIL_CLASS = 'scenario-status-fail';
  var STATUS_NORUN_CLASS = 'scenario-status-norun';


  function _updateStatus (status, $render) {
    var $status = $('[data-gr="scn-status"]', $render);
    $status.html(status);
    //color status labels
    //cleanup all status classes
    $status.removeClass();
    $status.addClass(STATUS_CLASS);

    switch (status) {
      case 'pass':
        $status.addClass(STATUS_PASS_CLASS);
        break;
      case 'fail':
        $status.addClass(STATUS_FAIL_CLASS);
        break;
      case 'no run':
        $status.addClass(STATUS_NORUN_CLASS);
        break;
      }
  }



  function ScenarioView (scenario, background, $template) {
    var $render = GherkinRender.renderScenario(scenario, background, $template);
    _updateStatus(scenario.status.result, $render);
    //render scenario result comment
    $('textarea', $render).val(scenario.status.comment);

    $(scenario).on('change.status', function () {
      _updateStatus(scenario.status.result, $render);
    });

    this.$render = $render;
  }

  return ScenarioView;
});