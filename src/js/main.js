define(['modules/ExportToCVS', 'TestExecutionCtrl', 'models/TE_FeatureModel'], function (ExportCVS, TestExecutionCtrl) {
  'use strict';

  //definition of all divs for views in CukeManager
  var $WELCOME = $('#welcome-view');
  var $TEST_EXECUTION = $('#test-execution-view');
  var $TEST_DEVELOPER = $('#test-developer-view');


  function setBodyDimensions() {
    $('body').css('height', $(window).height());
    $('body').css('width', $(window).width());
  }
  setBodyDimensions();
  $(window).on('resize', setBodyDimensions);

  //sets display:none to all view type containers
  function resetScreen() {
    $WELCOME.hide();
    $TEST_DEVELOPER.hide();
    $TEST_EXECUTION.hide();
  }

  function handleRootRoute() {
    resetScreen();
    $WELCOME.show();
  }


  var TestExecutionRoutes = {
    root: function () {
      resetScreen();
      $TEST_EXECUTION.show();
      TestExecutionCtrl.init();
    },
    scenario: function (featureId, scenarioId) {
      try {
        TestExecutionCtrl.showScenario(featureId, scenarioId);
      } catch (e) {
        alert(e);
        window.location.hash = '/testexecutor';
      }
    }
  };

  var routes = {
    '': handleRootRoute,
    '/testexecutor': TestExecutionRoutes.root,
    '/testexecutor/scenario/:featureId/:scenarioId': TestExecutionRoutes.scenario
  };

  var router = Router(routes);
  router.init('/');
});